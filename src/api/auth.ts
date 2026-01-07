import axios from "axios";
import type { LoginRequest, AuthResponse } from "@/types/auth";
import { tokenStorage } from "@/utils/token-storage";

// Use proxy in dev, full URL in prod
const BASE_URL = import.meta.env.DEV
  ? "/api"
  : import.meta.env.VITE_API_BASE_URL || "https://api.dev.1long.com/v1";

export async function login(credentials: LoginRequest): Promise<AuthResponse> {
  const response = await axios.post<AuthResponse>(
    `${BASE_URL}/authentication/login`,
    credentials,
    { headers: { "Content-Type": "application/json" }, timeout: 30000 }
  );

  const { access_token, refresh_token } = response.data.data;
  tokenStorage.setTokens(access_token, refresh_token);

  return response.data;
}

export function logout(): void {
  tokenStorage.clearTokens();
}
