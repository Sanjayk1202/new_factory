import React, { useState } from 'react';
import { Users, TrendingUp, Plus, Edit2, Trash2 } from 'lucide-react';

const Departments = () => {
  const [departments, setDepartments] = useState([
    { id: 1, name: 'Production', employees: 120, shifts: 3, efficiency: '92%', manager: 'John Doe' },
    { id: 2, name: 'Quality Control', employees: 45, shifts: 2, efficiency: '95%', manager: 'Jane Smith' },
    { id: 3, name: 'Maintenance', employees: 35, shifts: 2, efficiency: '88%', manager: 'Robert Chen' },
    { id: 4, name: 'Logistics', employees: 28, shifts: 2, efficiency: '90%', manager: 'Sarah Johnson' },
    { id: 5, name: 'Administration', employees: 20, shifts: 1, efficiency: '98%', manager: 'Mike Wilson' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Departments</h3>
          <p className="text-gray-600">Manage factory departments and teams</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Department</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Department Cards */}
        {departments.map((dept) => (
          <div key={dept.id} className="card p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-xl font-bold text-gray-800">{dept.name}</h4>
                <p className="text-gray-600 text-sm">Department</p>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Edit2 className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Employees</span>
                </div>
                <span className="font-medium">{dept.employees}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Efficiency</span>
                </div>
                <span className={`font-medium ${
                  parseInt(dept.efficiency) > 90 ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {dept.efficiency}
                </span>
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600">Department Manager</p>
                <div className="flex items-center space-x-3 mt-2">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${dept.manager}`}
                    alt="Manager"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-medium">{dept.manager}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Departments;