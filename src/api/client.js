import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE,
});

// Registration
export const register = async (data) => {
  const res = await api.post("/api/auth/register", data, {
    headers: { "Content-Type": "application/json" }
  });
  return res.data;
};

// Login
export const login = async (data) => {
  const res = await api.post("/api/auth/login", data, {
    headers: { "Content-Type": "application/json" }
  });
  return res.data;
};

export default api;
