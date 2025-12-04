const API_BASE_URL = 'http://localhost:8000/api';

let authToken = localStorage.getItem('token');

export const setAuthToken = (token) => {
  authToken = token;
  localStorage.setItem('token', token);
};

export const clearAuthToken = () => {
  authToken = null;
  localStorage.removeItem('token');
};

const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  try {
    const response = await fetch(url, { ...options, headers });
    
    if (response.status === 401) {
      clearAuthToken();
      window.location.href = '/';
      throw new Error('Session expired');
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || error.message || `Error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  login: async (credentials) => {
    const formData = new FormData();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);
    
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    const data = await response.json();
    setAuthToken(data.access_token);
    return data;
  },

  logout: async () => {
    clearAuthToken();
  },

  getCurrentUser: async () => {
    return apiCall('/auth/me');
  },
};

// Employees API
export const employeeAPI = {
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return apiCall(`/employees?${queryParams}`);
  },

  create: async (data) => {
    return apiCall('/employees', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id, data) => {
    return apiCall(`/employees/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id) => {
    return apiCall(`/employees/${id}`, {
      method: 'DELETE',
    });
  },
};

// Divisions API
export const divisionAPI = {
  getAll: async () => {
    return apiCall('/divisions');
  },

  create: async (data) => {
    return apiCall('/divisions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id, data) => {
    return apiCall(`/divisions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};

// Departments API
export const departmentAPI = {
  getAll: async (divisionId) => {
    const query = divisionId ? `?division_id=${divisionId}` : '';
    return apiCall(`/departments${query}`);
  },

  create: async (data) => {
    return apiCall('/departments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id, data) => {
    return apiCall(`/departments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};

// Attendance API
export const attendanceAPI = {
  getAttendance: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return apiCall(`/attendance?${queryParams}`);
  },

  checkIn: async () => {
    return apiCall('/attendance/check-in', {
      method: 'POST',
    });
  },

  checkOut: async () => {
    return apiCall('/attendance/check-out', {
      method: 'POST',
    });
  },
};

// Requests API
export const requestAPI = {
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return apiCall(`/requests?${queryParams}`);
  },

  create: async (data) => {
    return apiCall('/requests', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  approve: async (id) => {
    return apiCall(`/requests/${id}/approve`, {
      method: 'PUT',
    });
  },

  reject: async (id, notes) => {
    return apiCall(`/requests/${id}/reject`, {
      method: 'PUT',
      body: JSON.stringify({ notes }),
    });
  },
};

// Notifications API
export const notificationAPI = {
  getAll: async (unreadOnly = false) => {
    return apiCall(`/notifications?unread_only=${unreadOnly}`);
  },

  markAsRead: async (id) => {
    return apiCall(`/notifications/${id}/read`, {
      method: 'PUT',
    });
  },

  markAllAsRead: async () => {
    return apiCall('/notifications/read-all', {
      method: 'PUT',
    });
  },

  send: async (data) => {
    return apiCall('/notifications', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Schedules API
export const scheduleAPI = {
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return apiCall(`/schedules?${queryParams}`);
  },

  create: async (data) => {
    return apiCall('/schedules', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  approve: async (id) => {
    return apiCall(`/schedules/${id}/approve`, {
      method: 'PUT',
    });
  },
};

// Shifts API
export const shiftAPI = {
  getAll: async () => {
    return apiCall('/shifts');
  },
};

// Dashboard API
export const dashboardAPI = {
  getStats: async () => {
    return apiCall('/dashboard/stats');
  },
};

// Reports API
export const reportAPI = {
  generateAttendanceReport: async (params, exportToExcel = false) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = `/reports/attendance?${queryParams}&export=${exportToExcel}`;
    
    if (exportToExcel) {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate report');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `attendance_report_${params.start_date}_${params.end_date}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      
      return { success: true };
    } else {
      return apiCall(url);
    }
  },
};