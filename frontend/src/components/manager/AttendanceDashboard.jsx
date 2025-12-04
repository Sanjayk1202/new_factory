import React, { useState } from 'react';
import { TrendingUp, TrendingDown, CheckCircle, XCircle, Clock, Filter } from 'lucide-react';

const AttendanceDashboard = () => {
  const [timeRange, setTimeRange] = useState('today');
  
  const attendanceData = {
    today: { present: 42, absent: 3, late: 2, onLeave: 2 },
    week: { present: 210, absent: 15, late: 10, onLeave: 8 },
    month: { present: 850, absent: 45, late: 30, onLeave: 25 }
  };

  const data = attendanceData[timeRange];
  const total = data.present + data.absent + data.late + data.onLeave;
  const attendanceRate = ((data.present / total) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Attendance Dashboard</h3>
          <p className="text-gray-600">Monitor team attendance in real-time</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input-field"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <button className="btn-secondary flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-green-50">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+2%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{data.present}</h3>
          <p className="text-sm text-gray-600">Present</p>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-red-50">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-sm font-medium text-red-600">-1</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{data.absent}</h3>
          <p className="text-sm text-gray-600">Absent</p>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-yellow-50">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-sm font-medium text-yellow-600">+2</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{data.late}</h3>
          <p className="text-sm text-gray-600">Late Arrivals</p>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-blue-50">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-600">{attendanceRate}%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{attendanceRate}%</h3>
          <p className="text-sm text-gray-600">Attendance Rate</p>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <h4 className="font-semibold text-gray-800">Recent Attendance Records</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shift</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check-in</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check-out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { name: 'John Doe', date: '2024-01-15', shift: 'Morning', checkIn: '08:02', checkOut: '16:05', status: 'Present' },
                { name: 'Jane Smith', date: '2024-01-15', shift: 'Afternoon', checkIn: '16:15', checkOut: '00:10', status: 'Late' },
                { name: 'Robert Chen', date: '2024-01-15', shift: 'Night', checkIn: '00:05', checkOut: '08:00', status: 'Present' },
                { name: 'Sarah Johnson', date: '2024-01-14', shift: 'Morning', checkIn: '08:00', checkOut: '16:00', status: 'Present' },
                { name: 'Mike Wilson', date: '2024-01-14', shift: 'Afternoon', checkIn: '—', checkOut: '—', status: 'Absent' },
              ].map((record, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${record.name}`}
                        alt=""
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{record.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{record.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{record.shift}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{record.checkIn}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{record.checkOut}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      record.status === 'Present' ? 'bg-green-100 text-green-800' :
                      record.status === 'Late' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {record.status}
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

export default AttendanceDashboard;