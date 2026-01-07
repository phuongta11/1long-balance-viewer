export function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    if (!payload.exp) return false // No exp claim = don't refresh
    // Add 30 second buffer before expiry
    return Date.now() >= (payload.exp * 1000) - 30000
  } catch {
    return false // Parse error = don't refresh, let server decide
  }
}

export function getTokenExpiry(token: string): number | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp * 1000
  } catch {
    return null
  }
}
