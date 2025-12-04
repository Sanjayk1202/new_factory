# backend/scripts/setup_db.py
import sys
from pathlib import Path

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent))

from app.database import engine, Base
from app.models import *
import hashlib
from sqlalchemy import text

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def setup_database():
    print("Creating database tables...")
    
    try:
        # Create all tables
        Base.metadata.create_all(bind=engine)
        print("✅ Database tables created successfully!")
        
    except Exception as e:
        print(f"❌ Error creating database: {e}")
        print("\nMake sure PostgreSQL is running and database exists.")
        print("Create database with: CREATE DATABASE factory_shift_db;")

if __name__ == "__main__":
    setup_database()
    print("\nSetup complete!")
    print("\nStart the backend server with:")
    print("python -m app.main")
    print("\nThen access the API at: http://localhost:8000")
    print("API documentation: http://localhost:8000/docs")