import { Component, createSignal } from 'solid-js';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { PaletteProvider, usePalette } from './context/PaletteContext';
import { Header } from './components/Header';
import { PaletteGenerator } from './components/PaletteGenerator';
import { SavedPalettesSection } from './components/SavedPalettesSection';
import { ThemeToggle } from './components/ThemeToggle';
import { generatePalette } from './utils/paletteGenerators';
import { generateThemeFromColors } from './utils/themeGenerator';

const App: Component = () => {
  return (
    <ThemeProvider>
      <PaletteProvider>
        <AppContent />
      </PaletteProvider>
    </ThemeProvider>
  );
};

const AppContent: Component = () => {
  const { theme, setTheme } = useTheme();
  const { savePalette } = usePalette();
  const [paletteType, setPaletteType] = createSignal('complementary');
  const [baseColor, setBaseColor] = createSignal(theme().primary);

  const generatedColors = () => generatePalette(baseColor(), paletteType());

  const applyTheme = (colors: string[]) => {
    setTheme(generateThemeFromColors(colors, theme().isDark));
  };

  return (
    <div
      class="min-h-screen w-screen overflow-x-hidden transition-colors duration-200"
      style={{
        'background-color': theme().background,
        color: theme().text
      }}
    >
      <Header />

      <div class="w-full px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2 space-y-8">
              <PaletteGenerator
                baseColor={baseColor()}
                paletteType={paletteType()}
                onBaseColorChange={setBaseColor}
                onPaletteTypeChange={setPaletteType}
                generatedColors={generatedColors()}
                onApply={applyTheme}
                onSave={savePalette}
              />
            </div>

            <div class="w-full">
              <SavedPalettesSection onApply={applyTheme} />
            </div>
          </div>
        </div>
      </div>
      <ThemeToggle />
    </div>
  );
};

export default App;