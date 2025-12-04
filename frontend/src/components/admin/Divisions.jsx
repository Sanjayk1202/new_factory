import React, { useState } from 'react';
import { Building2, Users, Plus, Edit2, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { DEPARTMENTS, DIVISIONS } from '../../utils/constants';
import { useAuth } from '../../contexts/AuthContext';

const Divisions = () => {
  const { getAccessibleDivisions } = useAuth();
  const [expandedDivision, setExpandedDivision] = useState('production');
  const [showAddDivision, setShowAddDivision] = useState(false);
  const [showAddDepartment, setShowAddDepartment] = useState(null);
  
  const accessibleDivisions = getAccessibleDivisions();
  
  const toggleDivision = (divisionId) => {
    setExpandedDivision(expandedDivision === divisionId ? null : divisionId);
  };

  const handleAddDepartment = (divisionId) => {
    setShowAddDepartment(divisionId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Divisions & Departments</h3>
          <p className="text-gray-600">Manage factory divisions and their departments</p>
        </div>
        <button 
          onClick={() => setShowAddDivision(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Division</span>
        </button>
      </div>

      {/* Division Cards */}
      <div className="space-y-4">
        {accessibleDivisions.map((division) => {
          const departments = DEPARTMENTS[division.id] || [];
          const isExpanded = expandedDivision === division.id;
          
          return (
            <div key={division.id} className="card overflow-hidden">
              {/* Division Header */}
              <div 
                className="p-6 border-b border-gray-100 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleDivision(division.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg bg-${division.color}-50`}>
                      <Building2 className={`w-6 h-6 text-${division.color}-600`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{division.name}</h4>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {departments.length} Departments
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          Division ID: {division.id.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Edit2 className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </div>
              </div>

              {/* Departments List (Expanded) */}
              {isExpanded && (
                <div className="p-6 bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <h5 className="font-semibold text-gray-700">Departments in this Division</h5>
                    <button 
                      onClick={() => handleAddDepartment(division.id)}
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Department</span>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {departments.map((dept) => (
                      <div key={dept.id} className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h6 className="font-medium text-gray-800">{dept.name}</h6>
                            <p className="text-sm text-gray-500 mt-1">Dept ID: {dept.id}</p>
                          </div>
                          <div className="flex space-x-1">
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <Edit2 className="w-3 h-3 text-gray-600" />
                            </button>
                            <button className="p-1 hover:bg-red-50 rounded">
                              <Trash2 className="w-3 h-3 text-red-600" />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Manager: {dept.manager}</span>
                        </div>
                        <div className="mt-3 text-xs text-gray-500">
                          {division.name} Division
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Division Modal */}
      {showAddDivision && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Add New Division</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Division Name</label>
                <input
                  type="text"
                  placeholder="Enter division name..."
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Division ID</label>
                <input
                  type="text"
                  placeholder="e.g., production, quality, etc."
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Color Theme</label>
                <select className="input-field">
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="orange">Orange</option>
                  <option value="purple">Purple</option>
                  <option value="red">Red</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowAddDivision(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button className="flex-1 btn-primary">
                  Create Division
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Department Modal */}
      {showAddDepartment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Add Department to {DIVISIONS.find(d => d.id === showAddDepartment)?.name}
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
                <input
                  type="text"
                  placeholder="Enter department name..."
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department ID</label>
                <input
                  type="text"
                  placeholder="e.g., prod_line_a, qc_incoming, etc."
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department Manager</label>
                <select className="input-field">
                  <option value="">Select Manager</option>
                  <option value="john_smith">John Smith</option>
                  <option value="sarah_johnson">Sarah Johnson</option>
                  <option value="mike_wilson">Mike Wilson</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowAddDepartment(null)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button className="flex-1 btn-primary">
                  Add Department
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Divisions;