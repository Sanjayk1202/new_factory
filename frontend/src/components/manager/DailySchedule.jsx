import React, { useState } from 'react';
import { Calendar, Clock, Users, ChevronLeft, ChevronRight, CheckCircle, XCircle } from 'lucide-react';

const DailySchedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const dailySchedule = [
    { id: 1, shift: 'Morning', time: '08:00 - 16:00', team: 'Production Line A', employees: 15, status: 'on-schedule' },
    { id: 2, shift: 'Morning', time: '08:00 - 16:00', team: 'Quality Control', employees: 8, status: 'on-schedule' },
    { id: 3, shift: 'Morning', time: '08:00 - 16:00', team: 'Maintenance', employees: 5, status: 'short-staffed' },
    { id: 4, shift: 'Afternoon', time: '16:00 - 00:00', team: 'Production Line B', employees: 14, status: 'on-schedule' },
    { id: 5, shift: 'Afternoon', time: '16:00 - 00:00', team: 'Logistics', employees: 6, status: 'on-schedule' },
    { id: 6, shift: 'Night', time: '00:00 - 08:00', team: 'Production Line C', employees: 10, status: 'on-schedule' },
  ];

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const changeDate = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-schedule': return 'bg-green-100 text-green-800';
      case 'short-staffed': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'on-schedule': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'short-staffed': return <Users className="w-4 h-4 text-yellow-500" />;
      default: return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Date Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Daily Schedule</h3>
          <p className="text-gray-600">View and manage daily shift assignments</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => changeDate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <span className="font-medium text-gray-800">{formatDate(selectedDate)}</span>
          </div>
          <button
            onClick={() => changeDate(1)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Daily Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Shifts Today</p>
              <p className="text-2xl font-bold text-gray-800">6</p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Employees Scheduled</p>
              <p className="text-2xl font-bold text-gray-800">58</p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Users className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Staffing Gaps</p>
              <p className="text-2xl font-bold text-gray-800">1</p>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule by Shift */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-800">Shift Breakdown</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dailySchedule.map((shift) => (
            <div key={shift.id} className="card p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h5 className="font-bold text-gray-800">{shift.shift} Shift</h5>
                  <p className="text-sm text-gray-600">{shift.time}</p>
                </div>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(shift.status)}
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(shift.status)}`}>
                    {shift.status.replace('-', ' ')}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Team</p>
                  <p className="font-medium">{shift.team}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Employees</span>
                  </div>
                  <span className="font-bold">{shift.employees}</span>
                </div>
              </div>
              
              {shift.status === 'short-staffed' && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <span className="font-medium">Action Needed:</span> 1 more employee required
                  </p>
                  <button className="text-sm text-blue-600 hover:text-blue-800 mt-2">
                    Assign Staff →
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Employee List */}
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <h4 className="font-semibold text-gray-800">Employee Assignments</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shift</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Team</th>
                <th className="px6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { name: 'John Doe', shift: 'Morning', team: 'Production Line A', role: 'Operator', status: 'Confirmed' },
                { name: 'Jane Smith', shift: 'Morning', team: 'Quality Control', role: 'Supervisor', status: 'Confirmed' },
                { name: 'Robert Chen', shift: 'Morning', team: 'Maintenance', role: 'Technician', status: 'Pending' },
                { name: 'Sarah Johnson', shift: 'Afternoon', team: 'Production Line B', role: 'Operator', status: 'Confirmed' },
                { name: 'Mike Wilson', shift: 'Afternoon', team: 'Logistics', role: 'Coordinator', status: 'Confirmed' },
              ].map((employee, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${employee.name}`}
                        alt=""
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {employee.shift}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{employee.team}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{employee.role}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      employee.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {employee.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DailySchedule;