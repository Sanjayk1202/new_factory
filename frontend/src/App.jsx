import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AdminDashboard from './components/admin/AdminDashboard';
import DivisionDashboard from './components/division/DivisionDashboard';
import ManagerDashboard from './components/manager/ManagerDashboard';
import EmployeeDashboard from './components/employee/EmployeeDashboard';
import Login from './components/auth/Login';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ROLES } from './utils/constants';

// Main App Component
const AppContent = () => {
  const { user, role } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!user) {
    return <Login />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar role={role} activeTab={activeTab} setActiveTab={setActiveTab} />
          <main className="flex-1 p-6 ml-64 mt-16">
            <Routes>
              {/* Admin Routes */}
              {role === ROLES.ADMIN && (
                <>
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                  <Route path="/dashboard" element={<AdminDashboard activeTab={activeTab} />} />
                  <Route path="/employees" element={<AdminDashboard activeTab="employees" />} />
                  <Route path="/divisions" element={<AdminDashboard activeTab="divisions" />} />
                  <Route path="/notifications" element={<AdminDashboard activeTab="notifications" />} />
                  <Route path="/attendance" element={<AdminDashboard activeTab="attendance" />} />
                  <Route path="/schedule-control" element={<AdminDashboard activeTab="schedule-control" />} />
                  <Route path="/reports" element={<AdminDashboard activeTab="reports" />} />
                  <Route path="/settings" element={<AdminDashboard activeTab="settings" />} />
                </>
              )}

              {/* Division Manager Routes */}
              {role === ROLES.DIVISION_MANAGER && (
                <>
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                  <Route path="/dashboard" element={<DivisionDashboard activeTab={activeTab} />} />
                  <Route path="/departments" element={<DivisionDashboard activeTab="departments" />} />
                  <Route path="/attendance" element={<DivisionDashboard activeTab="attendance" />} />
                  <Route path="/schedule" element={<DivisionDashboard activeTab="schedule" />} />
                  <Route path="/notifications" element={<DivisionDashboard activeTab="notifications" />} />
                  <Route path="/approvals" element={<DivisionDashboard activeTab="approvals" />} />
                  <Route path="/reports" element={<DivisionDashboard activeTab="reports" />} />
                </>
              )}

              {/* Department Manager Routes */}
              {role === ROLES.DEPARTMENT_MANAGER && (
                <>
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                  <Route path="/dashboard" element={<ManagerDashboard activeTab={activeTab} />} />
                  <Route path="/attendance-dashboard" element={<ManagerDashboard activeTab="attendance-dash" />} />
                  <Route path="/schedule" element={<ManagerDashboard activeTab="schedule" />} />
                  <Route path="/daily-schedule" element={<ManagerDashboard activeTab="daily-schedule" />} />
                  <Route path="/notifications" element={<ManagerDashboard activeTab="notifications-panel" />} />
                  <Route path="/approvals" element={<ManagerDashboard activeTab="approvals" />} />
                  <Route path="/reports" element={<ManagerDashboard activeTab="reports" />} />
                </>
              )}

              {/* Employee Routes */}
              {role === ROLES.EMPLOYEE && (
                <>
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                  <Route path="/dashboard" element={<EmployeeDashboard activeTab={activeTab} />} />
                  <Route path="/shifts" element={<EmployeeDashboard activeTab="shifts" />} />
                  <Route path="/profile" element={<EmployeeDashboard activeTab="profile" />} />
                  <Route path="/attendance" element={<EmployeeDashboard activeTab="attendance" />} />
                  <Route path="/requests" element={<EmployeeDashboard activeTab="requests" />} />
                  <Route path="/notifications" element={<EmployeeDashboard activeTab="notifications" />} />
                </>
              )}

              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

// Wrapper with AuthProvider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;