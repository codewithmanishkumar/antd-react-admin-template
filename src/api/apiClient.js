import axios from "axios";
import store from "../store";
import { message as toastMessage } from "antd";

export const BASE_URL = "https://dummyjson.com";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

apiClient.interceptors.request.use(function (config) {
  const { auth } = store.getState();

  config.headers.authorization = auth.token ? `Bearer ${auth.token}` : "";

  return config;
});

apiClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    toastMessage.open({
      type: "error",
      content: message,
    });

    error.message = message;
    return Promise.reject(error);
  }
);

export default apiClient;
