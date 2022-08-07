import axios from "axios";

const api = axios.create({
  
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use(async (config:any) => {
  return config;
});

export default api;
