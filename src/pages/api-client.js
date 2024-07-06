import axios from "axios";

const api = axios.create({
  baseURL: "https://studentprod.vercel.app/",
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      window.location.replace("/auth/login");
    }
    return Promise.reject(error);
  }
);

export default api;
