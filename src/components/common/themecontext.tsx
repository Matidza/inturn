import React, { createContext, useContext, useState, useEffect } from "react";

/* ── CONTEXT ─────────────────────────────────────────────── */
interface ThemeCtx {
  dark: boolean;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeCtx>({ dark: false, toggle: () => {} });

export const useThemeMode = () => useContext(ThemeContext);

/* ── PROVIDER ────────────────────────────────────────────── */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dark, setDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem("inturn_dark") === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem("inturn_dark", String(dark));
    // Also toggle a data-attribute on <html> so CSS can react if needed
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  const toggle = () => setDark(d => !d);

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;