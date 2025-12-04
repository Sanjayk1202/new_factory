import React, { useState } from 'react';
import { TrendingUp, TrendingDown, CheckCircle, XCircle, Clock, Filter, Building2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { DEPARTMENTS } from '../../utils/constants';

const DivisionAttendance = () => {
  const { division } = useAuth();
  const departments = DEPARTMENTS[division] || [];
  const [timeRange, setTimeRange] = useState('today');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const attendanceData = {
    production: { present: 120, absent: 5, late: 8, onLeave: 3 },
    quality: { present: 45, absent: 2, late: 3, onLeave: 1 },
    maintenance: { present: 35, absent: 1, late: 2, onLeave: 2 },
    logistics: { present: 28, absent: 0, late: 1, onLeave: 1 },
  };

  const divisionAttendance = attendanceData[division] || { present: 0, absent: 0, late: 0, onLeave: 0 };
  const total = divisionAttendance.present + divisionAttendance.absent + divisionAttendance.late + divisionAttendance.onLeave;
  const attendanceRate = total > 0 ? ((divisionAttendance.present / total) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Division Attendance</h3>
          <p className="text-gray-600">Monitor attendance across all departments in your division</p>
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
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="input-field"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept.id} value={dept.id}>{dept.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Division Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Present</p>
              <p className="text-2xl font-bold text-gray-800">{divisionAttendance.present}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Departments</p>
              <p className="text-2xl font-bold text-gray-800">{departments.length}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Late Arrivals</p>
              <p className="text-2xl font-bold text-gray-800">{divisionAttendance.late}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Attendance Rate</p>
              <p className="text-2xl font-bold text-gray-800">{attendanceRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Department Breakdown */}
      <div className="card p-6">
        <h4 className="font-semibold text-gray-800 mb-4">Department Performance</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Manager</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Employees</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Present Today</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Absent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Late</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {departments.map((dept, idx) => {
                const deptAttendance = {
                  present: Math.floor(45 * (0.9 + Math.random() * 0.1)),
                  absent: Math.floor(Math.random() * 3),
                  late: Math.floor(Math.random() * 4),
                };
                const deptTotal = deptAttendance.present + deptAttendance.absent + deptAttendance.late;
                const deptRate = deptTotal > 0 ? ((deptAttendance.present / deptTotal) * 100).toFixed(1) : 0;
                
                return (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{dept.name}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{dept.manager}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">45</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{deptAttendance.present}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{deptAttendance.absent}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{deptAttendance.late}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${deptRate}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{deptRate}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DivisionAttendance;