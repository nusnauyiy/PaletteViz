import { Component } from 'solid-js';
import { HeroImage } from './HeroImage';

export const Header: Component = () => {
  return (
    <div class="relative h-[500px] w-full mb-12">
      <HeroImage />
      <div class="relative z-10 h-full flex flex-col items-center justify-center px-4 w-full">
        <h1 class="text-6xl font-bold mb-6 text-white">
          Palette Viz
        </h1>
        <p class="text-xl text-white/80 text-center max-w-2xl">
          Create harmonious color palettes for your next masterpiece
        </p>
      </div>
    </div>
  );
};