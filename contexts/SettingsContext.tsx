import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import type { Theme, SettingsContextType } from '../types';

const THEMES: Theme[] = ['theme-gold', 'theme-cosmic', 'theme-crimson', 'theme-emerald', 'theme-sapphire', 'theme-amethyst', 'theme-obsidian', 'theme-sunstone', 'theme-upload'];

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const savedTheme = localStorage.getItem('appTheme') as Theme | null;
      return savedTheme && THEMES.includes(savedTheme) ? savedTheme : 'theme-gold';
    } catch (error) {
      console.error("Failed to load theme from localStorage", error);
      return 'theme-gold';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    // Clean up old theme classes
    THEMES.forEach(t => root.classList.remove(t));
    // Add the currently selected theme class
    root.classList.add(theme);
    // Save the theme for next visit
    try {
      localStorage.setItem('appTheme', theme);
    } catch (error) {
       console.error("Failed to save theme to localStorage", error);
    }
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};