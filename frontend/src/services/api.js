const API_BASE_URL = 'http://localhost:8000/api';

// Generic API call function
async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('token');
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    defaultOptions.headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    
    if (!response.ok) {
      if (response.status === 401) {
        // Token expired or invalid - logout user
        localStorage.removeItem('token');
        localStorage.removeItem('factory_user');
        localStorage.removeItem('factory_role');
        window.location.href = '/';
        throw new Error('Session expired. Please login again.');
      }
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || error.detail || `API error: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}

// Employee API
export const employeeAPI = {
  getProfile: () => apiCall('/employees/me'),
  updateProfile: (data) => apiCall('/employees/me', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  getAttendance: (params) => {
    const queryParams = new URLSearchParams(params).toString();
    return apiCall(`/attendance?${queryParams}`);
  },
  getShifts: () => apiCall('/shifts/me'),
  requestLeave: (data) => apiCall('/requests/leave', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  getRequests: () => apiCall('/requests'),
};

// Manager API
export const managerAPI = {
  getTeam: () => apiCall('/manager/team'),
  getTeamAttendance: (params) => {
    const queryParams = new URLSearchParams(params).toString();
    return apiCall(`/manager/attendance?${queryParams}`);
  },
  generateSchedule: (data) => apiCall('/manager/schedule/generate', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  getPendingApprovals: () => apiCall('/manager/approvals/pending'),
  approveRequest: (id) => apiCall(`/manager/approvals/${id}/approve`, {
    method: 'POST',
  }),
  rejectRequest: (id) => apiCall(`/manager/approvals/${id}/reject`, {
    method: 'POST',
  }),
};

// Admin API
export const adminAPI = {
  getAllEmployees: (params) => {
    const queryParams = new URLSearchParams(params).toString();
    return apiCall(`/admin/employees?${queryParams}`);
  },
  createEmployee: (data) => apiCall('/admin/employees', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateEmployee: (id, data) => apiCall(`/admin/employees/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  deleteEmployee: (id) => apiCall(`/admin/employees/${id}`, {
    method: 'DELETE',
  }),
  getAllDepartments: () => apiCall('/admin/departments'),
  createDepartment: (data) => apiCall('/admin/departments', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  generateCompanySchedule: (data) => apiCall('/admin/schedule/generate', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  sendNotification: (data) => apiCall('/admin/notifications', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

// Schedule API
export const scheduleAPI = {
  generate: (data) => apiCall('/schedules/generate', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  getAll: () => apiCall('/schedules'),
  getById: (id) => apiCall(`/schedules/${id}`),
};

// Utility function for mock data (remove in production)
export const mockApi = {
  delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
  
  getMockData: async (endpoint) => {
    await mockApi.delay(500); // Simulate network delay
    
    const mockData = {
      '/employees': [
        { id: 1, name: 'John Doe', email: 'john@factory.com', department: 'Production' },
        { id: 2, name: 'Jane Smith', email: 'jane@factory.com', department: 'Quality' },
      ],
      '/attendance': {
        present: 142,
        absent: 8,
        late: 12,
        records: []
      },
      '/shifts/me': [
        { id: 1, date: '2024-01-15', shift: 'Morning', time: '08:00 - 16:00' },
        { id: 2, date: '2024-01-16', shift: 'Morning', time: '08:00 - 16:00' },
      ],
    };
    
    return mockData[endpoint] || { message: 'Mock data not available' };
  },
};

export default apiCall;