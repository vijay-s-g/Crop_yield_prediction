from database import get_db_connection

connection = get_db_connection()

if connection.is_connected():
    print("MySQL connected successfully!")

connection.close()