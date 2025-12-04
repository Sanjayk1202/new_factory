import React, { useState } from 'react';
import { Search, Filter, UserPlus, Edit2, Trash2, Download, Eye, Building2 } from 'lucide-react';
import { DEPARTMENTS, DIVISIONS } from '../../utils/constants';
import { useAuth } from '../../contexts/AuthContext';

const EmployeeDatabase = () => {
  const { getAccessibleDivisions, getAccessibleDepartments } = useAuth();
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', employeeId: 'EMP001', division: 'production', department: 'prod_line_a', role: 'Operator', status: 'active', shifts: 'Morning', hours: '40' },
    { id: 2, name: 'Jane Smith', employeeId: 'EMP002', division: 'quality', department: 'qc_incoming', role: 'QC Inspector', status: 'active', shifts: 'Afternoon', hours: '40' },
    { id: 3, name: 'Robert Chen', employeeId: 'EMP003', division: 'maintenance', department: 'mechanical', role: 'Technician', status: 'active', shifts: 'Night', hours: '40' },
    { id: 4, name: 'Sarah Johnson', employeeId: 'EMP004', division: 'production', department: 'prod_line_b', role: 'Supervisor', status: 'active', shifts: 'Morning', hours: '45' },
    { id: 5, name: 'Mike Wilson', employeeId: 'EMP005', division: 'logistics', department: 'warehouse', role: 'Warehouse Staff', status: 'inactive', shifts: 'Afternoon', hours: '0' },
  ]);

  const [search, setSearch] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const accessibleDivisions = getAccessibleDivisions();
  const accessibleDepartments = getAccessibleDepartments();

  // Get departments for selected division
  const getFilteredDepartments = () => {
    if (selectedDivision === 'all') return accessibleDepartments;
    return DEPARTMENTS[selectedDivision] || [];
  };

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase()) ||
                         emp.employeeId.toLowerCase().includes(search.toLowerCase());
    const matchesDivision = selectedDivision === 'all' || emp.division === selectedDivision;
    const matchesDepartment = selectedDepartment === 'all' || emp.department === selectedDepartment;
    return matchesSearch && matchesDivision && matchesDepartment;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'on-leave': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDivisionInfo = (divisionId) => {
    return DIVISIONS.find(d => d.id === divisionId);
  };

  const getDepartmentInfo = (divisionId, departmentId) => {
    const departments = DEPARTMENTS[divisionId] || [];
    return departments.find(d => d.id === departmentId);
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Employee Database</h3>
          <p className="text-gray-600">Manage employees across divisions and departments</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-secondary flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <UserPlus className="w-4 h-4" />
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Division</label>
            <select
              value={selectedDivision}
              onChange={(e) => {
                setSelectedDivision(e.target.value);
                setSelectedDepartment('all'); // Reset department when division changes
              }}
              className="input-field"
            >
              <option value="all">All Divisions</option>
              {accessibleDivisions.map(division => (
                <option key={division.id} value={division.id}>
                  {division.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="input-field"
              disabled={selectedDivision === 'all'}
            >
              <option value="all">
                {selectedDivision === 'all' ? 'Select Division First' : 'All Departments'}
              </option>
              {getFilteredDepartments().map(dept => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select className="input-field">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="on-leave">On Leave</option>
            </select>
          </div>
        </div>
      </div>

      {/* Employees Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Division</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shifts</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee) => {
                const divisionInfo = getDivisionInfo(employee.division);
                const departmentInfo = getDepartmentInfo(employee.division, employee.department);
                
                return (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${employee.name}`}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                          <div className="text-sm text-gray-500">{employee.employeeId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {divisionInfo && (
                          <div className={`w-3 h-3 rounded-full bg-${divisionInfo.color}-500`}></div>
                        )}
                        <div className="text-sm text-gray-900">
                          {divisionInfo?.name || employee.division}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {departmentInfo?.name || employee.department}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{employee.role}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(employee.status)}`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{employee.shifts}</td>
                    <td className="px-6 py-4 text-sm font-medium space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4 inline" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit2 className="w-4 h-4 inline" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4 inline" />
                      </button>
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

export default EmployeeDatabase;