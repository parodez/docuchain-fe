import axios from "axios";

const api = axios.create({
  // baseURL: "https://docuchain-backend-cu77.onrender.com",
  // baseURL: "https://docuchain-backend-v2.onrender.com",
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject({
      message: error.response?.data?.message || "Something went wrong",
      status: error.response?.status,
    });
  },
);

export default api;
