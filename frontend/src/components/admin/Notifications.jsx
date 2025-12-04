import React, { useState } from 'react';
import { Bell, Mail, AlertTriangle, CheckCircle, XCircle, Clock, Send, Trash2 } from 'lucide-react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'alert', title: 'Shift Change Required', message: 'Production line A needs additional staff for night shift', time: '10 min ago', read: false },
    { id: 2, type: 'info', title: 'New Employee Onboarded', message: 'John Smith joined as Production Operator', time: '1 hour ago', read: true },
    { id: 3, type: 'warning', title: 'Attendance Alert', message: '3 employees late for morning shift', time: '2 hours ago', read: false },
    { id: 4, type: 'success', title: 'Schedule Approved', message: 'Weekly schedule approved by manager', time: '1 day ago', read: true },
    { id: 5, type: 'alert', title: 'Equipment Maintenance', message: 'Machine #5 requires immediate maintenance', time: '2 days ago', read: true },
  ]);

  const [newNotification, setNewNotification] = useState({
    type: 'info',
    title: '',
    message: '',
    target: 'all'
  });

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'warning': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      default: return <Bell className="w-5 h-5 text-blue-500" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'alert': return 'bg-red-50 border-red-100';
      case 'warning': return 'bg-yellow-50 border-yellow-100';
      case 'success': return 'bg-green-50 border-green-100';
      default: return 'bg-blue-50 border-blue-100';
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const sendNotification = () => {
    if (!newNotification.title || !newNotification.message) return;
    
    const newNotif = {
      id: notifications.length + 1,
      type: newNotification.type,
      title: newNotification.title,
      message: newNotification.message,
      time: 'Just now',
      read: false
    };
    
    setNotifications([newNotif, ...notifications]);
    setNewNotification({
      type: 'info',
      title: '',
      message: '',
      target: 'all'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Notifications Center</h3>
          <p className="text-gray-600">Manage system alerts and announcements</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-secondary">
            Mark All as Read
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Bell className="w-4 h-4" />
            <span>Send Alert</span>
          </button>
        </div>
      </div>

      {/* Send New Notification */}
      <div className="card p-6">
        <h4 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
          <Send className="w-5 h-5" />
          <span>Send New Notification</span>
        </h4>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notification Type</label>
              <select
                value={newNotification.type}
                onChange={(e) => setNewNotification({...newNotification, type: e.target.value})}
                className="input-field"
              >
                <option value="info">Information</option>
                <option value="alert">Alert</option>
                <option value="warning">Warning</option>
                <option value="success">Success</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
              <select
                value={newNotification.target}
                onChange={(e) => setNewNotification({...newNotification, target: e.target.value})}
                className="input-field"
              >
                <option value="all">All Employees</option>
                <option value="production">Production Only</option>
                <option value="quality">Quality Only</option>
                <option value="managers">Managers Only</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={newNotification.title}
              onChange={(e) => setNewNotification({...newNotification, title: e.target.value})}
              placeholder="Enter notification title..."
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              value={newNotification.message}
              onChange={(e) => setNewNotification({...newNotification, message: e.target.value})}
              placeholder="Enter notification message..."
              rows="3"
              className="input-field"
            />
          </div>
          <button
            onClick={sendNotification}
            className="btn-primary flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Send Notification</span>
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-800">Recent Notifications</h4>
          <span className="text-sm text-gray-600">{notifications.filter(n => !n.read).length} unread</span>
        </div>
        
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`card p-4 ${getNotificationColor(notification.type)} ${!notification.read ? 'border-l-4 border-l-blue-500' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getNotificationIcon(notification.type)}
                  <div>
                    <h5 className="font-medium text-gray-800">{notification.title}</h5>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-xs text-gray-500">{notification.time}</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {notification.type.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Mark as read
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="p-1 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;