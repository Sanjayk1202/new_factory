import { format, parseISO, isValid, differenceInDays, addDays, subDays } from 'date-fns';

// Date formatting
export const formatDate = (date, formatString = 'MMM dd, yyyy') => {
  if (!date) return '—';
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return '—';
    
    return format(dateObj, formatString);
  } catch (error) {
    console.error('Date formatting error:', error);
    return '—';
  }
};

export const formatDateTime = (date) => {
  return formatDate(date, 'MMM dd, yyyy HH:mm');
};

export const formatTime = (timeString) => {
  if (!timeString) return '—';
  
  try {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  } catch (error) {
    return timeString;
  }
};

// String utilities
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const truncate = (str, length = 50) => {
  if (!str) return '';
  return str.length > length ? str.substring(0, length) + '...' : str;
};

// Number formatting
export const formatNumber = (num, decimals = 0) => {
  if (num === null || num === undefined) return '0';
  return Number(num).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

export const formatPercentage = (value, total = 100) => {
  const percentage = (value / total) * 100;
  return `${percentage.toFixed(1)}%`;
};

// Array utilities
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const groupKey = item[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {});
};

export const uniqueArray = (array) => {
  return [...new Set(array)];
};

// Object utilities
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export const isEmpty = (obj) => {
  if (!obj) return true;
  if (Array.isArray(obj)) return obj.length === 0;
  return Object.keys(obj).length === 0;
};

// Validation utilities
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const isValidPhone = (phone) => {
  const re = /^[\+]?[1-9][\d]{0,15}$/;
  return re.test(phone.replace(/[\s\-\(\)]/g, ''));
};

export const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return isValid(date) && dateString !== '';
};

// Time calculations
export const calculateHours = (startTime, endTime) => {
  if (!startTime || !endTime) return 0;
  
  try {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    
    let start = startHour + startMinute / 60;
    let end = endHour + endMinute / 60;
    
    if (end < start) {
      end += 24; // Handle overnight shifts
    }
    
    return Math.round((end - start) * 100) / 100;
  } catch (error) {
    console.error('Error calculating hours:', error);
    return 0;
  }
};

export const calculateOvertime = (hoursWorked, regularHours = 8) => {
  const overtime = hoursWorked - regularHours;
  return overtime > 0 ? overtime : 0;
};

// Color utilities
export const getStatusColor = (status) => {
  const colors = {
    active: 'green',
    pending: 'yellow',
    completed: 'blue',
    cancelled: 'red',
    draft: 'gray',
    approved: 'green',
    rejected: 'red',
    present: 'green',
    absent: 'red',
    late: 'yellow',
    'on-leave': 'blue',
  };
  
  return colors[status?.toLowerCase()] || 'gray';
};

export const getShiftColor = (shiftType) => {
  const colors = {
    morning: 'blue',
    afternoon: 'green',
    night: 'purple',
    overtime: 'orange',
    weekend: 'gray',
  };
  
  return colors[shiftType?.toLowerCase()] || 'gray';
};

// Local storage utilities
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};