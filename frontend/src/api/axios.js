import axios from "axios";

const base = process.env.REACT_APP_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: base,
  headers: { "Content-Type": "application/json" },
});

export default api;
