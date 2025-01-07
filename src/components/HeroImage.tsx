import { Component } from 'solid-js';
import { useTheme } from '../context/ThemeContext';

export const HeroImage: Component = () => {
  const { theme } = useTheme();

  return (
    <div class="absolute inset-0 w-full h-[500px]">
      <svg
        viewBox="0 0 1000 500"
        class="w-full h-full transition-all duration-500"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="heroGradient" x1="0" y1="0" x2="100%" y2="100%">
            <stop offset="40%" stop-color={theme().secondary} />
            <stop offset="0%" stop-color={theme().primary} />
            <stop offset="100%" stop-color={theme().muted} />
          </linearGradient>
          {/* Overlay gradient */}
          <linearGradient id="overlay" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="rgba(0,0,0,0.1)" />
            <stop offset="100%" stop-color="rgba(0,0,0,0.3)" />
          </linearGradient>
        </defs>

        {/* Main colored background */}
        <rect width="100%" height="100%" fill="url(#heroGradient)" />
        
        {/* Overlay */}
        <rect width="100%" height="100%" fill="url(#overlay)" />
      </svg>
    </div>
  );
};