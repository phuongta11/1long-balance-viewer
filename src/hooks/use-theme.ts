import { useState, useEffect } from 'react'

// Apply theme on module load (before React renders)
function getInitialTheme(): boolean {
  const stored = localStorage.getItem('theme')
  if (stored) return stored === 'dark'
  return true // Default to dark
}

// Apply immediately to prevent flash
const initialIsDark = getInitialTheme()
document.documentElement.classList.toggle('dark', initialIsDark)

export function useTheme() {
  const [isDark, setIsDark] = useState(initialIsDark)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return { isDark, toggle: () => setIsDark(d => !d) }
}
