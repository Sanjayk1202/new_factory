import React, { useState } from 'react';
import { Search, Filter, Download, Printer, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const AttendanceApp = () => {
  const [dateRange, setDateRange] = useState('today');
  
  const attendanceRecords = [
    { id: 1, name: 'John Doe', employeeId: 'EMP001', date: '2024-01-15', checkIn: '08:02', checkOut: '16:05', shift: 'Morning', status: 'Present', overtime: '0.5h' },
    { id: 2, name: 'Jane Smith', employeeId: 'EMP002', date: '2024-01-15', checkIn: '16:15', checkOut: '00:10', shift: 'Afternoon', status: 'Late', overtime: '0h' },
    { id: 3, name: 'Robert Chen', employeeId: 'EMP003', date: '2024-01-15', checkIn: '00:05', checkOut: '08:00', shift: 'Night', status: 'Present', overtime: '0h' },
    { id: 4, name: 'Sarah Johnson', employeeId: 'EMP004', date: '2024-01-15', checkIn: '08:00', checkOut: '16:00', shift: 'Morning', status: 'Present', overtime: '0h' },
    { id: 5, name: 'Mike Wilson', employeeId: 'EMP005', date: '2024-01-15', checkIn: '—', checkOut: '—', shift: 'Afternoon', status: 'Absent', overtime: '0h' },
    { id: 6, name: 'Lisa Brown', employeeId: 'EMP006', date: '2024-01-15', checkIn: '08:30', checkOut: '16:45', shift: 'Morning', status: 'Late', overtime: '0.75h' },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Present': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Late': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'Absent': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Attendance Management</h3>
          <p className="text-gray-600">Track and manage employee attendance</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="input-field"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <button className="btn-secondary flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Printer className="w-4 h-4" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Present Today</p>
              <p className="text-xl font-bold text-gray-800">142</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-50 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Absent Today</p>
              <p className="text-xl font-bold text-gray-800">8</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Late Arrivals</p>
              <p className="text-xl font-bold text-gray-800">12</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Overtime Hours</p>
              <p className="text-xl font-bold text-gray-800">24.5h</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or employee ID..."
                className="input-field pl-10"
              />
            </div>
          </div>
          <div>
            <select className="input-field">
              <option value="">All Departments</option>
              <option value="production">Production</option>
              <option value="quality">Quality</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          <div>
            <select className="input-field">
              <option value="">All Status</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="late">Late</option>
            </select>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shift</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check-in</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check-out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Overtime</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {attendanceRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${record.name}`}
                        alt=""
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{record.name}</div>
                        <div className="text-xs text-gray-500">{record.employeeId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{record.date}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {record.shift}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{record.checkIn}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{record.checkOut}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{record.overtime}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(record.status)}
                      <span className={`text-sm ${
                        record.status === 'Present' ? 'text-green-700' :
                        record.status === 'Late' ? 'text-yellow-700' : 'text-red-700'
                      }`}>
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
    </div>
  );
};

export default AttendanceApp;