class NotificationService {
  constructor() {
    this.notifications = [];
    this.listeners = new Set();
    
    // Load notifications from localStorage
    const saved = localStorage.getItem('factory_notifications');
    if (saved) {
      this.notifications = JSON.parse(saved);
    }
  }

  // Add a notification
  addNotification(notification) {
    const newNotification = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      read: false,
      ...notification
    };
    
    this.notifications.unshift(newNotification);
    this.saveToStorage();
    this.notifyListeners();
    
    // Show browser notification if permitted
    if (Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico'
      });
    }
    
    return newNotification;
  }

  // Get all notifications
  getNotifications() {
    return [...this.notifications];
  }

  // Get unread notifications
  getUnreadNotifications() {
    return this.notifications.filter(n => !n.read);
  }

  // Mark notification as read
  markAsRead(id) {
    const index = this.notifications.findIndex(n => n.id === id);
    if (index !== -1) {
      this.notifications[index].read = true;
      this.saveToStorage();
      this.notifyListeners();
    }
  }

  // Mark all as read
  markAllAsRead() {
    this.notifications.forEach(n => n.read = true);
    this.saveToStorage();
    this.notifyListeners();
  }

  // Delete notification
  deleteNotification(id) {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.saveToStorage();
    this.notifyListeners();
  }

  // Clear all notifications
  clearAll() {
    this.notifications = [];
    this.saveToStorage();
    this.notifyListeners();
  }

  // Request browser notification permission
  requestPermission() {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }

  // Save to localStorage
  saveToStorage() {
    localStorage.setItem('factory_notifications', JSON.stringify(this.notifications));
  }

  // Add listener for real-time updates
  addListener(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  // Notify all listeners
  notifyListeners() {
    this.listeners.forEach(callback => callback(this.getNotifications()));
  }

  // Send system notification (for admin/manager)
  sendSystemNotification({ title, message, type = 'info', target = 'all' }) {
    return this.addNotification({
      title,
      message,
      type,
      target,
      source: 'system'
    });
  }

  // Send manager notification
  sendManagerNotification({ title, message, managerId }) {
    return this.addNotification({
      title,
      message,
      type: 'manager',
      target: 'manager',
      managerId
    });
  }

  // Send employee notification
  sendEmployeeNotification({ title, message, employeeId }) {
    return this.addNotification({
      title,
      message,
      type: 'employee',
      target: 'employee',
      employeeId
    });
  }
}

// Create singleton instance
export const notificationService = new NotificationService();

// Hook for React components
export const useNotifications = () => {
  const [notifications, setNotifications] = React.useState(notificationService.getNotifications());

  React.useEffect(() => {
    const removeListener = notificationService.addListener(setNotifications);
    return removeListener;
  }, []);

  return {
    notifications,
    addNotification: notificationService.addNotification.bind(notificationService),
    markAsRead: notificationService.markAsRead.bind(notificationService),
    markAllAsRead: notificationService.markAllAsRead.bind(notificationService),
    deleteNotification: notificationService.deleteNotification.bind(notificationService),
    clearAll: notificationService.clearAll.bind(notificationService),
    getUnreadCount: () => notificationService.getUnreadNotifications().length,
  };
};