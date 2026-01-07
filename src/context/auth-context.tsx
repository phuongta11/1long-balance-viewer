import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { tokenStorage } from '@/utils/token-storage'
import { isTokenExpired } from '@/utils/jwt'
import { login as apiLogin, logout as apiLogout } from '@/api/auth'
import { queryClient } from '@/main'
import type { LoginRequest, AuthState } from '@/types/auth'

interface AuthContextValue extends AuthState {
  login: (credentials: LoginRequest) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ isAuthenticated: false, isLoading: true })

  useEffect(() => {
    const token = tokenStorage.getAccessToken()
    const refreshToken = tokenStorage.getRefreshToken()
    const isValid = token && !isTokenExpired(token)
    const hasRefresh = !!refreshToken
    setState({ isAuthenticated: isValid || hasRefresh, isLoading: false })
  }, [])

  const login = async (credentials: LoginRequest) => {
    await apiLogin(credentials)
    setState({ isAuthenticated: true, isLoading: false })
  }

  const logout = () => {
    apiLogout()
    queryClient.clear() // Clear all cached data on logout
    setState({ isAuthenticated: false, isLoading: false })
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
