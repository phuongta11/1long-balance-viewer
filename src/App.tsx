import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/context/auth-context'
import { ProtectedRoute } from '@/components/protected-route'
import { Login } from '@/pages/login'
import { Dashboard } from '@/pages/dashboard'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  )
}
