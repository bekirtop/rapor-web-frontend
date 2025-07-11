// src/services/topics.js
import axios from "axios";

const API_BASE = "http://localhost:5215/api/Topics";
const token = localStorage.getItem("token");

// Eğer JWT kullanıyorsan header ekle
const client = axios.create({
  baseURL: API_BASE,
  headers: token
    ? { Authorization: `Bearer ${token}` }
    : undefined,
});

export const getTopics    = () => client.get("");
export const getTopic     = (id) => client.get(`/${id}`);
export const createTopic  = (data) => client.post("", data);
export const updateTopic  = (id, data) => client.put(`/${id}`, data);
export const deleteTopic = (id) =>
  client.delete(`/${id}`);
