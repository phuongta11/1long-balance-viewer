import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { tokenStorage } from "@/utils/token-storage";
import { isTokenExpired } from "@/utils/jwt";

// Use proxy in dev, full URL in prod
const BASE_URL = import.meta.env.DEV
  ? "/api"
  : import.meta.env.VITE_API_BASE_URL || "https://api.dev.1long.vn/v1";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

// Logout and redirect to login
function forceLogout() {
  tokenStorage.clearTokens();
  window.location.href = "/login";
}

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = tokenStorage.getAccessToken();

    // If token expired, logout immediately
    if (accessToken && isTokenExpired(accessToken)) {
      forceLogout();
      return Promise.reject(new Error("Token expired"));
    }

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Logout on 401 Unauthorized
    if (error.response?.status === 401) {
      forceLogout();
    }
    return Promise.reject(error);
  }
);
