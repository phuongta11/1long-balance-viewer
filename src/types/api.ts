export interface ApiError {
  error_code: string
  message: string
  details?: Record<string, unknown>
}
