import React from 'react';
import DivisionAttendance from './DivisionAttendance';
import DivisionSchedule from './DivisionSchedule';
import DepartmentManagement from './DepartmentManagement';
import DivisionReports from './DivisionReports';
import DivisionApprovals from './DivisionApprovals';
import { Building2, Users, Clock, BarChart3, TrendingUp, Layers } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getDivisionById, DEPARTMENTS } from '../../utils/constants';

const DivisionDashboard = ({ activeTab }) => {
  const { division, getUserScope } = useAuth();
  const scope = getUserScope();
  const divisionInfo = getDivisionById(division);
  const departments = DEPARTMENTS[division] || [];

  const stats = [
    { label: 'Total Departments', value: departments.length, icon: Layers, color: 'blue', change: '+0' },
    { label: 'Total Employees', value: '120', icon: Users, color: 'green', change: '+5' },
    { label: 'Today Attendance', value: '92%', icon: TrendingUp, color: 'orange', change: '+3%' },
    { label: 'Active Shifts', value: '8', icon: Clock, color: 'purple', change: '-2' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'attendance':
        return <DivisionAttendance />;
      case 'schedule':
        return <DivisionSchedule />;
      case 'departments':
        return <DepartmentManagement />;
      case 'reports':
        return <DivisionReports />;
      case 'approvals':
        return <DivisionApprovals />;
      default:
        return (
          <div className="space-y-6">
            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{divisionInfo?.name} Dashboard</h1>
                  <p className="text-blue-100">Manage your division's departments and operations</p>
                  <div className="flex items-center space-x-4 mt-4">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>{departments.length} Departments</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>24/7 Operations</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white/20 p-4 rounded-xl">
                  <Building2 className="w-8 h-8" />
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
                      stat.change.startsWith('+') ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Department Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Department Overview</h3>
                <div className="space-y-3">
                  {departments.map((dept, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div>
                        <p className="font-medium text-gray-800">{dept.name}</p>
                        <p className="text-sm text-gray-600">Manager: {dept.manager}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-800">45</p>
                        <p className="text-xs text-gray-500">employees</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Generate Division Schedule', icon: Clock },
                    { label: 'View Attendance Reports', icon: BarChart3 },
                    { label: 'Manage Department Managers', icon: Users },
                    { label: 'Send Division Announcement', icon: TrendingUp },
                  ].map((action, idx) => (
                    <button
                      key={idx}
                      className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <span className="font-medium text-gray-700">{action.label}</span>
                      <action.icon className="w-5 h-5 text-gray-500" />
                    </button>
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
          {divisionInfo?.name} - {activeTab.replace('-', ' ')}
        </h2>
        <p className="text-gray-600 mt-1">
          {activeTab === 'dashboard' 
            ? 'Division management overview'
            : `Manage division ${activeTab.replace('-', ' ')}`}
        </p>
      </div>
      {renderContent()}
    </div>
  );
};

export default DivisionDashboard;