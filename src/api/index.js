import apiClient from "./apiClient";

export const getApi = (endpoint, params) => {
  return apiClient.get(endpoint, { params }).then((res) => res.data);
};
