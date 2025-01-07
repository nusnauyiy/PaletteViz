import { Component, createSignal, createEffect } from 'solid-js';
import { useTheme } from '../context/ThemeContext';
import { PaletteControls } from './PaletteControls';

type PaletteGeneratorProps = {
  baseColor: string;
  paletteType: string;
  onBaseColorChange: (color: string) => void;
  onPaletteTypeChange: (type: string) => void;
  generatedColors: string[];
  onApply: (colors: string[]) => void;
  onSave: (colors: string[]) => void;
};

export const PaletteGenerator: Component<PaletteGeneratorProps> = (props) => {
  const { theme } = useTheme();
  const [currentColors, setCurrentColors] = createSignal(props.generatedColors);

  createEffect(() => {
    setCurrentColors(props.generatedColors);
  });

  return (
    <div
      class="p-6 rounded-xl w-full"
      style={{
        'background-color': theme().accent,
        'border': `1px solid ${theme().border}`
      }}
    >
      <PaletteControls
        baseColor={props.baseColor}
        paletteType={props.paletteType}
        onBaseColorChange={props.onBaseColorChange}
        onPaletteTypeChange={props.onPaletteTypeChange}
        generatedColors={props.generatedColors}
        onColorsChange={setCurrentColors}
      />

      <div class="flex gap-4 mt-6">
        <button
          class="px-6 py-2 rounded-lg transition-all duration-200 hover:opacity-90"
          style={{
            'background-color': theme().primary,
            color: theme().background
          }}
          onClick={() => props.onApply(currentColors())}
        >
          Apply to Website
        </button>
        <button
          class="px-6 py-2 rounded-lg transition-all duration-200 hover:opacity-90"
          style={{
            'background-color': theme().secondary,
            color: theme().background
          }}
          onClick={() => props.onSave(currentColors())}
        >
          Save Palette
        </button>
      </div>
    </div>
  );
};