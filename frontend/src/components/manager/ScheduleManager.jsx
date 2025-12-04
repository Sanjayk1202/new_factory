import React, { useState } from 'react';
import { Calendar, Clock, Users, Plus, Download, Eye, Edit2, Filter } from 'lucide-react';

const ScheduleManager = () => {
  const [schedules, setSchedules] = useState([
    { id: 1, name: 'Week 3 Production', date: 'Jan 15-21', shifts: 18, employees: 45, status: 'active' },
    { id: 2, name: 'Week 2 Quality', date: 'Jan 8-14', shifts: 12, employees: 22, status: 'completed' },
    { id: 3, name: 'January Overtime', date: 'Jan 1-31', shifts: 8, employees: 15, status: 'draft' },
    { id: 4, name: 'Emergency Shift', date: 'Jan 20-22', shifts: 3, employees: 12, status: 'pending' },
  ]);

  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Schedule Management</h3>
          <p className="text-gray-600">Generate and manage team schedules</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-secondary flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button 
            onClick={() => setShowGenerateModal(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Generate Schedule</span>
          </button>
        </div>
      </div>

      {/* Schedule Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {schedules.map((schedule) => (
          <div key={schedule.id} className="card p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-bold text-gray-800">{schedule.name}</h4>
                <p className="text-sm text-gray-600">{schedule.date}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(schedule.status)}`}>
                {schedule.status}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Shifts</span>
                </div>
                <span className="font-medium">{schedule.shifts}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Employees</span>
                </div>
                <span className="font-medium">{schedule.employees}</span>
              </div>
            </div>
            
            <div className="flex space-x-2 mt-6">
              <button className="flex-1 btn-secondary text-sm py-2">
                <Eye className="w-3 h-3 inline mr-1" />
                View
              </button>
              <button className="flex-1 btn-secondary text-sm py-2">
                <Edit2 className="w-3 h-3 inline mr-1" />
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Schedule Table */}
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <h4 className="font-semibold text-gray-800">Upcoming Shifts</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shift</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Team</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Required</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { date: 'Jan 15', shift: 'Morning (08:00-16:00)', team: 'Production Line A', assigned: 15, required: 15, status: 'Filled' },
                { date: 'Jan 15', shift: 'Afternoon (16:00-00:00)', team: 'Quality Check', assigned: 8, required: 8, status: 'Filled' },
                { date: 'Jan 15', shift: 'Night (00:00-08:00)', team: 'Maintenance', assigned: 4, required: 5, status: 'Short' },
                { date: 'Jan 16', shift: 'Morning (08:00-16:00)', team: 'Production Line B', assigned: 14, required: 15, status: 'Short' },
                { date: 'Jan 16', shift: 'Afternoon (16:00-00:00)', team: 'Logistics', assigned: 6, required: 6, status: 'Filled' },
              ].map((shift, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{shift.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{shift.shift}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{shift.team}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{shift.assigned}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{shift.required}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      shift.status === 'Filled' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {shift.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generate Schedule Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Generate New Schedule</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Period</label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="input-field"
                >
                  <option value="week">Next Week</option>
                  <option value="month">Next Month</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Team/Department</label>
                <select className="input-field">
                  <option value="all">All Departments</option>
                  <option value="production">Production Only</option>
                  <option value="quality">Quality Only</option>
                  <option value="maintenance">Maintenance Only</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <input type="checkbox" className="rounded mr-2" />
                  Include Overtime Shifts
                </label>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowGenerateModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button className="flex-1 btn-primary">
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleManager;