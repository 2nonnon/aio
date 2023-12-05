'use client'

import React from 'react'

export type ThemeType = 'light' | 'dark' | 'system'

export enum StorageKey {
  THEME = 'THEME',
}

const ThemeContext = React.createContext<{ theme: ThemeType; setTheme: React.Dispatch<React.SetStateAction<ThemeType>> } | null>(null)

export function useTheme() {
  return React.useContext(ThemeContext)!
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState<ThemeType>('light')

  if (typeof window !== 'undefined') {
    React.useLayoutEffect(() => {
      if (localStorage.getItem(StorageKey.THEME))
        setTheme(localStorage.getItem(StorageKey.THEME) as ThemeType)
      else if (window.matchMedia('(prefers-color-scheme: dark)').matches)
        setTheme('dark')
    }, [])
  }

  React.useEffect(() => {
    document.documentElement.setAttribute('theme', theme)
    localStorage.setItem(StorageKey.THEME, theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
