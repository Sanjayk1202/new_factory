import React from 'react';
import { 
  LayoutDashboard, Users, Building2, Calendar, Clock, 
  Bell, Shield, CheckSquare, FileText, User, 
  BarChart, Settings, Layers, Briefcase, FolderTree
} from 'lucide-react';
import { ROLES } from '../../utils/constants';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = ({ role, activeTab, setActiveTab }) => {
  const { getUserScope } = useAuth();
  const scope = getUserScope();

  // Navigation items based on role
  const getNavigationItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ];

    if (role === ROLES.ADMIN) {
      return [
        ...baseItems,
        { id: 'employees', label: 'Employee Database', icon: Users },
        { id: 'divisions', label: 'Divisions', icon: Layers },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'attendance', label: 'Attendance App', icon: CheckSquare },
        { id: 'schedule-control', label: 'Schedule Control', icon: Calendar },
        { id: 'reports', label: 'Reports', icon: FileText },
        { id: 'settings', label: 'Settings', icon: Settings },
      ];
    } else if (role === ROLES.DIVISION_MANAGER) {
      return [
        ...baseItems,
        { id: 'departments', label: 'Departments', icon: FolderTree },
        { id: 'attendance', label: 'Division Attendance', icon: BarChart },
        { id: 'schedule', label: 'Division Schedule', icon: Calendar },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'approvals', label: 'Approvals', icon: CheckSquare },
        { id: 'reports', label: 'Division Reports', icon: FileText },
      ];
    } else if (role === ROLES.DEPARTMENT_MANAGER) {
      return [
        ...baseItems,
        { id: 'attendance-dash', label: 'Attendance Dashboard', icon: BarChart },
        { id: 'schedule', label: 'Schedule', icon: Calendar },
        { id: 'daily-schedule', label: 'Daily Schedule', icon: Clock },
        { id: 'notifications-panel', label: 'Notifications', icon: Bell },
        { id: 'approvals', label: 'Approvals', icon: CheckSquare },
        { id: 'reports', label: 'Reports', icon: FileText },
      ];
    } else {
      return [
        ...baseItems,
        { id: 'shifts', label: 'Shift View', icon: Clock },
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'attendance', label: 'Attendance', icon: CheckSquare },
        { id: 'requests', label: 'Requests', icon: FileText },
        { id: 'notifications', label: 'Notifications', icon: Bell },
      ];
    }
  };

  const navItems = getNavigationItems();

  const getRoleBadge = () => {
    switch (role) {
      case ROLES.ADMIN:
        return { text: 'Admin', color: 'purple', description: 'Full System Access' };
      case ROLES.DIVISION_MANAGER:
        return { 
          text: 'Division Manager', 
          color: 'blue', 
          description: `${scope?.division?.name || 'Division'} Access` 
        };
      case ROLES.DEPARTMENT_MANAGER:
        return { 
          text: 'Department Manager', 
          color: 'green', 
          description: `${scope?.department?.name || 'Department'} Management` 
        };
      default:
        return { text: 'Employee', color: 'gray', description: 'Employee Access' };
    }
  };

  const roleBadge = getRoleBadge();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col z-20">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">FactoryShift</h1>
            <p className="text-xs text-gray-500">Division Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-600 border border-blue-100'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${activeTab === item.id ? 'text-blue-600' : ''}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Role & Scope Badge */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Shield className={`w-4 h-4 text-${roleBadge.color}-600`} />
            <span className="text-sm font-medium text-gray-700">{roleBadge.text}</span>
          </div>
          <p className="text-xs text-gray-500">{roleBadge.description}</p>
          
          {/* Division/Department Info */}
          {scope?.division && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Briefcase className="w-3 h-3 text-gray-500" />
                <span className="text-xs text-gray-600">{scope.division.name}</span>
              </div>
              {scope.department && (
                <div className="flex items-center space-x-2 mt-1">
                  <FolderTree className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-600">{scope.department.name}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;