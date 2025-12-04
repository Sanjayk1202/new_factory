import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User, Mail, Building2, Clock, Shield } from 'lucide-react';

const ProfileModal = ({ onClose }) => {
  const { user, role } = useAuth();

  return (
    <div className="p-4">
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User'}
          alt="Profile"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h3 className="font-bold text-gray-800">{user?.name}</h3>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <Shield className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-sm text-gray-600">Role</p>
            <p className="font-medium capitalize">{role}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Building2 className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-sm text-gray-600">Department</p>
            <p className="font-medium">Production</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Clock className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-sm text-gray-600">Shift</p>
            <p className="font-medium">Morning (08:00 - 16:00)</p>
          </div>
        </div>
      </div>

      <button
        onClick={onClose}
        className="w-full mt-4 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
      >
        View Full Profile
      </button>
    </div>
  );
};

export default ProfileModal;