from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import pickle
import bcrypt

from database import get_db_connection


app = FastAPI()


# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# LOAD ML MODEL
# =========================

with open("crop_yield_model.pkl", "rb") as f:
    model = pickle.load(f)


# =========================
# REQUEST MODELS
# =========================

class RegisterInput(BaseModel):
    username: str
    email: str
    password: str


class LoginInput(BaseModel):
    username: str
    password: str


class PredictionInput(BaseModel):
    user_id: int
    Year: int
    State: str
    Crop: str
    Season: str
    Area: float
    Annual_Rainfall: float
    Fertilizer: float
    Pesticide: float


# =========================
# HOME
# =========================

@app.get("/")
def home():
    return {
        "message": "Crop Yield Prediction API is running!"
    }


# =========================
# REGISTER
# =========================

@app.post("/register")
def register(data: RegisterInput):
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute(
        "SELECT user_id FROM users WHERE email = %s OR username = %s",
        (data.email, data.username)
    )

    existing_user = cursor.fetchone()

    if existing_user:
        cursor.close()
        connection.close()

        return {
            "success": False,
            "message": "Username or email already registered"
        }

    hashed_password = bcrypt.hashpw(
        data.password.encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")

    cursor.execute(
        """
        INSERT INTO users (username, email, password_hash)
        VALUES (%s, %s, %s)
        """,
        (
            data.username,
            data.email,
            hashed_password
        )
    )

    connection.commit()

    user_id = cursor.lastrowid

    cursor.close()
    connection.close()

    return {
        "success": True,
        "message": "Account created successfully",
        "user_id": user_id
    }


# =========================
# LOGIN
# =========================

@app.post("/login")
def login(data: LoginInput):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT user_id, username, email, password_hash
        FROM users
        WHERE username = %s
        """,
        (data.username,)
    )

    user = cursor.fetchone()

    cursor.close()
    connection.close()

    if not user:
        return {
            "success": False,
            "message": "Invalid username or password"
        }

    password_matches = bcrypt.checkpw(
        data.password.encode("utf-8"),
        user["password_hash"].encode("utf-8")
    )

    if not password_matches:
        return {
            "success": False,
            "message": "Invalid username or password"
        }

    return {
        "success": True,
        "message": "Login successful",
        "user_id": user["user_id"],
        "username": user["username"],
        "email": user["email"]
    }


# =========================
# PREDICT
# =========================

@app.post("/predict")
def predict(data: PredictionInput):

    input_data = pd.DataFrame([{
        "Year": data.Year,
        "State": data.State,
        "Crop": data.Crop,
        "Season": data.Season,
        "Area": data.Area,
        "Annual_Rainfall": data.Annual_Rainfall,
        "Fertilizer": data.Fertilizer,
        "Pesticide": data.Pesticide
    }])

    prediction = model.predict(input_data)[0]

    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        INSERT INTO predictions (
            user_id,
            year,
            state,
            crop,
            season,
            area,
            annual_rainfall,
            fertilizer,
            pesticide,
            predicted_yield
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """,
        (
            data.user_id,
            data.Year,
            data.State,
            data.Crop,
            data.Season,
            data.Area,
            data.Annual_Rainfall,
            data.Fertilizer,
            data.Pesticide,
            float(prediction)
        )
    )

    connection.commit()

    prediction_id = cursor.lastrowid

    cursor.close()
    connection.close()

    return {
        "success": True,
        "prediction_id": prediction_id,
        "predicted_yield": float(prediction)
    }

@app.get("/predictions/{user_id}")
def get_predictions(user_id: int):

    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT
            prediction_id,
            year,
            state,
            crop,
            season,
            area,
            annual_rainfall,
            fertilizer,
            pesticide,
            predicted_yield,
            created_at
        FROM predictions
        WHERE user_id = %s
        ORDER BY created_at DESC
        """,
        (user_id,)
    )

    predictions = cursor.fetchall()

    cursor.close()
    connection.close()

    return {
        "success": True,
        "predictions": predictions
    }