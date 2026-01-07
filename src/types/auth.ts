export interface LoginRequest {
  email: string
  password: string
}

export interface AuthTokens {
  access_token: string
  refresh_token: string
}

export interface AuthResponse {
  success: boolean
  data: AuthTokens
}

export interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
}
