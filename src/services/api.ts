import axios, { AxiosError } from "axios";

import baseUrl from "./apiUrl";
import { getUserLocalStorage } from "@/context/auth-provider/util";

export const Api = axios.create({
  baseURL: baseUrl,

  withCredentials: true,
});

Api.interceptors.response.use(
  (response) => {
    const user = getUserLocalStorage();

    response.config.headers.Authorization = user?.token

    return response
  },
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
