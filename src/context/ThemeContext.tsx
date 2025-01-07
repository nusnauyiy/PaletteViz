import { createContext, useContext, Component, createSignal, createEffect, JSX } from 'solid-js';
import type { Theme } from '../types';

const lightTheme = {
  background: '#FFFFFF',
  text: '#2A2A2A',
  border: '#E5E7EB',
  isDark: false,
};

const darkTheme = {
  background: '#1A1A1A',
  text: '#FFFFFF',
  border: '#374151',
  isDark: true,
};

const defaultTheme: Theme = {
  primary: '#4A90E2',
  secondary: '#E29C4A',
  muted: '#64748B',
  accent: '#F5F7FA',
  ...lightTheme,
};

type ThemeContextType = {
  theme: () => Theme;
  setTheme: (theme: Theme | ((prev: Theme) => Theme)) => void;
  toggleDarkMode: () => void; // Changed to be a simple function with no parameters
};

const ThemeContext = createContext<ThemeContextType>();

export const ThemeProvider: Component<{ children: JSX.Element }> = (props) => {
  const [theme, setTheme] = createSignal<Theme>(defaultTheme);

  const toggleDarkMode = () => {
    setTheme(current => ({
      ...current,
      ...(current.isDark ? lightTheme : darkTheme),
      accent: current.isDark ? '#F5F7FA' : '#2D3748',
    }));
  };

  // Load theme from localStorage on mount
  createEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(JSON.parse(savedTheme));
    }
  });

  // Save theme to localStorage when it changes
  createEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme()));
  });

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleDarkMode }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};