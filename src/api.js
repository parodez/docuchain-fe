import axios from "axios";

const api = axios.create({
  // baseURL: "https://docuchain-backend-cu77.onrender.com",
  baseURL: "http://localhost:5000",
  // timeout: 5000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized - redirect to login");
    }

    return Promise.reject(error);
  },
);

export default api;
