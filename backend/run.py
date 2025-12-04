# backend/run.py
import uvicorn

if __name__ == "__main__":
    print("🚀 Starting Factory Shift Management API...")
    print("📊 Access the API at: http://localhost:8000")
    print("📚 API documentation: http://localhost:8000/docs")
    print("\n🔑 Default credentials:")
    print("   Admin: admin / admin123")
    print("   Employee: john.doe / password123")
    print("   Manager: manager.prod / password123")
    
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)