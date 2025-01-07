import { createContext, useContext, Component, createSignal, createEffect, JSX } from 'solid-js';
import { Theme } from '../types';

// Default theme
const defaultTheme: Theme = {
  primary: '#4A90E2',
  secondary: '#E29C4A',
  background: '#FFFFFF',
  text: '#2A2A2A',
  muted: '#64748B',
  accent: '#F5F7FA',
  border: '#E5E7EB'
};

type ThemeContextType = {
  theme: () => Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType>();

export const ThemeProvider: Component<{ children: JSX.Element }> = (props) => {
  const [theme, setTheme] = createSignal<Theme>(defaultTheme);

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
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};