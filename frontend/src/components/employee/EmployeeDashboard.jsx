import React from 'react';
import ShiftView from './ShiftView';
import Profile from './Profile';
import Attendance from './Attendance';
import Requests from './Requests';
import { Clock, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

const EmployeeDashboard = ({ activeTab }) => {
  const upcomingShifts = [
    { date: 'Today', shift: 'Morning (08:00 - 16:00)', location: 'Production Line A' },
    { date: 'Tomorrow', shift: 'Morning (08:00 - 16:00)', location: 'Production Line B' },
    { date: 'Jan 17', shift: 'Afternoon (16:00 - 00:00)', location: 'Quality Check' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'shifts':
        return <ShiftView />;
      case 'profile':
        return <Profile />;
      case 'attendance':
        return <Attendance />;
      case 'requests':
        return <Requests />;
      default:
        return (
          <div className="space-y-6">
            {/* Welcome */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl p-8 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
                  <p className="text-blue-100">Check your schedule and attendance</p>
                </div>
                <div className="bg-white/20 p-4 rounded-xl">
                  <Clock className="w-8 h-8" />
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-green-50">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Attendance This Month</p>
                    <h3 className="text-2xl font-bold text-gray-800">96%</h3>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-blue-50">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Hours This Week</p>
                    <h3 className="text-2xl font-bold text-gray-800">38.5</h3>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-purple-50">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Upcoming Shifts</p>
                    <h3 className="text-2xl font-bold text-gray-800">3</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Shifts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Shifts</h3>
                <div className="space-y-4">
                  {upcomingShifts.map((shift, idx) => (
                    <div key={idx} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-gray-800">{shift.date}</span>
                        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {shift.shift.split(' ')[0]}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-1">{shift.shift}</p>
                      <p className="text-sm text-gray-600">{shift.location}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Request Leave', icon: Calendar },
                    { label: 'Swap Shift', icon: Clock },
                    { label: 'Mark Attendance', icon: CheckCircle },
                    { label: 'Report Issue', icon: AlertCircle },
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
          {activeTab === 'dashboard' ? 'Employee Dashboard' : activeTab.replace('-', ' ')}
        </h2>
        <p className="text-gray-600 mt-1">
          {activeTab === 'dashboard' 
            ? 'Your work schedule and information'
            : `Manage your ${activeTab.replace('-', ' ')}`}
        </p>
      </div>
      {renderContent()}
    </div>
  );
};

export default EmployeeDashboard;