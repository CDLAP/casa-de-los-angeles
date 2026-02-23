'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type HeroTheme = 'green' | 'wine'

const HeroThemeContext = createContext<HeroTheme>('green')

export function HeroThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<HeroTheme>('green')

  useEffect(() => {
    // Random on each page load
    setTheme(Math.random() > 0.5 ? 'wine' : 'green')
  }, [])

  return (
    <HeroThemeContext.Provider value={theme}>
      {children}
    </HeroThemeContext.Provider>
  )
}

export function useHeroTheme() {
  return useContext(HeroThemeContext)
}
