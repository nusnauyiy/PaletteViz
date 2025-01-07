import { createContext, useContext, Component, createSignal, createEffect, JSX } from 'solid-js';
import type { SavedPalette } from '../types';

type PaletteContextType = {
  savedPalettes: () => SavedPalette[];
  setSavedPalettes: (palettes: SavedPalette[]) => void;
  savePalette: (colors: string[]) => void;
  removePalette: (id: number) => void;
};

const PaletteContext = createContext<PaletteContextType>();

export const PaletteProvider: Component<{ children: JSX.Element }> = (props) => {
  const [savedPalettes, setSavedPalettes] = createSignal<SavedPalette[]>([]);

  // Load saved palettes from localStorage
  createEffect(() => {
    const saved = localStorage.getItem('savedPalettes');
    if (saved) {
      setSavedPalettes(JSON.parse(saved));
    }
  });

  // Save palettes to localStorage when updated
  createEffect(() => {
    localStorage.setItem('savedPalettes', JSON.stringify(savedPalettes()));
  });

  const savePalette = (colors: string[]) => {
    setSavedPalettes(prev => [...prev, {
      id: Date.now(),
      colors,
      timestamp: new Date().toISOString()
    }]);
  };

  const removePalette = (id: number) => {
    setSavedPalettes(prev => prev.filter(p => p.id !== id));
  };

  return (
    <PaletteContext.Provider value={{ savedPalettes, setSavedPalettes, savePalette, removePalette }}>
      {props.children}
    </PaletteContext.Provider>
  );
};

export const usePalette = () => {
  const context = useContext(PaletteContext);
  if (!context) {
    throw new Error('usePalette must be used within a PaletteProvider');
  }
  return context;
};