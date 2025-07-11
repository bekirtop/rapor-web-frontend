// src/services/auth.js
import axios from "axios";

const API_URL = "http://localhost:5215/api/Auth";

export const register = (payload) =>
  axios.post(`${API_URL}/register`, payload);

export const login = ({ username, password }) =>
  axios.post(`${API_URL}/login`, { username, password });
