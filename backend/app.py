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


class PredictionInput(BaseModel):
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

    # Check whether email already exists
    cursor.execute(
        "SELECT user_id FROM users WHERE email = %s",
        (data.email,)
    )

    existing_user = cursor.fetchone()

    if existing_user:
        cursor.close()
        connection.close()

        return {
            "success": False,
            "message": "Email already registered"
        }

    # Hash password
    hashed_password = bcrypt.hashpw(
        data.password.encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")

    # Insert user
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
        "message": "User registered successfully",
        "user_id": user_id
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

    return {
        "predicted_yield": float(prediction)
    }