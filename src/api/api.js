import axios from "axios";

const api = axios.create({
  baseURL: "https://b0f2-177-22-162-78.sa.ngrok.io",
});

api.interceptors.request.use(async config => { 
  const token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
