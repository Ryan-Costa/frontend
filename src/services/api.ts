import axios, { AxiosError } from "axios";

import baseUrl from "./api-url";
import { getUserLocalStorage } from "@/context/auth-provider/util";

export const Api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

Api.interceptors.request.use(
  (config) => {
    const user = getUserLocalStorage();

    if (user && user.access_token) {
      config.headers.Authorization = `Bearer ${user.access_token}`
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

Api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.log("Redirecionando para a página de login.");
      const previousLocation = window.location.pathname;
      window.location.href = `/entrar?redirect=${previousLocation}`;
    }
    return Promise.reject(error);
  }
);

export default Api;
