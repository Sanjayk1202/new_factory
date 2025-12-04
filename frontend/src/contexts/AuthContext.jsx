import React, { createContext, useState, useContext, useEffect } from 'react';
import { ROLES, DIVISIONS, DEPARTMENTS, getDivisionById, getDepartmentById } from '../utils/constants';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('factory_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [role, setRole] = useState(() => {
    const saved = localStorage.getItem('factory_role');
    return saved || ROLES.EMPLOYEE;
  });

  const [division, setDivision] = useState(() => {
    const saved = localStorage.getItem('factory_division');
    return saved || 'production';
  });

  const [department, setDepartment] = useState(() => {
    const saved = localStorage.getItem('factory_department');
    return saved || 'prod_line_a';
  });

  const login = (userData, userRole, userDivision, userDepartment) => {
    const userObj = {
      ...userData,
      role: userRole,
      division: userDivision,
      department: userDepartment,
    };
    
    setUser(userObj);
    setRole(userRole);
    setDivision(userDivision);
    setDepartment(userDepartment);
    
    localStorage.setItem('factory_user', JSON.stringify(userObj));
    localStorage.setItem('factory_role', userRole);
    localStorage.setItem('factory_division', userDivision);
    localStorage.setItem('factory_department', userDepartment);
  };

  const logout = () => {
    setUser(null);
    setRole(ROLES.EMPLOYEE);
    setDivision('production');
    setDepartment('prod_line_a');
    
    localStorage.removeItem('factory_user');
    localStorage.removeItem('factory_role');
    localStorage.removeItem('factory_division');
    localStorage.removeItem('factory_department');
    localStorage.removeItem('token');
  };

  // Remove auto-login for demo - users must login with real credentials

  // Get user's scope information
  const getUserScope = () => {
    if (!user) return null;
    
    const divisionInfo = getDivisionById(division);
    const departmentInfo = getDepartmentById(division, department);
    
    return {
      division: divisionInfo,
      department: departmentInfo,
      isDivisionManager: role === ROLES.DIVISION_MANAGER,
      isDepartmentManager: role === ROLES.DEPARTMENT_MANAGER,
      isEmployee: role === ROLES.EMPLOYEE,
    };
  };

  // Get accessible divisions for the user
  const getAccessibleDivisions = () => {
    if (role === ROLES.ADMIN) return DIVISIONS;
    if (role === ROLES.DIVISION_MANAGER || role === ROLES.DEPARTMENT_MANAGER) {
      return DIVISIONS.filter(d => d.id === division);
    }
    return [];
  };

  // Get accessible departments for the user
  const getAccessibleDepartments = () => {
    if (role === ROLES.ADMIN) return Object.values(DEPARTMENTS).flat();
    if (role === ROLES.DIVISION_MANAGER) return DEPARTMENTS[division] || [];
    if (role === ROLES.DEPARTMENT_MANAGER) {
      return DEPARTMENTS[division]?.filter(d => d.id === department) || [];
    }
    return [];
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      role, 
      division,
      department,
      login, 
      logout,
      getUserScope,
      getAccessibleDivisions,
      getAccessibleDepartments,
    }}>
      {children}
    </AuthContext.Provider>
  );
};