import axios from 'axios';
import getApiConfig from '../config/api';

const { baseURL } = getApiConfig();

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data);
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (name, email, phone, password) => {
    const response = await api.post('/auth/register', { name, email, phone, password });
    return response.data;
  },
};

export const complaintService = {
  submitComplaint: async (formData) => {
    const response = await api.post('/complaints/submit', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getMyComplaints: async () => {
    const response = await api.get('/complaints/my-complaints');
    return response.data;
  },

  submitFeedback: async (complaintId, rating, comment) => {
    const response = await api.post(`/complaints/${complaintId}/feedback`, {
      rating,
      comment,
    });
    return response.data;
  },
};

export const adminService = {
  getAllComplaints: async () => {
    const response = await api.get('/admin/complaints');
    return response.data;
  },

  updateComplaintStatus: async (id, status, resolutionProof) => {
    const response = await api.put(`/admin/complaints/${id}/status`, {
      status,
      resolutionProof,
    });
    return response.data;
  },

  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },
};