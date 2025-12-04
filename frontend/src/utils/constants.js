export const ROLES = {
  ADMIN: 'admin',
  DIVISION_MANAGER: 'division_manager',
  DEPARTMENT_MANAGER: 'department_manager',
  EMPLOYEE: 'employee',
};

export const DIVISIONS = [
  { id: 'production', name: 'Production Division', color: 'blue' },
  { id: 'quality', name: 'Quality Assurance Division', color: 'green' },
  { id: 'maintenance', name: 'Maintenance Division', color: 'orange' },
  { id: 'logistics', name: 'Logistics Division', color: 'purple' },
  { id: 'admin', name: 'Administrative Division', color: 'gray' },
];

export const DEPARTMENTS = {
  production: [
    { id: 'prod_line_a', name: 'Production Line A', manager: 'John Smith' },
    { id: 'prod_line_b', name: 'Production Line B', manager: 'Sarah Johnson' },
    { id: 'prod_line_c', name: 'Production Line C', manager: 'Mike Wilson' },
    { id: 'assembly', name: 'Assembly Unit', manager: 'Lisa Brown' },
  ],
  quality: [
    { id: 'qc_incoming', name: 'Incoming QC', manager: 'Robert Chen' },
    { id: 'qc_process', name: 'Process QC', manager: 'Emma Davis' },
    { id: 'qc_final', name: 'Final QC', manager: 'James Miller' },
    { id: 'qa_audit', name: 'QA Audit', manager: 'Patricia Taylor' },
  ],
  maintenance: [
    { id: 'mechanical', name: 'Mechanical Maintenance', manager: 'David Wilson' },
    { id: 'electrical', name: 'Electrical Maintenance', manager: 'Jennifer Lee' },
    { id: 'preventive', name: 'Preventive Maintenance', manager: 'Thomas Anderson' },
  ],
  logistics: [
    { id: 'warehouse', name: 'Warehouse', manager: 'Christopher Martin' },
    { id: 'shipping', name: 'Shipping & Receiving', manager: 'Amanda Thompson' },
    { id: 'inventory', name: 'Inventory Control', manager: 'Daniel Clark' },
  ],
  admin: [
    { id: 'hr', name: 'Human Resources', manager: 'Susan Walker' },
    { id: 'finance', name: 'Finance', manager: 'Kevin Hall' },
    { id: 'it', name: 'IT Support', manager: 'Nancy Allen' },
    { id: 'facilities', name: 'Facilities', manager: 'Paul King' },
  ],
};

// Add these missing helper functions
export const getDivisionById = (divisionId) => {
  return DIVISIONS.find(div => div.id === divisionId);
};

export const getDepartmentById = (divisionId, departmentId) => {
  const departments = DEPARTMENTS[divisionId] || [];
  return departments.find(dept => dept.id === departmentId);
};

export const SHIFT_TYPES = [
  { id: 'morning', name: 'Morning', start: '08:00', end: '16:00', color: 'blue' },
  { id: 'afternoon', name: 'Afternoon', start: '16:00', end: '00:00', color: 'green' },
  { id: 'night', name: 'Night', start: '00:00', end: '08:00', color: 'purple' },
  { id: 'swing', name: 'Swing', start: '12:00', end: '20:00', color: 'orange' },
];

export const ATTENDANCE_STATUS = {
  PRESENT: { label: 'Present', color: 'green', icon: 'CheckCircle' },
  LATE: { label: 'Late', color: 'yellow', icon: 'Clock' },
  ABSENT: { label: 'Absent', color: 'red', icon: 'XCircle' },
  ON_LEAVE: { label: 'On Leave', color: 'blue', icon: 'Calendar' },
  SICK_LEAVE: { label: 'Sick Leave', color: 'orange', icon: 'Heart' },
  HOLIDAY: { label: 'Holiday', color: 'purple', icon: 'Star' },
};

export const REQUEST_TYPES = {
  LEAVE: { label: 'Leave Request', icon: 'Calendar', color: 'blue' },
  SHIFT_SWAP: { label: 'Shift Swap', icon: 'RefreshCw', color: 'purple' },
  OVERTIME: { label: 'Overtime', icon: 'Clock', color: 'orange' },
  SHIFT_CHANGE: { label: 'Shift Change', icon: 'Edit2', color: 'green' },
};

export const NOTIFICATION_TYPES = {
  INFO: { label: 'Information', color: 'blue', icon: 'Info' },
  ALERT: { label: 'Alert', color: 'red', icon: 'AlertTriangle' },
  WARNING: { label: 'Warning', color: 'yellow', icon: 'AlertCircle' },
  SUCCESS: { label: 'Success', color: 'green', icon: 'CheckCircle' },
  APPROVAL: { label: 'Approval', color: 'purple', icon: 'ThumbsUp' },
};

export const SCHEDULE_STATUS = {
  DRAFT: { label: 'Draft', color: 'gray' },
  PENDING: { label: 'Pending', color: 'yellow' },
  ACTIVE: { label: 'Active', color: 'green' },
  COMPLETED: { label: 'Completed', color: 'blue' },
  CANCELLED: { label: 'Cancelled', color: 'red' },
};

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  EMPLOYEES: {
    BASE: '/employees',
    ME: '/employees/me',
    ATTENDANCE: '/employees/attendance',
    SHIFTS: '/employees/shifts',
    REQUESTS: '/employees/requests',
  },
  MANAGER: {
    TEAM: '/manager/team',
    TEAM_ATTENDANCE: '/manager/attendance',
    SCHEDULE: '/manager/schedule',
    APPROVALS: '/manager/approvals',
  },
  ADMIN: {
    EMPLOYEES: '/admin/employees',
    DEPARTMENTS: '/admin/departments',
    SCHEDULE: '/admin/schedule',
    NOTIFICATIONS: '/admin/notifications',
    REPORTS: '/admin/reports',
  },
};