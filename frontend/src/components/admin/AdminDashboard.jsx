import React, { useState, useEffect } from 'react';
import { 
  Users, Building2, Clock, Calendar, 
  CheckCircle, AlertTriangle, TrendingUp, Layers,
  Plus
} from 'lucide-react';
import { dashboardAPI, divisionAPI, departmentAPI, employeeAPI } from '../../services/api';
import StatsCard from '../common/StatsCard';

const AdminDashboard = ({ activeTab }) => {
  const [stats, setStats] = useState({
    totalDivisions: 0,
    totalDepartments: 0,
    totalEmployees: 0,
    todayAttendance: '0%'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const data = await dashboardAPI.getStats();
      setStats({
        totalDivisions: data.total_divisions,
        totalDepartments: data.total_departments,
        totalEmployees: data.total_employees,
        todayAttendance: data.today_attendance
      });
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'employees':
        return <EmployeeDatabase />;
      case 'divisions':
        return <Divisions />;
      case 'notifications':
        return <Notifications />;
      case 'attendance':
        return <AttendanceApp />;
      case 'schedule-control':
        return <ScheduleControl />;
      default:
        return (
          <div className="space-y-6">
            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
                  <p className="text-purple-100">Manage all divisions, departments, and employees</p>
                </div>
                <div className="bg-white/20 p-4 rounded-xl">
                  <Layers className="w-8 h-8" />
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Divisions"
                value={stats.totalDivisions}
                change="+0"
                icon={Layers}
                color="purple"
                loading={loading}
              />
              <StatsCard
                title="Total Departments"
                value={stats.totalDepartments}
                change="+0"
                icon={Building2}
                color="blue"
                loading={loading}
              />
              <StatsCard
                title="Total Employees"
                value={stats.totalEmployees}
                change="+0"
                icon={Users}
                color="green"
                loading={loading}
              />
              <StatsCard
                title="Today Attendance"
                value={stats.todayAttendance}
                change="+0%"
                icon={CheckCircle}
                color="orange"
                loading={loading}
              />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Add Division', icon: Layers, action: () => {/* Open division modal */} },
                    { label: 'Add Department', icon: Building2, action: () => {/* Open department modal */} },
                    { label: 'Add Employee', icon: Users, action: () => {/* Open employee modal */} },
                    { label: 'Create Shift', icon: Clock, action: () => {/* Open shift modal */} },
                  ].map((action, idx) => (
                    <button
                      key={idx}
                      onClick={action.action}
                      className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className={`p-2 rounded-lg bg-${action.color}-50 mb-2`}>
                        <action.icon className={`w-5 h-5 text-${action.color}-600`} />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    { action: 'New employee added', user: 'John Doe', time: '10 min ago' },
                    { action: 'Schedule approved', user: 'Production Division', time: '1 hour ago' },
                    { action: 'Attendance report generated', user: 'Admin', time: '2 hours ago' },
                    { action: 'Shift swap requested', user: 'Jane Smith', time: '3 hours ago' },
                  ].map((activity, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">{activity.action}</p>
                        <p className="text-sm text-gray-600">by {activity.user}</p>
                      </div>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 capitalize">
          {activeTab === 'divisions' ? 'Divisions & Departments' : activeTab.replace('-', ' ')}
        </h2>
        <p className="text-gray-600 mt-1">
          {activeTab === 'dashboard' 
            ? 'Overview of all factory divisions'
            : `Manage ${activeTab.replace('-', ' ')}`}
        </p>
      </div>
      {renderContent()}
    </div>
  );
};

export default AdminDashboard;