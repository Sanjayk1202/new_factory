import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Clock, Building2, Award, Edit2, Save } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@factory.com',
    phone: '+1 (555) 123-4567',
    address: '123 Factory Street, Industrial City',
    department: 'Production',
    position: 'Senior Operator',
    employeeId: 'EMP001',
    hireDate: '2022-03-15',
    shift: 'Morning (08:00 - 16:00)',
    skills: ['Machine Operation', 'Safety Procedures', 'Quality Control', 'Team Leadership'],
  });

  const [editedProfile, setEditedProfile] = useState({ ...profile });

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">My Profile</h3>
          <p className="text-gray-600">View and update your personal information</p>
        </div>
        <div>
          {isEditing ? (
            <div className="flex space-x-2">
              <button
                onClick={handleCancel}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="btn-primary flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Edit2 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>
      </div>

      {/* Profile Card */}
      <div className="card p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Picture and Basic Info */}
          <div className="md:w-1/3">
            <div className="mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto md:mx-0">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left mt-4">
                <h3 className="text-xl font-bold text-gray-800">{profile.name}</h3>
                <p className="text-gray-600">{profile.position}</p>
                <p className="text-sm text-gray-500 mt-1">Employee ID: {profile.employeeId}</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Years of Service</p>
                    <p className="font-medium">1.8 years</p>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Performance Rating</p>
                    <p className="font-medium">4.8/5.0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="md:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800 flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Personal Information</span>
                </h4>
                {isEditing ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={editedProfile.name}
                        onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={editedProfile.phone}
                        onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                        className="input-field"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium">{profile.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium">{profile.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Address</p>
                        <p className="font-medium">{profile.address}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Work Information */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800 flex items-center space-x-2">
                  <Building2 className="w-5 h-5" />
                  <span>Work Information</span>
                </h4>
                {isEditing ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <select
                        value={editedProfile.department}
                        onChange={(e) => setEditedProfile({...editedProfile, department: e.target.value})}
                        className="input-field"
                      >
                        <option value="Production">Production</option>
                        <option value="Quality">Quality Control</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Logistics">Logistics</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                      <input
                        type="text"
                        value={editedProfile.position}
                        onChange={(e) => setEditedProfile({...editedProfile, position: e.target.value})}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Shift</label>
                      <select
                        value={editedProfile.shift}
                        onChange={(e) => setEditedProfile({...editedProfile, shift: e.target.value})}
                        className="input-field"
                      >
                        <option value="Morning (08:00 - 16:00)">Morning (08:00 - 16:00)</option>
                        <option value="Afternoon (16:00 - 00:00)">Afternoon (16:00 - 00:00)</option>
                        <option value="Night (00:00 - 08:00)">Night (00:00 - 08:00)</option>
                      </select>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-3">
                      <Building2 className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Department</p>
                        <p className="font-medium">{profile.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <User className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Position</p>
                        <p className="font-medium">{profile.position}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Hire Date</p>
                        <p className="font-medium">{profile.hireDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Shift</p>
                        <p className="font-medium">{profile.shift}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Skills Section */}
            <div className="mt-8 space-y-4">
              <h4 className="font-semibold text-gray-800">Skills & Certifications</h4>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
                {isEditing && (
                  <button className="px-3 py-1.5 border-2 border-dashed border-gray-300 text-gray-600 rounded-full text-sm hover:border-gray-400">
                    + Add Skill
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;