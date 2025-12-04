import React, { useState } from 'react';
import { Calendar, Clock, Users, Filter, Building2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { DEPARTMENTS } from '../../utils/constants';

const DivisionSchedule = () => {
  const { division } = useAuth();
  const departments = DEPARTMENTS[division] || [];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Division Schedule</h3>
          <p className="text-gray-600">Manage schedules across all departments in your division</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-secondary flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Generate Division Schedule</span>
          </button>
        </div>
      </div>

      {/* Department Schedule Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div key={dept.id} className="card p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-bold text-gray-800">{dept.name}</h4>
                <p className="text-sm text-gray-600">{dept.manager}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <Building2 className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Shifts Today</span>
                </div>
                <span className="font-bold">3</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Employees Scheduled</span>
                </div>
                <span className="font-bold">45</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Coverage Rate</span>
                <span className="font-bold text-green-600">96%</span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100">
              <button className="w-full btn-secondary text-sm">
                View Department Schedule
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DivisionSchedule;