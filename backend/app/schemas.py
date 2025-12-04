# backend/app/schemas.py
from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional, List, Dict, Any
from datetime import datetime, date, time
from enum import Enum

class RoleEnum(str, Enum):
    ADMIN = "admin"
    DIVISION_MANAGER = "division_manager"
    DEPARTMENT_MANAGER = "department_manager"
    EMPLOYEE = "employee"

# User Schemas
class UserBase(BaseModel):
    username: str
    email: EmailStr
    full_name: str
    role: RoleEnum = RoleEnum.EMPLOYEE
    division_id: Optional[int] = None
    department_id: Optional[int] = None
    phone: Optional[str] = None
    avatar_url: Optional[str] = None

class UserCreate(UserBase):
    password: str = Field(..., min_length=6)

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    phone: Optional[str] = None
    avatar_url: Optional[str] = None
    division_id: Optional[int] = None
    department_id: Optional[int] = None

class UserInDB(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Auth Schemas
class LoginRequest(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user: Dict[str, Any]

class TokenData(BaseModel):
    username: Optional[str] = None

# Division Schemas
class DivisionBase(BaseModel):
    name: str
    code: str
    description: Optional[str] = None
    color: str = "blue"
    manager_id: Optional[int] = None

class DivisionCreate(DivisionBase):
    pass

class DivisionUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    color: Optional[str] = None
    manager_id: Optional[int] = None
    is_active: Optional[bool] = None

class DivisionInDB(DivisionBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

# Department Schemas
class DepartmentBase(BaseModel):
    name: str
    code: str
    division_id: int
    manager_id: Optional[int] = None
    description: Optional[str] = None

class DepartmentCreate(DepartmentBase):
    pass

class DepartmentUpdate(BaseModel):
    name: Optional[str] = None
    code: Optional[str] = None
    manager_id: Optional[int] = None
    description: Optional[str] = None
    is_active: Optional[bool] = None

class DepartmentInDB(DepartmentBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

# Employee Schemas
class EmployeeBase(BaseModel):
    employee_code: str
    division_id: int
    department_id: int
    position: str
    hire_date: date
    phone: Optional[str] = None
    address: Optional[str] = None
    emergency_contact: Optional[str] = None
    emergency_phone: Optional[str] = None
    shift_type: str = "morning"
    salary_grade: Optional[str] = None
    employment_type: str = "permanent"

class EmployeeCreate(EmployeeBase):
    user_id: int

class EmployeeUpdate(BaseModel):
    position: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    emergency_contact: Optional[str] = None
    emergency_phone: Optional[str] = None
    shift_type: Optional[str] = None
    salary_grade: Optional[str] = None
    employment_type: Optional[str] = None
    is_active: Optional[bool] = None

class EmployeeInDB(EmployeeBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Attendance Schemas
class AttendanceBase(BaseModel):
    employee_id: int
    date: date
    check_in: Optional[datetime] = None
    check_out: Optional[datetime] = None
    status: str = "absent"
    hours_worked: float = 0
    overtime_hours: float = 0
    notes: Optional[str] = None

class AttendanceCreate(AttendanceBase):
    pass

class AttendanceUpdate(BaseModel):
    check_in: Optional[datetime] = None
    check_out: Optional[datetime] = None
    status: Optional[str] = None
    hours_worked: Optional[float] = None
    overtime_hours: Optional[float] = None
    notes: Optional[str] = None

class AttendanceInDB(AttendanceBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Leave Request Schemas
class LeaveRequestBase(BaseModel):
    request_type: str
    start_date: date
    end_date: Optional[date] = None
    reason: str
    notes: Optional[str] = None

class LeaveRequestCreate(LeaveRequestBase):
    pass

class LeaveRequestUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None

class LeaveRequestInDB(LeaveRequestBase):
    id: int
    user_id: int
    employee_id: int
    status: str
    approved_by: Optional[int] = None
    approved_at: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Dashboard Schemas
class DashboardStats(BaseModel):
    total_employees: int
    total_divisions: int
    total_departments: int
    today_attendance: str
    today_present: int
    today_absent: int
    today_late: int
    pending_requests: int
    divisions_stats: List[Dict[str, Any]]

class AttendanceStats(BaseModel):
    total: int
    present: int
    absent: int
    late: int
    total_hours: float
    attendance_rate: float

# Pagination Schemas
class PaginatedResponse(BaseModel):
    items: List[Any]
    total: int
    page: int
    limit: int
    total_pages: int