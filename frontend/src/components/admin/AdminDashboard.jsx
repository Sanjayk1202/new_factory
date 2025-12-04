import React from 'react';
import EmployeeDatabase from './EmployeeDatabase';
import Divisions from './Divisions'; // Changed from Departments
import Notifications from './Notifications';
import AttendanceApp from './AttendanceApp';
import ScheduleControl from './ScheduleControl';
import { 
  Users, Building2, Clock, Calendar, 
  CheckCircle, AlertTriangle, TrendingUp, Layers 
} from 'lucide-react';

const AdminDashboard = ({ activeTab }) => {
  const stats = [
    { label: 'Total Divisions', value: '5', change: '+1', icon: Layers, color: 'purple' },
    { label: 'Total Departments', value: '18', change: '+3', icon: Building2, color: 'blue' },
    { label: 'Total Employees', value: '248', change: '+12%', icon: Users, color: 'green' },
    { label: 'Today Attendance', value: '94%', change: '+2%', icon: CheckCircle, color: 'orange' },
  ];

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
              {stats.map((stat, index) => (
                <div key={index} className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-${stat.color}-50`}>
                      <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                    </div>
                    <span className={`text-sm font-medium ${
                      stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Add Division', icon: Layers, color: 'purple' },
                    { label: 'Add Department', icon: Building2, color: 'blue' },
                    { label: 'Add Employee', icon: Users, color: 'green' },
                    { label: 'Create Shift', icon: Clock, color: 'orange' },
                  ].map((action, idx) => (
                    <button
                      key={idx}
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

              {/* Division Overview */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Division Overview</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Production Division', employees: 120, departments: 4, color: 'blue' },
                    { name: 'Quality Assurance', employees: 45, departments: 4, color: 'green' },
                    { name: 'Maintenance', employees: 35, departments: 3, color: 'orange' },
                    { name: 'Logistics', employees: 28, departments: 3, color: 'purple' },
                  ].map((division, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full bg-${division.color}-500`}></div>
                        <div>
                          <p className="font-medium text-gray-800">{division.name}</p>
                          <p className="text-sm text-gray-600">
                            {division.departments} depts • {division.employees} employees
                          </p>
                        </div>
                      </div>
                      <button className="text-sm text-blue-600 hover:text-blue-800">
                        View →
                      </button>
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