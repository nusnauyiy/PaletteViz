// src/App.tsx
import { Component, createSignal, createEffect } from 'solid-js';
import { PaletteControls } from './components/PaletteControls';
import { SavedPalettes } from './components/SavedPalettes';
import { HeroImage } from './components/HeroImage';
import { hexToHSL, hslToHex, calculateTextColor } from './utils/colorUtils';
import type { Theme, SavedPalette } from './types';

const App: Component = () => {
  
  const [paletteType, setPaletteType] = createSignal('complementary');
  const [savedPalettes, setSavedPalettes] = createSignal<SavedPalette[]>([]);
  const [theme, setTheme] = createSignal<Theme>({
    primary: '#4A90E2',
    secondary: '#E29C4A',
    background: '#FFFFFF',
    text: '#2A2A2A',
    muted: '#64748B',
    accent: '#F5F7FA',
    border: '#E5E7EB'
  });

  const [baseColor, setBaseColor] = createSignal(theme().primary);
  // Load saved palettes and theme from localStorage
  createEffect(() => {
    const saved = localStorage.getItem('savedPalettes');
    if (saved) {
      setSavedPalettes(JSON.parse(saved));
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(JSON.parse(savedTheme));
      setBaseColor(JSON.parse(savedTheme).primary); // Update baseColor when theme is loaded from localStorage
    }
  });

  // Save palettes and theme to localStorage when updated
  createEffect(() => {
    localStorage.setItem('savedPalettes', JSON.stringify(savedPalettes()));
  });

  createEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme()));
  });

  const generatePalette = () => {
    const [h, s, l] = hexToHSL(baseColor());

    switch (paletteType()) {
      case 'complementary':
        return [
          baseColor(),
          hslToHex((h + 0.5) % 1, s, l)
        ];
      case 'monochromatic':
        return [
          baseColor(),
          hslToHex(h, s, Math.max(0.1, l - 0.3)),
          hslToHex(h, s, Math.min(0.9, l + 0.2)),
          hslToHex(h, Math.min(1, s + 0.2), l),
          hslToHex(h, Math.max(0, s - 0.2), l)
        ];
      case 'triadic':
        return [
          baseColor(),
          hslToHex((h + 1 / 3) % 1, s, l),
          hslToHex((h + 2 / 3) % 1, s, l)
        ];
      default:
        return [baseColor()];
    }
  };

  const applyTheme = (colors: string[]) => {
    const primary = colors[0];
    const secondary = colors[1] || colors[0];
    const tertiary = colors[2] || secondary;
    const [h, s] = hexToHSL(primary);

    setTheme({
      primary,
      secondary,
      background: '#FFFFFF',
      text: '#2A2A2A',
      muted: tertiary || hslToHex(h, 0.3, 0.6),
      accent: hslToHex(h, 0.1, 0.98),
      border: hslToHex(h, 0.1, 0.9)
    });
  };

  const savePalette = () => {
    setSavedPalettes(prev => [...prev, {
      id: Date.now(),
      colors: generatePalette(),
      timestamp: new Date().toISOString()
    }]);
  };

  const removePalette = (id: number) => {
    setSavedPalettes(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div
      class="min-h-screen w-screen overflow-x-hidden transition-colors duration-200"
      style={{
        'background-color': theme().background,
        color: theme().text
      }}
    >
      <div class="relative h-[500px] w-full mb-12">
        <HeroImage theme={theme()} />

        {/* Header Content */}
        <div class="relative z-10 h-full flex flex-col items-center justify-center px-4 w-full">
          <h1 class="text-6xl font-bold mb-6 text-white">
            Palette Pro
          </h1>
          <p class="text-xl text-white/80 text-center max-w-2xl">
            Create harmonious color palettes for your next masterpiece
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div class="w-full px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          {/* Generator and Saved Palettes Section */}
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Generator Section */}
            <div class="lg:col-span-2 space-y-8">
              <div
                class="p-6 rounded-xl w-full"
                style={{
                  'background-color': theme().accent,
                  'border': `1px solid ${theme().border}`
                }}
              >
                <PaletteControls
                  baseColor={baseColor()}
                  paletteType={paletteType()}
                  onBaseColorChange={setBaseColor}
                  onPaletteTypeChange={setPaletteType}
                  theme={theme()}
                  generatedColors={generatePalette()} // Pass the generated colors
                />

                <div class="flex gap-4 mt-6">
                  <button
                    class="px-6 py-2 rounded-lg transition-all duration-200 hover:opacity-90"
                    style={{
                      'background-color': theme().primary,
                      color: calculateTextColor(theme().primary)
                    }}
                    onClick={() => applyTheme(generatePalette())}
                  >
                    Apply to Website
                  </button>
                  <button
                    class="rounded-lg transition-all duration-200  hover:opacity-90"
                    style={{
                      'background-color': theme().secondary,
                      color: calculateTextColor(theme().secondary)
                    }}
                    onClick={savePalette}
                  >
                    Save Palette
                  </button>
                </div>
              </div>
            </div>

            {/* Saved Palettes Section */}
            <div class="w-full">
              <div
                class="p-6 rounded-xl sticky top-8 w-full"
                style={{
                  'background-color': theme().accent,
                  'border': `1px solid ${theme().border}`
                }}
              >
                <h2 class="text-xl font-semibold mb-6">Saved Palettes</h2>
                <SavedPalettes
                  palettes={savedPalettes()}
                  onApply={applyTheme}
                  onRemove={removePalette}
                  theme={theme()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;