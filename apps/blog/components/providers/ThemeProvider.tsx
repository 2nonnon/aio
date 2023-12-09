'use client'

import { PropsWithChildren } from 'react'
import React from 'react'
import useUpdateEffect from '@/hooks/useUpdateEffect'

export type ThemeType = 'light' | 'dark' | 'system'

export enum StorageKey {
  THEME = 'THEME',
}

const ThemeContext = React.createContext<{ theme: ThemeType; setTheme: React.Dispatch<React.SetStateAction<ThemeType>> } | null>(null)

export function useTheme() {
  return React.useContext(ThemeContext)!
}

function getDefaultTheme(defaultTheme: ThemeType | undefined) {
  if (typeof window !== 'undefined')
    return (localStorage.getItem(StorageKey.THEME) || window.matchMedia('(prefers-color-scheme: dark)').matches || defaultTheme || 'light') as ThemeType
  else
    return defaultTheme || 'light'
}

export function ThemeProvider({ children, defaultTheme }: PropsWithChildren<{ defaultTheme?: ThemeType }>) {
  const [theme, setTheme] = React.useState<ThemeType>(getDefaultTheme(defaultTheme))

  useUpdateEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(StorageKey.THEME, theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
