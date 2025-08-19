import React, { createContext, useContext, useEffect, useState } from "react"

const ThemeCtx = createContext({
  theme: "blue",
  setTheme: () => {},
  accent: "blue",
  setAccent: () => {},
})

const THEME_KEY = "chronio_theme"
const ACCENT_KEY = "chronio_accent"

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || "blue")
  const [accent, setAccent] = useState(() => localStorage.getItem(ACCENT_KEY) || "blue")

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme)
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem(ACCENT_KEY, accent)
    document.documentElement.setAttribute("data-accent", accent)
  }, [accent])

  const value = { theme, setTheme, accent, setAccent }
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>
}

export function useTheme() {
  return useContext(ThemeCtx)
}
