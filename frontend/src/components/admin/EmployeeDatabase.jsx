import React, { useState, useEffect } from 'react';
import { Search, Filter, UserPlus, Edit2, Trash2, Download, Eye, Building2 } from 'lucide-react';
import { employeeAPI, divisionAPI, departmentAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const EmployeeDatabase = () => {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (selectedDivision !== 'all') {
      loadDepartments(selectedDivision);
    } else {
      setDepartments([]);
    }
  }, [selectedDivision]);

  const loadData = async () => {
    try {
      const [employeesData, divisionsData] = await Promise.all([
        employeeAPI.getAll(),
        divisionAPI.getAll()
      ]);
      setEmployees(employeesData);
      setDivisions(divisionsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadDepartments = async (divisionId) => {
    try {
      const departmentsData = await departmentAPI.getAll(divisionId);
      setDepartments(departmentsData);
    } catch (error) {
      console.error('Failed to load departments:', error);
    }
  };

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = 
      emp.user?.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      emp.employee_code?.toLowerCase().includes(search.toLowerCase()) ||
      emp.user?.email?.toLowerCase().includes(search.toLowerCase());
    
    const matchesDivision = selectedDivision === 'all' || emp.division_id == selectedDivision;
    const matchesDepartment = selectedDepartment === 'all' || emp.department_id == selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || 
      (selectedStatus === 'active' && emp.is_active) ||
      (selectedStatus === 'inactive' && !emp.is_active);
    
    return matchesSearch && matchesDivision && matchesDepartment && matchesStatus;
  });

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to deactivate this employee?')) return;
    
    try {
      await employeeAPI.delete(id);
      setEmployees(employees.filter(emp => emp.id !== id));
    } catch (error) {
      alert('Failed to delete employee: ' + error.message);
    }
  };

  const handleAddEmployee = async (employeeData) => {
    try {
      const newEmployee = await employeeAPI.create(employeeData);
      setEmployees([...employees, newEmployee]);
      setShowAddModal(false);
    } catch (error) {
      alert('Failed to add employee: ' + error.message);
    }
  };

  const handleEditEmployee = async (id, employeeData) => {
    try {
      const updatedEmployee = await employeeAPI.update(id, employeeData);
      setEmployees(employees.map(emp => emp.id === id ? updatedEmployee : emp));
      setShowEditModal(false);
    } catch (error) {
      alert('Failed to update employee: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

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
          <button 
            onClick={() => setShowAddModal(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
                setSelectedDepartment('all');
              }}
              className="input-field"
            >
              <option value="all">All Divisions</option>
              {divisions.map(division => (
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
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="input-field"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="btn-secondary w-full flex items-center justify-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Division</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={employee.user?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${employee.user?.full_name}`}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{employee.user?.full_name}</div>
                        <div className="text-sm text-gray-500">{employee.user?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{employee.employee_code}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{employee.division?.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{employee.department?.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{employee.position}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      employee.is_active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {employee.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium space-x-2">
                    <button 
                      onClick={() => {
                        setSelectedEmployee(employee);
                        setShowEditModal(true);
                      }}
                      className="text-green-600 hover:text-green-900"
                    >
                      <Edit2 className="w-4 h-4 inline" />
                    </button>
                    <button 
                      onClick={() => handleDelete(employee.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <AddEmployeeModal
          divisions={divisions}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddEmployee}
        />
      )}

      {/* Edit Employee Modal */}
      {showEditModal && selectedEmployee && (
        <EditEmployeeModal
          employee={selectedEmployee}
          divisions={divisions}
          departments={departments}
          onClose={() => setShowEditModal(false)}
          onSubmit={(data) => handleEditEmployee(selectedEmployee.id, data)}
        />
      )}
    </div>
  );
};

const AddEmployeeModal = ({ divisions, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    full_name: '',
    password: '',
    role: 'employee',
    division_id: '',
    department_id: '',
    employee_code: '',
    position: '',
    hire_date: new Date().toISOString().split('T')[0],
    shift_type: 'morning'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Add New Employee</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={formData.full_name}
              onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              required
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="input-field"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Division</label>
              <select
                required
                value={formData.division_id}
                onChange={(e) => setFormData({...formData, division_id: e.target.value})}
                className="input-field"
              >
                <option value="">Select Division</option>
                {divisions.map(division => (
                  <option key={division.id} value={division.id}>{division.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <input
                type="text"
                required
                value={formData.position}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
                className="input-field"
                placeholder="e.g., Production Operator"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Employee Code</label>
              <input
                type="text"
                required
                value={formData.employee_code}
                onChange={(e) => setFormData({...formData, employee_code: e.target.value})}
                className="input-field"
                placeholder="e.g., EMP001"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Shift Type</label>
              <select
                value={formData.shift_type}
                onChange={(e) => setFormData({...formData, shift_type: e.target.value})}
                className="input-field"
              >
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="night">Night</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 btn-primary"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EditEmployeeModal = ({ employee, divisions, departments, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    position: employee.position,
    phone: employee.phone || '',
    address: employee.address || '',
    shift_type: employee.shift_type,
    is_active: employee.is_active
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Edit Employee</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
            <input
              type="text"
              required
              value={formData.position}
              onChange={(e) => setFormData({...formData, position: e.target.value})}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="input-field"
              rows="3"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Shift Type</label>
              <select
                value={formData.shift_type}
                onChange={(e) => setFormData({...formData, shift_type: e.target.value})}
                className="input-field"
              >
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="night">Night</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.is_active}
                onChange={(e) => setFormData({...formData, is_active: e.target.value === 'true'})}
                className="input-field"
              >
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 btn-primary"
            >
              Update Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeDatabase;