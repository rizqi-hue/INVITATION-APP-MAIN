import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/api/`,
});

api.interceptors.request.use(
  function (config: any) {
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers["Authorization"] = `${token}`;
    // }
    config.headers["Content-Type"] = `Application/json`;
    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);

export default api;
