// src/api/index.js

import axios from 'axios';

// Backend API'nizin temel URL'si.
// Kendi backend'inizin çalıştığı adrese göre burayı güncelleyin.
// Örneğin: http://localhost:5000 veya http://192.168.1.100:5000
const API_BASE_URL = 'http://localhost:5215/api'; // Varsayılan olarak 5000 portu, kontrol edin!

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth API çağrıları
export const authApi = {
  register: (userData) => api.post('/Auth/register', userData),
  login: (credentials) => api.post('/Auth/login', credentials),
  getAllUsers: () => api.get('/Auth/users'),
  getUserById: (id) => api.get(`/Auth/users/${id}`),
  updateUser: (id, userData) => api.put(`/Auth/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/Auth/users/${id}`),
};

// Rapor API çağrıları
export const reportsApi = {
  createReport: (reportData) => api.post('/Reports', reportData),
  getAllReports: () => api.get('/Reports'),
  getReportById: (id) => api.get(`/Reports/${id}`),
  updateReport: (id, reportData) => api.put(`/Reports/${id}`, reportData),
  deleteReport: (id) => api.delete(`/Reports/${id}`),
};

// Bu sayede diğer bileşenlerde kolayca import edebiliriz:
// import { authApi, reportsApi } from '../api';