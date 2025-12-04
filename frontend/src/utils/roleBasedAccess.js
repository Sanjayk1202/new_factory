import { ROLES, DIVISIONS, DEPARTMENTS } from './constants';

// Permission definitions
export const PERMISSIONS = {
  // Employee permissions
  VIEW_OWN_SHIFTS: 'view_own_shifts',
  VIEW_OWN_ATTENDANCE: 'view_own_attendance',
  REQUEST_LEAVE: 'request_leave',
  REQUEST_SHIFT_SWAP: 'request_shift_swap',
  VIEW_OWN_PROFILE: 'view_own_profile',
  UPDATE_OWN_PROFILE: 'update_own_profile',
  
  // Department Manager permissions
  VIEW_DEPARTMENT_SHIFTS: 'view_department_shifts',
  VIEW_DEPARTMENT_ATTENDANCE: 'view_department_attendance',
  APPROVE_DEPARTMENT_REQUESTS: 'approve_department_requests',
  GENERATE_DEPARTMENT_SCHEDULE: 'generate_department_schedule',
  MANAGE_DEPARTMENT_EMPLOYEES: 'manage_department_employees',
  SEND_DEPARTMENT_NOTIFICATIONS: 'send_department_notifications',
  
  // Division Manager permissions
  VIEW_DIVISION_SHIFTS: 'view_division_shifts',
  VIEW_DIVISION_ATTENDANCE: 'view_division_attendance',
  APPROVE_DIVISION_REQUESTS: 'approve_division_requests',
  GENERATE_DIVISION_SCHEDULE: 'generate_division_schedule',
  MANAGE_DIVISION_EMPLOYEES: 'manage_division_employees',
  MANAGE_DIVISION_DEPARTMENTS: 'manage_division_departments',
  SEND_DIVISION_NOTIFICATIONS: 'send_division_notifications',
  
  // Admin permissions
  MANAGE_ALL_DIVISIONS: 'manage_all_divisions',
  MANAGE_ALL_DEPARTMENTS: 'manage_all_departments',
  MANAGE_ALL_EMPLOYEES: 'manage_all_employees',
  MANAGE_ALL_SCHEDULES: 'manage_all_schedules',
  SEND_SYSTEM_NOTIFICATIONS: 'send_system_notifications',
  VIEW_ALL_REPORTS: 'view_all_reports',
  MANAGE_SYSTEM_SETTINGS: 'manage_system_settings',
};

// Role to permissions mapping
export const ROLE_PERMISSIONS = {
  [ROLES.EMPLOYEE]: [
    PERMISSIONS.VIEW_OWN_SHIFTS,
    PERMISSIONS.VIEW_OWN_ATTENDANCE,
    PERMISSIONS.REQUEST_LEAVE,
    PERMISSIONS.REQUEST_SHIFT_SWAP,
    PERMISSIONS.VIEW_OWN_PROFILE,
    PERMISSIONS.UPDATE_OWN_PROFILE,
  ],
  
  [ROLES.DEPARTMENT_MANAGER]: [
    ...ROLE_PERMISSIONS[ROLES.EMPLOYEE],
    PERMISSIONS.VIEW_DEPARTMENT_SHIFTS,
    PERMISSIONS.VIEW_DEPARTMENT_ATTENDANCE,
    PERMISSIONS.APPROVE_DEPARTMENT_REQUESTS,
    PERMISSIONS.GENERATE_DEPARTMENT_SCHEDULE,
    PERMISSIONS.MANAGE_DEPARTMENT_EMPLOYEES,
    PERMISSIONS.SEND_DEPARTMENT_NOTIFICATIONS,
  ],
  
  [ROLES.DIVISION_MANAGER]: [
    ...ROLE_PERMISSIONS[ROLES.DEPARTMENT_MANAGER],
    PERMISSIONS.VIEW_DIVISION_SHIFTS,
    PERMISSIONS.VIEW_DIVISION_ATTENDANCE,
    PERMISSIONS.APPROVE_DIVISION_REQUESTS,
    PERMISSIONS.GENERATE_DIVISION_SCHEDULE,
    PERMISSIONS.MANAGE_DIVISION_EMPLOYEES,
    PERMISSIONS.MANAGE_DIVISION_DEPARTMENTS,
    PERMISSIONS.SEND_DIVISION_NOTIFICATIONS,
  ],
  
  [ROLES.ADMIN]: [
    ...ROLE_PERMISSIONS[ROLES.DIVISION_MANAGER],
    PERMISSIONS.MANAGE_ALL_DIVISIONS,
    PERMISSIONS.MANAGE_ALL_DEPARTMENTS,
    PERMISSIONS.MANAGE_ALL_EMPLOYEES,
    PERMISSIONS.MANAGE_ALL_SCHEDULES,
    PERMISSIONS.SEND_SYSTEM_NOTIFICATIONS,
    PERMISSIONS.VIEW_ALL_REPORTS,
    PERMISSIONS.MANAGE_SYSTEM_SETTINGS,
  ],
};

// Helper to get user's division and department
export const getUserScope = (user) => {
  if (!user) return { division: null, department: null };
  
  return {
    division: user.division || null,
    department: user.department || null,
    isDivisionManager: user.role === ROLES.DIVISION_MANAGER,
    isDepartmentManager: user.role === ROLES.DEPARTMENT_MANAGER,
  };
};

// Get departments for a specific division
export const getDepartmentsForDivision = (divisionId) => {
  return DEPARTMENTS[divisionId] || [];
};

// Get all divisions
export const getAllDivisions = () => {
  return DIVISIONS;
};

// Get division by ID
export const getDivisionById = (divisionId) => {
  return DIVISIONS.find(div => div.id === divisionId);
};

// Get department by ID
export const getDepartmentById = (divisionId, departmentId) => {
  const departments = DEPARTMENTS[divisionId] || [];
  return departments.find(dept => dept.id === departmentId);
};

// Check if user has access to specific division
export const canAccessDivision = (user, divisionId) => {
  if (!user) return false;
  
  if (user.role === ROLES.ADMIN) return true;
  
  if (user.role === ROLES.DIVISION_MANAGER || user.role === ROLES.DEPARTMENT_MANAGER) {
    return user.division === divisionId;
  }
  
  return false;
};

// Check if user has access to specific department
export const canAccessDepartment = (user, divisionId, departmentId) => {
  if (!user) return false;
  
  if (user.role === ROLES.ADMIN) return true;
  
  if (user.role === ROLES.DIVISION_MANAGER) {
    return user.division === divisionId;
  }
  
  if (user.role === ROLES.DEPARTMENT_MANAGER) {
    return user.division === divisionId && user.department === departmentId;
  }
  
  return false;
};

// Rest of the file remains similar...

// Route protection based on role
export const getAccessibleRoutes = (userRole) => {
  const baseRoutes = [
    { path: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { path: '/profile', label: 'Profile', icon: 'User' },
  ];
  
  if (userRole === ROLES.EMPLOYEE) {
    return [
      ...baseRoutes,
      { path: '/shifts', label: 'My Shifts', icon: 'Clock' },
      { path: '/attendance', label: 'Attendance', icon: 'CheckCircle' },
      { path: '/requests', label: 'Requests', icon: 'FileText' },
      { path: '/notifications', label: 'Notifications', icon: 'Bell' },
    ];
  }
  
  if (userRole === ROLES.MANAGER) {
    return [
      ...baseRoutes,
      { path: '/team', label: 'Team', icon: 'Users' },
      { path: '/attendance-dashboard', label: 'Attendance', icon: 'BarChart' },
      { path: '/schedule', label: 'Schedule', icon: 'Calendar' },
      { path: '/approvals', label: 'Approvals', icon: 'ThumbsUp' },
      { path: '/notifications', label: 'Notifications', icon: 'Bell' },
      { path: '/reports', label: 'Reports', icon: 'FileText' },
    ];
  }
  
  if (userRole === ROLES.ADMIN) {
    return [
      ...baseRoutes,
      { path: '/employees', label: 'Employees', icon: 'Users' },
      { path: '/departments', label: 'Departments', icon: 'Building2' },
      { path: '/attendance-management', label: 'Attendance', icon: 'ClipboardCheck' },
      { path: '/schedule-control', label: 'Schedule', icon: 'Calendar' },
      { path: '/notifications-center', label: 'Notifications', icon: 'Bell' },
      { path: '/reports', label: 'Reports', icon: 'FileText' },
      { path: '/settings', label: 'Settings', icon: 'Settings' },
    ];
  }
  
  return baseRoutes;
};

// Component wrapper for role-based access control
export const withRoleCheck = (WrappedComponent, requiredPermissions = []) => {
  return (props) => {
    const { role } = props; // Assuming role is passed as prop or from context
    
    if (!role) {
      return <div>Access Denied: No role specified</div>;
    }
    
    if (requiredPermissions.length > 0 && !hasAllPermissions(role, requiredPermissions)) {
      return (
        <div className="p-8 text-center">
          <div className="text-red-600 font-semibold mb-2">Access Denied</div>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      );
    }
    
    return <WrappedComponent {...props} />;
  };
};