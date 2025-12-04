import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, TrendingUp, Download } from 'lucide-react';

const Attendance = () => {
  const [month, setMonth] = useState('January 2024');
  
  const attendanceData = [
    { date: '2024-01-01', day: 'Mon', checkIn: '08:00', checkOut: '16:00', hours: '8.0', status: 'Present', overtime: '0' },
    { date: '2024-01-02', day: 'Tue', checkIn: '08:02', checkOut: '16:05', hours: '8.05', status: 'Present', overtime: '0.05' },
    { date: '2024-01-03', day: 'Wed', checkIn: '08:15', checkOut: '16:10', hours: '7.92', status: 'Late', overtime: '0' },
    { date: '2024-01-04', day: 'Thu', checkIn: '08:00', checkOut: '16:00', hours: '8.0', status: 'Present', overtime: '0' },
    { date: '2024-01-05', day: 'Fri', checkIn: '07:55', checkOut: '16:30', hours: '8.58', status: 'Present', overtime: '0.58' },
    { date: '2024-01-06', day: 'Sat', checkIn: '—', checkOut: '—', hours: '0', status: 'Weekend', overtime: '0' },
    { date: '2024-01-07', day: 'Sun', checkIn: '—', checkOut: '—', hours: '0', status: 'Weekend', overtime: '0' },
    { date: '2024-01-08', day: 'Mon', checkIn: '08:00', checkOut: '16:00', hours: '8.0', status: 'Present', overtime: '0' },
    { date: '2024-01-09', day: 'Tue', checkIn: '08:00', checkOut: '17:00', hours: '9.0', status: 'Present', overtime: '1.0' },
    { date: '2024-01-10', day: 'Wed', checkIn: '—', checkOut: '—', hours: '0', status: 'Sick Leave', overtime: '0' },
    { date: '2024-01-11', day: 'Thu', checkIn: '08:10', checkOut: '16:05', hours: '7.92', status: 'Late', overtime: '0' },
    { date: '2024-01-12', day: 'Fri', checkIn: '08:00', checkOut: '16:00', hours: '8.0', status: 'Present', overtime: '0' },
  ];

  const stats = {
    present: attendanceData.filter(d => d.status === 'Present').length,
    late: attendanceData.filter(d => d.status === 'Late').length,
    absent: attendanceData.filter(d => d.status === 'Sick Leave').length,
    totalHours: attendanceData.reduce((sum, day) => sum + parseFloat(day.hours), 0),
    overtime: attendanceData.reduce((sum, day) => sum + parseFloat(day.overtime), 0),
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Present': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Late': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'Sick Leave': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'Weekend': return <Calendar className="w-4 h-4 text-gray-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present': return 'bg-green-100 text-green-800';
      case 'Late': return 'bg-yellow-100 text-yellow-800';
      case 'Sick Leave': return 'bg-red-100 text-red-800';
      case 'Weekend': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">My Attendance</h3>
          <p className="text-gray-600">Track your attendance and working hours</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="input-field"
          >
            <option value="January 2024">January 2024</option>
            <option value="December 2023">December 2023</option>
            <option value="November 2023">November 2023</option>
          </select>
          <button className="btn-secondary flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Present Days</p>
              <p className="text-2xl font-bold text-gray-800">{stats.present}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Late Arrivals</p>
              <p className="text-2xl font-bold text-gray-800">{stats.late}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Hours</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalHours.toFixed(1)}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-orange-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Overtime</p>
              <p className="text-2xl font-bold text-gray-800">{stats.overtime.toFixed(1)}h</p>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Day</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check-in</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check-out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Overtime</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {attendanceData.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{record.date}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{record.day}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3 h-3 text-gray-500" />
                      <span className="text-sm text-gray-900">{record.checkIn}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3 h-3 text-gray-500" />
                      <span className="text-sm text-gray-900">{record.checkOut}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{record.hours}h</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {record.overtime > 0 ? `${record.overtime}h` : '—'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(record.status)}
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h4 className="font-semibold text-gray-800 mb-4">Attendance Summary</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Attendance Rate</span>
              <span className="font-bold text-green-600">
                {((stats.present / attendanceData.filter(d => d.status !== 'Weekend').length) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Daily Hours</span>
              <span className="font-bold text-gray-800">
                {(stats.totalHours / stats.present).toFixed(1)}h
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Punctuality Score</span>
              <span className="font-bold text-blue-600">92/100</span>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h4 className="font-semibold text-gray-800 mb-4">Monthly Overview</h4>
          <div className="space-y-3">
            {[
              { label: 'Working Days', value: '22', color: 'green' },
              { label: 'Weekends', value: '8', color: 'gray' },
              { label: 'Leaves Taken', value: '1', color: 'red' },
              { label: 'Overtime Hours', value: `${stats.overtime.toFixed(1)}h`, color: 'orange' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full bg-${item.color}-500`}></div>
                  <span className="text-gray-600">{item.label}</span>
                </div>
                <span className="font-bold text-gray-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;