import React, { useState } from 'react';
import { FileText, Download, Printer, TrendingUp, TrendingDown, Calendar, Filter } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { DEPARTMENTS } from '../../utils/constants';

const DivisionReports = () => {
  const { division } = useAuth();
  const departments = DEPARTMENTS[division] || [];
  const [reportType, setReportType] = useState('attendance');
  const [dateRange, setDateRange] = useState('month');

  const reports = [
    { id: 1, name: 'Monthly Attendance Report', type: 'attendance', generated: 'Jan 15, 2024', size: '2.4 MB', status: 'ready' },
    { id: 2, name: 'Weekly Shift Coverage', type: 'schedule', generated: 'Jan 14, 2024', size: '1.8 MB', status: 'ready' },
    { id: 3, name: 'Overtime Analysis', type: 'overtime', generated: 'Jan 10, 2024', size: '3.2 MB', status: 'ready' },
    { id: 4, name: 'Department Performance', type: 'performance', generated: 'Jan 5, 2024', size: '4.1 MB', status: 'ready' },
    { id: 5, name: 'Annual Leave Summary', type: 'leave', generated: 'Dec 30, 2023', size: '1.5 MB', status: 'archived' },
  ];

  const departmentStats = departments.map(dept => ({
    ...dept,
    attendance: 90 + Math.random() * 10,
    productivity: 85 + Math.random() * 15,
    overtime: Math.random() * 20,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Division Reports</h3>
          <p className="text-gray-600">Generate and view reports for your division</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-secondary flex items-center space-x-2">
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Report Type Filter */}
      <div className="card p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="input-field"
            >
              <option value="attendance">Attendance Reports</option>
              <option value="schedule">Schedule Reports</option>
              <option value="performance">Performance Reports</option>
              <option value="overtime">Overtime Reports</option>
              <option value="leave">Leave Reports</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="input-field"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select className="input-field">
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Department Performance */}
      <div className="card p-6">
        <h4 className="font-semibold text-gray-800 mb-4">Department Performance Summary</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Manager</th>
                <th className="px6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance %</th>
                <th className="px6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Productivity</th>
                <th className="px6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Overtime Hours</th>
                <th className="px6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {departmentStats.map((dept, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{dept.name}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{dept.manager}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${dept.attendance}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{dept.attendance.toFixed(1)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${dept.productivity}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{dept.productivity.toFixed(1)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{dept.overtime.toFixed(1)}h</td>
                  <td className="px-6 py-4">
                    {dept.attendance > 92 ? (
                      <div className="flex items-center text-green-600">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm">Good</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-yellow-600">
                        <TrendingDown className="w-4 h-4" />
                        <span className="text-sm">Needs Attention</span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generated Reports */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-800">Generated Reports</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((report) => (
            <div key={report.id} className="card p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h5 className="font-bold text-gray-800">{report.name}</h5>
                  <p className="text-sm text-gray-600">Generated: {report.generated}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  report.status === 'ready' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {report.status}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Type: {report.type}</span>
                </div>
                <span>Size: {report.size}</span>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center space-x-1">
                  <Download className="w-3 h-3" />
                  <span>Download</span>
                </button>
                <button className="flex-1 btn-secondary text-sm py-2">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DivisionReports;