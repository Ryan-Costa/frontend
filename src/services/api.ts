import axios, { AxiosError } from "axios";

import baseUrl from "./apiUrl";

export const Api = axios.create({
  baseURL: baseUrl,

  withCredentials: true,
});

Api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.log("Redirecionando para a página de login.");
      const previousLocation = window.location.pathname;
      window.location.href = `/login?redirect=${previousLocation}`;
    }
    return Promise.reject(error);
  }
);

export default Api;
