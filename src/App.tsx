import { Component, createSignal } from 'solid-js';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { PaletteProvider, usePalette } from './context/PaletteContext';
import { PaletteControls } from './components/PaletteControls';
import { SavedPalettes } from './components/SavedPalettes';
import { HeroImage } from './components/HeroImage';
import { hexToHSL, hslToHex, calculateTextColor } from './utils/colorUtils';

// Wrapper component that provides the theme context
const App: Component = () => {
  return (
    <ThemeProvider>
      <PaletteProvider>
        <AppContent />
      </PaletteProvider>
    </ThemeProvider>
  );
};

// Main application content that uses the theme context
const AppContent: Component = () => {
  const { theme, setTheme } = useTheme();
  const { savePalette } = usePalette();
  const [paletteType, setPaletteType] = createSignal('complementary');
  const [baseColor, setBaseColor] = createSignal(theme().primary);

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

  return (
    <div
      class="min-h-screen w-screen overflow-x-hidden transition-colors duration-200"
      style={{
        'background-color': theme().background,
        color: theme().text
      }}
    >
      <div class="relative h-[500px] w-full mb-12">
        <HeroImage />

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
                  generatedColors={generatePalette()}
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
                    class="px-6 py-2 rounded-lg transition-all duration-200 hover:opacity-90"
                    style={{
                      'background-color': theme().secondary,
                      color: calculateTextColor(theme().secondary)
                    }}
                    onClick={() => savePalette}
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
                  onApply={applyTheme}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;