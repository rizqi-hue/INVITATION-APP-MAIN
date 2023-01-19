import axios, { AxiosError } from "axios";
import { getData, removeCookie } from "utils/storage";

interface ApiInterface {
  method: string;
  url: string;
  data?: any;
  params?: any;
  withCredentials?: boolean;
}

const _api = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/api/`,
});

_api.interceptors.request.use(
  function (config: any) {
    let token = getData("token");
    if (token) {
      config.headers["Authorization"] = `${token}`;
    }

    config.headers["Content-Type"] = `Application/json`;
    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);

const api = async ({
  method,
  url,
  data = null,
  params = null,
  withCredentials = false,
}: ApiInterface) => {
  try {
    const response = await _api({
      method,
      url,
      data,
      params,
      withCredentials,
    });

    return response;
  } catch (err: any | AxiosError) {
    if (err.response.status === 401) {
      removeCookie("token");
    }

    throw err;
  }
};

export default api;
