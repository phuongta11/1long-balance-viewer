import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { tokenStorage } from "@/utils/token-storage";
import { isTokenExpired } from "@/utils/jwt";
import type { AuthResponse } from "@/types/auth";

// Use proxy in dev, full URL in prod
const BASE_URL = import.meta.env.DEV
  ? "/api"
  : import.meta.env.VITE_API_BASE_URL || "https://api.dev.1long.com/v1";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

let isRefreshing = false;
let refreshPromise: Promise<AuthResponse> | null = null;

async function refreshTokens(): Promise<AuthResponse> {
  const refreshToken = tokenStorage.getRefreshToken();
  if (!refreshToken) throw new Error("No refresh token");

  const response = await axios.post<AuthResponse>(
    `${BASE_URL}/authentication/refresh`,
    { refresh_token: refreshToken }
  );
  const { access_token, refresh_token } = response.data.data;
  tokenStorage.setTokens(access_token, refresh_token);
  return response.data;
}

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = tokenStorage.getAccessToken();

    if (accessToken && isTokenExpired(accessToken)) {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refreshTokens().finally(() => {
          isRefreshing = false;
          refreshPromise = null;
        });
      }

      try {
        const tokens = await refreshPromise!;
        config.headers.Authorization = `Bearer ${tokens.data.access_token}`;
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
          tokenStorage.clearTokens();
          window.location.href = "/login";
        }
        throw error;
      }
    } else if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
