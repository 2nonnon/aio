'use client'

import React from 'react'
import type { Dictionary, LocaleType } from '@/dictionaries'

interface I18nContextContent { locale: LocaleType; copies: Dictionary }

const I18nContext = React.createContext<I18nContextContent | null>(null)

export function useI18n() {
  return React.useContext(I18nContext)!
}

export function I18nProvider({ children, locale, copies }: { children: React.ReactNode } & I18nContextContent) {
  return (
    <I18nContext.Provider value={{ locale, copies }}>
      {children}
    </I18nContext.Provider>
  )
}
