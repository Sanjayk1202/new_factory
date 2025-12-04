import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Building2, User, Lock, Eye, EyeOff, Users, Layers } from 'lucide-react';
import { ROLES, DIVISIONS, DEPARTMENTS } from '../../utils/constants';

const Login = () => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState(ROLES.EMPLOYEE);
  const [selectedDivision, setSelectedDivision] = useState('production');
  const [selectedDepartment, setSelectedDepartment] = useState('prod_line_a');

  const handleLogin = (e) => {
    e.preventDefault();
    
    let userData = {
      id: '1',
      email: `${role}@factory.com`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${role}`
    };

    // Set user data based on role
    if (role === ROLES.ADMIN) {
      userData.name = 'Admin User';
      userData.division = 'production';
      userData.department = 'prod_line_a';
    } else if (role === ROLES.DIVISION_MANAGER) {
      const division = DIVISIONS.find(d => d.id === selectedDivision);
      userData.name = `${division?.name} Manager`;
      userData.division = selectedDivision;
      userData.department = null;
    } else if (role === ROLES.DEPARTMENT_MANAGER) {
      const division = DIVISIONS.find(d => d.id === selectedDivision);
      const department = DEPARTMENTS[selectedDivision]?.find(d => d.id === selectedDepartment);
      userData.name = `${department?.name} Manager`;
      userData.division = selectedDivision;
      userData.department = selectedDepartment;
    } else {
      userData.name = 'John Doe - Production Operator';
      userData.division = selectedDivision;
      userData.department = selectedDepartment;
    }

    login(userData, role, selectedDivision, selectedDepartment);
  };

  // Get departments for selected division
  const getDepartmentsForDivision = (divisionId) => {
    return DEPARTMENTS[divisionId] || [];
  };

  // Role descriptions
  const roleDescriptions = {
    [ROLES.ADMIN]: 'Full system access across all divisions',
    [ROLES.DIVISION_MANAGER]: 'Manage an entire division with multiple departments',
    [ROLES.DEPARTMENT_MANAGER]: 'Manage a specific department within a division',
    [ROLES.EMPLOYEE]: 'Employee access to personal schedule and attendance',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">FactoryShift</h1>
          <p className="text-gray-600 mt-2">Division-Based Attendance & Shift Management</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign In</h2>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Role</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.values(ROLES).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`py-3 rounded-lg font-medium capitalize transition-all ${
                    role === r
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {r.replace('_', ' ')}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2">{roleDescriptions[role]}</p>
          </div>

          {/* Division Selection (for non-admin roles) */}
          {role !== ROLES.ADMIN && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Division
              </label>
              <select
                value={selectedDivision}
                onChange={(e) => {
                  setSelectedDivision(e.target.value);
                  // Reset department when division changes
                  const depts = getDepartmentsForDivision(e.target.value);
                  if (depts.length > 0) {
                    setSelectedDepartment(depts[0].id);
                  }
                }}
                className="input-field"
              >
                {DIVISIONS.map(division => (
                  <option key={division.id} value={division.id}>
                    {division.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Department Selection (for department managers and employees) */}
          {(role === ROLES.DEPARTMENT_MANAGER || role === ROLES.EMPLOYEE) && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Department
              </label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="input-field"
              >
                {getDepartmentsForDivision(selectedDivision).map(dept => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employee ID / Email
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Enter your ID or email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue={`${role}@factory.com`}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue="password123"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3.5 rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              Sign In as {role.replace('_', ' ').toUpperCase()}
            </button>

            <p className="text-center text-gray-600 text-sm mt-6">
              Demo Login: Use any credentials<br />
              Role changes based on selection
            </p>
          </form>
        </div>

        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>© 2024 FactoryShift. All rights reserved.</p>
          <p className="mt-1">Division-Based Factory Management System</p>
        </div>
      </div>
    </div>
  );
};

export default Login;