import { Component } from 'solid-js';
import type { Theme } from '../types';

type HeroImageProps = {
  theme: Theme;
}

export const HeroImage: Component<HeroImageProps> = (props) => {
  return (
    <div class="absolute inset-0 w-full h-[500px]">
      <svg
        viewBox="0 0 1000 500"
        class="w-full h-full transition-all duration-500"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="heroGradient" x1="0" y1="0" x2="100%" y2="100%">
          <stop offset="40%" stop-color={props.theme.secondary} />
            <stop offset="0%" stop-color={props.theme.primary} />
            <stop offset="100%" stop-color={props.theme.muted} />
          </linearGradient>
          {/* Overlay gradient */}
          <linearGradient id="overlay" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="rgba(0,0,0,0.2)" />
            <stop offset="100%" stop-color="rgba(0,0,0,0.4)" />
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