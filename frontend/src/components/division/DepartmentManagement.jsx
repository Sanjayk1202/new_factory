import React, { useState } from 'react';
import { Users, Building2, Plus, Edit2, Trash2, Mail, Phone } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { DEPARTMENTS } from '../../utils/constants';

const DepartmentManagement = () => {
  const { division, getUserScope } = useAuth();
  const scope = getUserScope();
  const departments = DEPARTMENTS[division] || [];
  
  const [departmentManagers, setDepartmentManagers] = useState([
    { id: 1, name: 'John Smith', email: 'john.smith@factory.com', phone: '+1 (555) 123-4567', department: 'prod_line_a', employees: 45 },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.j@factory.com', phone: '+1 (555) 987-6543', department: 'prod_line_b', employees: 42 },
    { id: 3, name: 'Mike Wilson', email: 'mike.w@factory.com', phone: '+1 (555) 456-7890', department: 'prod_line_c', employees: 38 },
  ]);

  const [showAddManager, setShowAddManager] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const getDepartmentName = (deptId) => {
    const dept = departments.find(d => d.id === deptId);
    return dept ? dept.name : deptId;
  };

  const handleAssignManager = (deptId) => {
    setSelectedDepartment(deptId);
    setShowAddManager(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Department Management</h3>
          <p className="text-gray-600">Manage departments and department managers in your division</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Department</span>
        </button>
      </div>

      {/* Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => {
          const manager = departmentManagers.find(m => m.department === dept.id);
          
          return (
            <div key={dept.id} className="card p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-gray-800">{dept.name}</h4>
                  <p className="text-gray-600 text-sm">Department</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleAssignManager(dept.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <Edit2 className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Manager Info */}
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">Department Manager</span>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Assigned
                    </span>
                  </div>
                  {manager ? (
                    <div>
                      <p className="font-medium text-gray-800">{manager.name}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Mail className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-600">{manager.email}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">No manager assigned</p>
                  )}
                </div>
                
                {/* Department Stats */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Employees</span>
                    <span className="font-medium">{manager?.employees || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Shift Coverage</span>
                    <span className="font-medium text-green-600">92%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Active Today</span>
                    <span className="font-medium">{manager ? Math.floor(manager.employees * 0.92) : 0}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-100">
                <button className="w-full btn-secondary text-sm">
                  View Department Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Department Managers Table */}
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <h4 className="font-semibold text-gray-800">Department Managers</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Manager</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employees</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {departmentManagers.map((manager) => (
                <tr key={manager.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${manager.name}`}
                        alt=""
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{manager.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{getDepartmentName(manager.department)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1">
                        <Mail className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-600">{manager.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-600">{manager.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{manager.employees}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-sm text-blue-600 hover:text-blue-800">
                        Contact
                      </button>
                      <button className="text-sm text-red-600 hover:text-red-800">
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Manager Modal */}
      {showAddManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              {selectedDepartment ? 'Assign Department Manager' : 'Add New Manager'}
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Manager</label>
                <select className="input-field">
                  <option value="">Select Employee</option>
                  <option value="john_doe">John Doe - Senior Operator</option>
                  <option value="jane_smith">Jane Smith - Supervisor</option>
                  <option value="robert_chen">Robert Chen - Lead Technician</option>
                </select>
              </div>
              {selectedDepartment && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium">{getDepartmentName(selectedDepartment)}</p>
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input type="date" className="input-field" />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => {
                    setShowAddManager(false);
                    setSelectedDepartment(null);
                  }}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button className="flex-1 btn-primary">
                  Assign Manager
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentManagement;