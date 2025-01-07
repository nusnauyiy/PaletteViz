import { Component } from 'solid-js';
import { useTheme } from '../context/ThemeContext';
import { SavedPalettes } from './SavedPalettes';

type SavedPalettesSectionProps = {
  onApply: (colors: string[]) => void;
};

export const SavedPalettesSection: Component<SavedPalettesSectionProps> = (props) => {
  const { theme } = useTheme();

  return (
    <div
      class="p-6 rounded-xl sticky top-8 w-full"
      style={{
        'background-color': theme().accent,
        'border': `1px solid ${theme().border}`
      }}
    >
      <h2 class="text-xl font-semibold mb-6">Saved Palettes</h2>
      <SavedPalettes onApply={props.onApply} />
    </div>
  );
};