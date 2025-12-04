import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI, setAuthToken, clearAuthToken } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      try {
        const userData = await authAPI.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Auth check failed:', error);
        clearAuthToken();
        setUser(null);
      }
    }
    setLoading(false);
  };

  const login = async (username, password) => {
    try {
      const data = await authAPI.login({ username, password });
      setUser(data.user);
      return { success: true, user: data.user };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      clearAuthToken();
      window.location.href = '/';
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const getUserScope = () => {
    if (!user) return null;
    
    return {
      division: user.division,
      department: user.department,
      isDivisionManager: user.role === 'division_manager',
      isDepartmentManager: user.role === 'department_manager',
      isEmployee: user.role === 'employee',
      isAdmin: user.role === 'admin',
    };
  };

  const getAccessibleDivisions = () => {
    // This would come from API in real implementation
    if (user?.role === 'admin') {
      return [
        { id: 1, name: 'Production Division', color: 'blue' },
        { id: 2, name: 'Quality Assurance', color: 'green' },
        { id: 3, name: 'Maintenance', color: 'orange' },
        { id: 4, name: 'Logistics', color: 'purple' },
        { id: 5, name: 'Administration', color: 'gray' },
      ];
    }
    if (user?.role === 'division_manager') {
      return [{ id: user.division_id, name: user.division, color: 'blue' }];
    }
    return [];
  };

  const getAccessibleDepartments = () => {
    // This would come from API in real implementation
    return [];
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading,
      login, 
      logout,
      updateUser,
      getUserScope,
      getAccessibleDivisions,
      getAccessibleDepartments,
    }}>
      {children}
    </AuthContext.Provider>
  );
};