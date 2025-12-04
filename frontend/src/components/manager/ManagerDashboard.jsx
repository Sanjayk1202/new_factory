import React from 'react';
import AttendanceDashboard from './AttendanceDashboard';
import ScheduleManager from './ScheduleManager';
import DailySchedule from './DailySchedule';
import NotificationsPanel from './NotificationsPanel';
import Approvals from './Approvals';
import { BarChart3, TrendingUp, Users, Clock, Building2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getDivisionById, getDepartmentById } from '../../utils/constants';

const ManagerDashboard = ({ activeTab }) => {
  const { division, department, getUserScope } = useAuth();
  const scope = getUserScope();
  
  const divisionInfo = getDivisionById(division);
  const departmentInfo = getDepartmentById(division, department);

  const stats = [
    { label: 'Department Size', value: '45', icon: Users, color: 'blue', change: '+2' },
    { label: 'Today Attendance', value: '92%', icon: TrendingUp, color: 'green', change: '+3%' },
    { label: 'Active Shifts', value: '3', icon: Clock, color: 'purple', change: '0' },
    { label: 'Pending Approvals', value: '8', icon: BarChart3, color: 'orange', change: '-2' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'attendance-dash':
        return <AttendanceDashboard />;
      case 'schedule':
        return <ScheduleManager />;
      case 'daily-schedule':
        return <DailySchedule />;
      case 'notifications-panel':
        return <NotificationsPanel />;
      case 'approvals':
        return <Approvals />;
      default:
        return (
          <div className="space-y-6">
            {/* Welcome */}
            <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-8 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Department Manager Dashboard</h1>
                  <p className="text-green-100">Manage your department's schedule and performance</p>
                  <div className="flex items-center space-x-4 mt-4">
                    <div className="flex items-center space-x-2">
                      <Building2 className="w-4 h-4" />
                      <span>{divisionInfo?.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>{departmentInfo?.name}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white/20 p-4 rounded-xl">
                  <Users className="w-8 h-8" />
                </div>
              </div>
            </div>

            {/* Stats */}
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 card p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Department Performance</h3>
                {/* Add chart component here */}
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Performance Chart for {departmentInfo?.name}</p>
                </div>
              </div>
              
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Approve Leave Requests', count: 3 },
                    { label: 'Schedule Changes', count: 5 },
                    { label: 'Team Notifications', count: 12 },
                    { label: 'Shift Swaps', count: 2 },
                    { label: 'Report to Division', count: 0 },
                  ].map((link, idx) => (
                    <button
                      key={idx}
                      className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <span className="font-medium text-gray-700">{link.label}</span>
                      {link.count > 0 && (
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                          {link.count}
                        </span>
                      )}
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
          {activeTab.replace('-', ' ')}
        </h2>
        <p className="text-gray-600 mt-1">
          {activeTab === 'dashboard' 
            ? `${departmentInfo?.name} Department Management`
            : `Manage department ${activeTab.replace('-', ' ')}`}
        </p>
      </div>
      {renderContent()}
    </div>
  );
};

export default ManagerDashboard;