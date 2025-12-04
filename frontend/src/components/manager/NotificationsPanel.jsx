import React, { useState } from 'react';
import { Bell, AlertTriangle, CheckCircle, Clock, Mail, ThumbsUp, MessageSquare, Eye } from 'lucide-react';

const NotificationsPanel = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'approval', title: 'Leave Request Pending', message: 'John Doe requested leave for Jan 20-22', time: '5 min ago', read: false },
    { id: 2, type: 'alert', title: 'Shift Change Request', message: 'Sarah Johnson wants to swap shift on Jan 18', time: '15 min ago', read: false },
    { id: 3, type: 'info', title: 'Team Update', message: 'New team member joined Production Line B', time: '1 hour ago', read: true },
    { id: 4, type: 'success', title: 'Request Approved', message: 'Overtime request approved for Mike Wilson', time: '2 hours ago', read: true },
    { id: 5, type: 'alert', title: 'Attendance Alert', message: '2 employees late for morning shift', time: 'Yesterday', read: true },
  ]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'approval': return <ThumbsUp className="w-5 h-5 text-blue-500" />;
      case 'alert': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
          <p className="text-gray-600">Manage team alerts and requests</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-secondary" onClick={markAllAsRead}>
            Mark All as Read
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <MessageSquare className="w-4 h-4" />
            <span>Send Message</span>
          </button>
        </div>
      </div>

      {/* Notification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-xl font-bold text-gray-800">{notifications.length}</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-xl font-bold text-gray-800">
                {notifications.filter(n => !n.read).length}
              </p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Urgent</p>
              <p className="text-xl font-bold text-gray-800">3</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <ThumbsUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Approved Today</p>
              <p className="text-xl font-bold text-gray-800">8</p>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-800">Recent Notifications</h4>
          <div className="flex space-x-2">
            <button className="text-sm text-gray-600 hover:text-gray-800">All</button>
            <button className="text-sm text-gray-600 hover:text-gray-800">Unread</button>
            <button className="text-sm text-gray-600 hover:text-gray-800">Urgent</button>
          </div>
        </div>
        
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`card p-4 border-l-4 ${
                notification.type === 'alert' ? 'border-l-yellow-500' :
                notification.type === 'approval' ? 'border-l-blue-500' :
                'border-l-green-500'
              } ${!notification.read ? 'bg-blue-50' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium text-gray-800">{notification.title}</h5>
                      {!notification.read && (
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-xs text-gray-500">{notification.time}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        notification.type === 'alert' ? 'bg-yellow-100 text-yellow-800' :
                        notification.type === 'approval' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {notification.type.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Eye className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
              
              {(notification.type === 'approval' || notification.type === 'alert') && !notification.read && (
                <div className="flex space-x-2 mt-3">
                  <button className="text-sm bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700">
                    Approve
                  </button>
                  <button className="text-sm bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700">
                    Reject
                  </button>
                  <button className="text-sm bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-300">
                    View Details
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPanel;