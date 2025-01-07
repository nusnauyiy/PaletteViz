import { Component } from 'solid-js';
import { useTheme } from '../context/ThemeContext';
import { BiRegularSun, BiRegularMoon } from 'solid-icons/bi';

export const ThemeToggle: Component = () => {
  const { theme, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={() => toggleDarkMode()}
      class="fixed bottom-6 right-6 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
      style={{
        'background-color': theme().background,
        'color': theme().primary,
        'border': `2px solid ${theme().primary}`
      }}
      aria-label="Toggle dark mode"
    >
      {theme().isDark ? (
        <BiRegularSun size={24} />
      ) : (
        <BiRegularMoon size={24} />
      )}
    </button>
  );
};