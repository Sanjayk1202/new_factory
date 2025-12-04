# backend/app/main.py
from fastapi import FastAPI, Depends, HTTPException, status, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from sqlalchemy import or_, func
from datetime import datetime, timedelta, date, time
from typing import Optional, List
import hashlib
from jose import JWTError, jwt
from contextlib import asynccontextmanager

from .database import get_db, engine, Base
from .models import User, Employee, Division, Department, Attendance, LeaveRequest, Shift, ShiftAssignment

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("🚀 Starting Factory Shift Management API...")
    
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    # Initialize with sample data
    initialize_database()
    
    yield
    
    # Shutdown
    print("👋 Shutting down...")

app = FastAPI(
    title="Factory Shift Management API", 
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SECRET_KEY = "factory-shift-secret-key-2024-change-this-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")

# Helper Functions
def verify_password(plain_password, hashed_password):
    return hashlib.sha256(plain_password.encode()).hexdigest() == hashed_password

def get_password_hash(password):
    return hashlib.sha256(password.encode()).hexdigest()

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def authenticate_user(db: Session, username: str, password: str):
    user = db.query(User).filter(User.username == username).first()
    if not user or not verify_password(password, user.hashed_password):
        return None
    return user

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = db.query(User).filter(User.username == username).first()
    if user is None:
        raise credentials_exception
    return user

def initialize_database():
    db = next(get_db())
    try:
        # Check if admin exists
        admin_user = db.query(User).filter(User.username == "admin").first()
        
        if not admin_user:
            print("📊 Creating sample data...")
            
            # First, create divisions
            divisions = [
                {"name": "Production Division", "code": "PROD", "color": "blue"},
                {"name": "Quality Assurance", "code": "QA", "color": "green"},
                {"name": "Maintenance", "code": "MAINT", "color": "orange"},
            ]
            
            division_objects = []
            for div_data in divisions:
                division = Division(**div_data)
                db.add(division)
                division_objects.append(division)
            
            db.commit()
            
            # Create departments
            departments = [
                {"name": "Production Line A", "code": "PROD_A", "division_id": division_objects[0].id},
                {"name": "Quality Control", "code": "QC", "division_id": division_objects[1].id},
                {"name": "Mechanical Maintenance", "code": "MECH", "division_id": division_objects[2].id},
            ]
            
            department_objects = []
            for dept_data in departments:
                department = Department(**dept_data)
                db.add(department)
                department_objects.append(department)
            
            db.commit()
            
            # Create users with properly hashed passwords
            sample_users = [
                {
                    "username": "admin",
                    "email": "admin@factory.com",
                    "full_name": "Admin User",
                    "password": "admin123",
                    "role": "admin",
                    "division_id": None,
                    "department_id": None,
                    "employee_code": "ADM001",
                    "position": "System Administrator",
                    "shift_type": "morning"
                },
                {
                    "username": "john.doe",
                    "email": "john.doe@factory.com",
                    "full_name": "John Doe",
                    "password": "password123",
                    "role": "employee",
                    "division_id": division_objects[0].id,
                    "department_id": department_objects[0].id,
                    "employee_code": "EMP001",
                    "position": "Production Operator",
                    "shift_type": "morning"
                },
                {
                    "username": "jane.smith",
                    "email": "jane.smith@factory.com",
                    "full_name": "Jane Smith",
                    "password": "password123",
                    "role": "employee",
                    "division_id": division_objects[1].id,
                    "department_id": department_objects[1].id,
                    "employee_code": "EMP002",
                    "position": "Quality Inspector",
                    "shift_type": "afternoon"
                },
                {
                    "username": "manager.prod",
                    "email": "manager.prod@factory.com",
                    "full_name": "Production Manager",
                    "password": "password123",
                    "role": "manager",
                    "division_id": division_objects[0].id,
                    "department_id": department_objects[0].id,
                    "employee_code": "MGR001",
                    "position": "Production Manager",
                    "shift_type": "morning"
                }
            ]
            
            for user_data in sample_users:
                # Create user
                user = User(
                    username=user_data["username"],
                    email=user_data["email"],
                    full_name=user_data["full_name"],
                    hashed_password=get_password_hash(user_data["password"]),  # Use the helper function
                    role=user_data["role"],
                    division_id=user_data["division_id"],
                    department_id=user_data["department_id"],
                    avatar_url=f"https://api.dicebear.com/7.x/avataaars/svg?seed={user_data['full_name'].replace(' ', '')}"
                )
                db.add(user)
            
            db.commit()
            
            # Now create employee records for non-admin users
            for user_data in sample_users:
                if user_data["role"] != "admin":  # Admin doesn't need employee record
                    user = db.query(User).filter(User.username == user_data["username"]).first()
                    if user:
                        employee = Employee(
                            user_id=user.id,
                            employee_code=user_data["employee_code"],
                            division_id=user_data["division_id"],
                            department_id=user_data["department_id"],
                            position=user_data["position"],
                            hire_date=date.today() - timedelta(days=365),  # Hired 1 year ago
                            shift_type=user_data["shift_type"]
                        )
                        db.add(employee)
            
            db.commit()
            
            # Create sample shifts
            shifts = [
                {"name": "Morning Shift", "code": "MORN", "start_time": time(8, 0), "end_time": time(16, 0), "duration_hours": 8.0, "color": "blue"},
                {"name": "Afternoon Shift", "code": "AFTN", "start_time": time(16, 0), "end_time": time(0, 0), "duration_hours": 8.0, "color": "green"},
            ]
            
            for shift_data in shifts:
                shift = Shift(**shift_data)
                db.add(shift)
            
            db.commit()
            
            # Create sample attendance records for employees
            employees = db.query(Employee).filter(Employee.employee_code.in_(["EMP001", "EMP002"])).all()
            for i in range(1, 8):
                record_date = date.today() - timedelta(days=i)
                for emp in employees:
                    attendance = Attendance(
                        employee_id=emp.id,
                        user_id=emp.user_id,
                        date=record_date,
                        check_in=datetime.combine(record_date, time(8, 0)),
                        check_out=datetime.combine(record_date, time(16, 0)),
                        status="present",
                        hours_worked=8.0
                    )
                    db.add(attendance)
            
            db.commit()
            print("✅ Database initialized with sample data!")
            print("\n📋 Sample users created:")
            print("   Admin: admin / admin123")
            print("   Employee: john.doe / password123")
            print("   Employee: jane.smith / password123")
            print("   Manager: manager.prod / password123")
            
    except Exception as e:
        print(f"⚠️ Error initializing database: {str(e)}")
        import traceback
        traceback.print_exc()
        db.rollback()
    finally:
        db.close()

# ==================== AUTH ROUTES ====================
@app.post("/api/auth/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    
    employee = db.query(Employee).filter(Employee.user_id == user.id).first()
    division = db.query(Division).filter(Division.id == user.division_id).first() if user.division_id else None
    department = db.query(Department).filter(Department.id == user.department_id).first() if user.department_id else None
    
    access_token = create_access_token(data={"sub": user.username})
    
    user_response = {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "full_name": user.full_name,
        "role": user.role,
        "division_id": user.division_id,
        "department_id": user.department_id,
        "avatar_url": user.avatar_url,
        "division": division.name if division else None,
        "department": department.name if department else None,
        "employee_code": employee.employee_code if employee else None,
        "position": employee.position if employee else None
    }
    
    return {"access_token": access_token, "token_type": "bearer", "user": user_response}

@app.get("/api/auth/me")
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email,
        "full_name": current_user.full_name,
        "role": current_user.role,
        "division_id": current_user.division_id,
        "department_id": current_user.department_id,
        "avatar_url": current_user.avatar_url,
        "is_active": current_user.is_active
    }

# ==================== DASHBOARD ROUTES ====================
@app.get("/api/dashboard/stats")
async def get_dashboard_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    today = date.today()
    
    # Total counts
    total_employees = db.query(Employee).filter(Employee.is_active == True).count()
    total_divisions = db.query(Division).filter(Division.is_active == True).count()
    total_departments = db.query(Department).filter(Department.is_active == True).count()
    
    # Today's attendance
    today_attendances = db.query(Attendance).filter(Attendance.date == today).all()
    today_present = sum(1 for a in today_attendances if a.status == "present")
    today_absent = sum(1 for a in today_attendances if a.status == "absent")
    today_late = sum(1 for a in today_attendances if a.status == "late")
    today_attendance_rate = (today_present / total_employees * 100) if total_employees > 0 else 0
    
    # Pending requests
    pending_requests = db.query(LeaveRequest).filter(LeaveRequest.status == "pending").count()
    
    # Division stats
    divisions_stats = []
    divisions = db.query(Division).filter(Division.is_active == True).all()
    for division in divisions:
        emp_count = db.query(Employee).filter(
            Employee.division_id == division.id,
            Employee.is_active == True
        ).count()
        dept_count = db.query(Department).filter(
            Department.division_id == division.id,
            Department.is_active == True
        ).count()
        
        divisions_stats.append({
            "name": division.name,
            "employees": emp_count,
            "departments": dept_count,
            "color": division.color
        })
    
    return {
        "total_employees": total_employees,
        "total_divisions": total_divisions,
        "total_departments": total_departments,
        "today_attendance": f"{today_attendance_rate:.1f}%",
        "today_present": today_present,
        "today_absent": today_absent,
        "today_late": today_late,
        "pending_requests": pending_requests,
        "divisions_stats": divisions_stats
    }

# ==================== EMPLOYEE ROUTES ====================
@app.get("/api/employees")
async def get_employees(
    search: Optional[str] = None,
    division_id: Optional[int] = None,
    department_id: Optional[int] = None,
    status: Optional[str] = None,
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role not in ["admin", "manager"]:
        raise HTTPException(status_code=403, detail="Access denied")
    
    query = db.query(Employee).join(User)
    
    # Apply role-based filters
    if current_user.role == "manager":
        if current_user.division_id:
            query = query.filter(Employee.division_id == current_user.division_id)
    
    # Apply search filters
    if search:
        query = query.filter(
            or_(
                User.full_name.ilike(f"%{search}%"),
                Employee.employee_code.ilike(f"%{search}%"),
                User.email.ilike(f"%{search}%")
            )
        )
    
    if division_id:
        query = query.filter(Employee.division_id == division_id)
    
    if department_id:
        query = query.filter(Employee.department_id == department_id)
    
    if status:
        if status == "active":
            query = query.filter(Employee.is_active == True)
        elif status == "inactive":
            query = query.filter(Employee.is_active == False)
    
    # Pagination
    offset = (page - 1) * limit
    total = query.count()
    employees = query.offset(offset).limit(limit).all()
    
    # Format response
    result = []
    for emp in employees:
        result.append({
            "id": emp.id,
            "employee_code": emp.employee_code,
            "position": emp.position,
            "shift_type": emp.shift_type,
            "hire_date": emp.hire_date.isoformat() if emp.hire_date else None,
            "is_active": emp.is_active,
            "user": {
                "id": emp.user.id,
                "username": emp.user.username,
                "email": emp.user.email,
                "full_name": emp.user.full_name,
                "avatar_url": emp.user.avatar_url,
                "role": emp.user.role
            },
            "division": {
                "id": emp.division.id,
                "name": emp.division.name,
                "color": emp.division.color
            } if emp.division else None,
            "department": {
                "id": emp.department.id,
                "name": emp.department.name
            } if emp.department else None
        })
    
    return {
        "employees": result,
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": (total + limit - 1) // limit
    }

@app.get("/api/employees/{employee_id}")
async def get_employee(
    employee_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role not in ["admin", "manager"]:
        raise HTTPException(status_code=403, detail="Access denied")
    
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    # Check if manager has access to this employee
    if current_user.role == "manager" and current_user.division_id != employee.division_id:
        raise HTTPException(status_code=403, detail="Access denied")
    
    return {
        "id": employee.id,
        "employee_code": employee.employee_code,
        "position": employee.position,
        "shift_type": employee.shift_type,
        "hire_date": employee.hire_date.isoformat() if employee.hire_date else None,
        "phone": employee.phone,
        "address": employee.address,
        "emergency_contact": employee.emergency_contact,
        "emergency_phone": employee.emergency_phone,
        "salary_grade": employee.salary_grade,
        "employment_type": employee.employment_type,
        "is_active": employee.is_active,
        "user": {
            "id": employee.user.id,
            "username": employee.user.username,
            "email": employee.user.email,
            "full_name": employee.user.full_name,
            "avatar_url": employee.user.avatar_url,
            "role": employee.user.role
        },
        "division": {
            "id": employee.division.id,
            "name": employee.division.name,
            "color": employee.division.color
        } if employee.division else None,
        "department": {
            "id": employee.department.id,
            "name": employee.department.name
        } if employee.department else None
    }

# ==================== DIVISION ROUTES ====================
@app.get("/api/divisions")
async def get_divisions(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(Division).filter(Division.is_active == True)
    
    if current_user.role == "manager":
        if current_user.division_id:
            query = query.filter(Division.id == current_user.division_id)
    
    divisions = query.all()
    
    result = []
    for division in divisions:
        dept_count = db.query(Department).filter(
            Department.division_id == division.id,
            Department.is_active == True
        ).count()
        emp_count = db.query(Employee).filter(
            Employee.division_id == division.id,
            Employee.is_active == True
        ).count()
        
        result.append({
            "id": division.id,
            "name": division.name,
            "code": division.code,
            "color": division.color,
            "description": division.description,
            "department_count": dept_count,
            "employee_count": emp_count,
            "created_at": division.created_at.isoformat() if division.created_at else None
        })
    
    return result

# ==================== DEPARTMENT ROUTES ====================
@app.get("/api/departments")
async def get_departments(
    division_id: Optional[int] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(Department).filter(Department.is_active == True)
    
    if division_id:
        query = query.filter(Department.division_id == division_id)
    elif current_user.role == "manager":
        if current_user.division_id:
            query = query.filter(Department.division_id == current_user.division_id)
    
    departments = query.all()
    
    result = []
    for dept in departments:
        emp_count = db.query(Employee).filter(
            Employee.department_id == dept.id,
            Employee.is_active == True
        ).count()
        
        result.append({
            "id": dept.id,
            "name": dept.name,
            "code": dept.code,
            "division_id": dept.division_id,
            "division_name": dept.division.name if dept.division else None,
            "description": dept.description,
            "employee_count": emp_count,
            "created_at": dept.created_at.isoformat() if dept.created_at else None
        })
    
    return result

# ==================== ATTENDANCE ROUTES ====================
@app.get("/api/attendance")
async def get_attendance(
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    division_id: Optional[int] = None,
    department_id: Optional[int] = None,
    employee_id: Optional[int] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(Attendance).join(Employee).join(User)
    
    # Apply role-based filters
    if current_user.role == "employee":
        employee = db.query(Employee).filter(Employee.user_id == current_user.id).first()
        if employee:
            query = query.filter(Attendance.employee_id == employee.id)
    elif current_user.role == "manager":
        if current_user.division_id:
            query = query.filter(Employee.division_id == current_user.division_id)
    
    # Apply date filters
    if start_date:
        query = query.filter(Attendance.date >= start_date)
    if end_date:
        query = query.filter(Attendance.date <= end_date)
    
    if division_id:
        query = query.filter(Employee.division_id == division_id)
    
    if department_id:
        query = query.filter(Employee.department_id == department_id)
    
    if employee_id:
        query = query.filter(Attendance.employee_id == employee_id)
    
    attendances = query.order_by(Attendance.date.desc()).limit(100).all()
    
    # Calculate stats
    stats = {
        "total": len(attendances),
        "present": sum(1 for a in attendances if a.status == "present"),
        "absent": sum(1 for a in attendances if a.status == "absent"),
        "late": sum(1 for a in attendances if a.status == "late"),
        "total_hours": round(sum(a.hours_worked for a in attendances), 2),
        "attendance_rate": round((sum(1 for a in attendances if a.status in ["present", "late"]) / len(attendances) * 100) if attendances else 0, 1)
    }
    
    # Format attendance data
    formatted_attendances = []
    for attendance in attendances:
        formatted_attendances.append({
            "id": attendance.id,
            "date": attendance.date.isoformat() if attendance.date else None,
            "check_in": attendance.check_in.isoformat() if attendance.check_in else None,
            "check_out": attendance.check_out.isoformat() if attendance.check_out else None,
            "status": attendance.status,
            "hours_worked": attendance.hours_worked,
            "overtime_hours": attendance.overtime_hours,
            "notes": attendance.notes,
            "employee": {
                "id": attendance.employee.id,
                "employee_code": attendance.employee.employee_code,
                "position": attendance.employee.position,
                "user": {
                    "full_name": attendance.employee.user.full_name if attendance.employee.user else None,
                    "avatar_url": attendance.employee.user.avatar_url if attendance.employee.user else None
                }
            } if attendance.employee else None
        })
    
    return {"attendances": formatted_attendances, "stats": stats}

@app.post("/api/attendance/check-in")
async def check_in(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    employee = db.query(Employee).filter(Employee.user_id == current_user.id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    today = date.today()
    now = datetime.now()
    
    # Check if already checked in today
    existing = db.query(Attendance).filter(
        Attendance.employee_id == employee.id,
        Attendance.date == today
    ).first()
    
    if existing and existing.check_in:
        raise HTTPException(status_code=400, detail="Already checked in today")
    
    # Determine status (late if after 8:15 AM)
    status = "present"
    if now.time() > time(8, 15):
        status = "late"
    
    if existing:
        existing.check_in = now
        existing.status = status
    else:
        attendance = Attendance(
            employee_id=employee.id,
            user_id=current_user.id,
            date=today,
            check_in=now,
            status=status,
            hours_worked=0
        )
        db.add(attendance)
    
    db.commit()
    
    return {
        "message": "Checked in successfully",
        "status": status,
        "time": now.isoformat(),
        "employee": employee.employee_code
    }

@app.post("/api/attendance/check-out")
async def check_out(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    employee = db.query(Employee).filter(Employee.user_id == current_user.id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    today = date.today()
    now = datetime.now()
    
    attendance = db.query(Attendance).filter(
        Attendance.employee_id == employee.id,
        Attendance.date == today
    ).first()
    
    if not attendance or not attendance.check_in:
        raise HTTPException(status_code=400, detail="You haven't checked in today")
    
    if attendance.check_out:
        raise HTTPException(status_code=400, detail="Already checked out today")
    
    attendance.check_out = now
    
    # Calculate hours worked
    if attendance.check_in:
        hours_worked = (now - attendance.check_in).total_seconds() / 3600
        attendance.hours_worked = round(hours_worked, 2)
        
        # Calculate overtime (if more than 8 hours)
        if hours_worked > 8:
            attendance.overtime_hours = round(hours_worked - 8, 2)
    
    db.commit()
    
    return {
        "message": "Checked out successfully",
        "hours_worked": attendance.hours_worked,
        "overtime_hours": attendance.overtime_hours,
        "time": now.isoformat()
    }

# ==================== LEAVE REQUEST ROUTES ====================
@app.get("/api/requests")
async def get_requests(
    status: Optional[str] = None,
    request_type: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(LeaveRequest).join(User).join(Employee)
    
    if current_user.role == "employee":
        query = query.filter(LeaveRequest.user_id == current_user.id)
    elif current_user.role == "manager":
        if current_user.division_id:
            query = query.filter(Employee.division_id == current_user.division_id)
    
    if status:
        query = query.filter(LeaveRequest.status == status)
    
    if request_type:
        query = query.filter(LeaveRequest.request_type == request_type)
    
    requests = query.order_by(LeaveRequest.created_at.desc()).all()
    
    result = []
    for req in requests:
        result.append({
            "id": req.id,
            "request_type": req.request_type,
            "status": req.status,
            "start_date": req.start_date.isoformat() if req.start_date else None,
            "end_date": req.end_date.isoformat() if req.end_date else None,
            "reason": req.reason,
            "notes": req.notes,
            "created_at": req.created_at.isoformat() if req.created_at else None,
            "user": {
                "id": req.user.id,
                "full_name": req.user.full_name,
                "email": req.user.email
            } if req.user else None,
            "employee": {
                "employee_code": req.employee.employee_code if req.employee else None,
                "position": req.employee.position if req.employee else None
            } if req.employee else None,
            "approver": {
                "full_name": req.approver.full_name if req.approver else None
            } if req.approver else None
        })
    
    return result

@app.post("/api/requests")
async def create_request(
    request_data: dict,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    employee = db.query(Employee).filter(Employee.user_id == current_user.id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    try:
        request = LeaveRequest(
            user_id=current_user.id,
            employee_id=employee.id,
            request_type=request_data.get("request_type", "leave"),
            start_date=datetime.strptime(request_data.get("start_date"), "%Y-%m-%d").date(),
            end_date=datetime.strptime(request_data.get("end_date"), "%Y-%m-%d").date() if request_data.get("end_date") else None,
            reason=request_data.get("reason", ""),
            status="pending"
        )
        
        db.add(request)
        db.commit()
        db.refresh(request)
        
        return {
            "id": request.id,
            "message": "Request submitted successfully",
            "status": request.status,
            "request_type": request.request_type
        }
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

@app.put("/api/requests/{request_id}/approve")
async def approve_request(
    request_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role not in ["admin", "manager"]:
        raise HTTPException(status_code=403, detail="Only admins and managers can approve requests")
    
    request = db.query(LeaveRequest).filter(LeaveRequest.id == request_id).first()
    if not request:
        raise HTTPException(status_code=404, detail="Request not found")
    
    # Check if manager has access to this request
    if current_user.role == "manager":
        employee = db.query(Employee).filter(Employee.id == request.employee_id).first()
        if not employee or employee.division_id != current_user.division_id:
            raise HTTPException(status_code=403, detail="Access denied")
    
    try:
        request.status = "approved"
        request.approved_by = current_user.id
        request.approved_at = datetime.now()
        db.commit()
        
        return {"message": "Request approved successfully"}
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

@app.put("/api/requests/{request_id}/reject")
async def reject_request(
    request_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role not in ["admin", "manager"]:
        raise HTTPException(status_code=403, detail="Only admins and managers can reject requests")
    
    request = db.query(LeaveRequest).filter(LeaveRequest.id == request_id).first()
    if not request:
        raise HTTPException(status_code=404, detail="Request not found")
    
    # Check if manager has access to this request
    if current_user.role == "manager":
        employee = db.query(Employee).filter(Employee.id == request.employee_id).first()
        if not employee or employee.division_id != current_user.division_id:
            raise HTTPException(status_code=403, detail="Access denied")
    
    try:
        request.status = "rejected"
        request.approved_by = current_user.id
        request.approved_at = datetime.now()
        db.commit()
        
        return {"message": "Request rejected successfully"}
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

# ==================== SHIFT ROUTES ====================
@app.get("/api/shifts")
async def get_shifts(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    shifts = db.query(Shift).filter(Shift.is_active == True).all()
    
    result = []
    for shift in shifts:
        result.append({
            "id": shift.id,
            "name": shift.name,
            "code": shift.code,
            "start_time": shift.start_time.strftime("%H:%M") if shift.start_time else None,
            "end_time": shift.end_time.strftime("%H:%M") if shift.end_time else None,
            "duration_hours": shift.duration_hours,
            "color": shift.color,
            "break_duration": shift.break_duration,
            "overtime_allowed": shift.overtime_allowed,
            "created_at": shift.created_at.isoformat() if shift.created_at else None
        })
    
    return result

# ==================== HEALTH CHECK ====================
@app.get("/health")
async def health_check(db: Session = Depends(get_db)):
    try:
        db.execute("SELECT 1")
        return {
            "status": "healthy",
            "database": "SQLite connected",
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@app.get("/")
async def root():
    return {
        "message": "Factory Shift Management API",
        "version": "1.0.0",
        "database": "SQLite",
        "docs": "/docs",
        "redoc": "/redoc",
        "endpoints": [
            "/api/auth/login",
            "/api/dashboard/stats",
            "/api/employees",
            "/api/divisions",
            "/api/departments",
            "/api/attendance",
            "/api/requests",
            "/api/shifts"
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)