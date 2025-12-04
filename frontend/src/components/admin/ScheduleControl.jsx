import React, { useState } from 'react';
import { Calendar, Clock, Users, Filter, Download, Printer, Settings, Eye } from 'lucide-react';

const ScheduleControl = () => {
  const [schedule, setSchedule] = useState([
    { id: 1, date: '2024-01-15', shift: 'Morning', department: 'Production', employees: 45, status: 'scheduled' },
    { id: 2, date: '2024-01-15', shift: 'Afternoon', department: 'Quality', employees: 22, status: 'completed' },
    { id: 3, date: '2024-01-15', shift: 'Night', department: 'Maintenance', employees: 18, status: 'in-progress' },
    { id: 4, date: '2024-01-16', shift: 'Morning', department: 'Production', employees: 48, status: 'scheduled' },
    { id: 5, date: '2024-01-16', shift: 'Afternoon', department: 'Logistics', employees: 15, status: 'pending' },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Schedule Control</h3>
          <p className="text-gray-600">Manual schedule management and control</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-secondary flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="btn-secondary flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Create Schedule</span>
          </button>
        </div>
      </div>

      {/* Schedule Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card p-6">
            <h4 className="font-semibold text-gray-800 mb-4">Weekly Schedule</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Date</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Shift</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Department</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Employees</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Status</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 text-sm text-gray-900">{item.date}</td>
                      <td className="py-3">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{item.shift}</span>
                        </div>
                      </td>
                      <td className="py-3 text-sm text-gray-900">{item.department}</td>
                      <td className="py-3">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{item.employees}</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex space-x-2">
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Settings className="w-4 h-4 text-blue-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="card p-6">
            <h4 className="font-semibold text-gray-800 mb-4">Quick Actions</h4>
            <div className="space-y-3">
              {[
                { label: 'Generate Auto Schedule', icon: Calendar },
                { label: 'Assign Shift Swap', icon: Users },
                { label: 'Send Schedule Alert', icon: Printer },
                { label: 'Update Shift Timings', icon: Clock },
              ].map((action, idx) => (
                <button
                  key={idx}
                  className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <span className="font-medium text-gray-700">{action.label}</span>
                  <action.icon className="w-4 h-4 text-gray-500" />
                </button>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <div className="card p-6">
            <h4 className="font-semibold text-gray-800 mb-4">Schedule Stats</h4>
            <div className="space-y-4">
              {[
                { label: 'Total Shifts This Week', value: '48' },
                { label: 'Employees Scheduled', value: '320' },
                { label: 'Coverage Rate', value: '96%' },
                { label: 'Pending Approvals', value: '3' },
              ].map((stat, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{stat.label}</span>
                  <span className="font-bold text-gray-800">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleControl;