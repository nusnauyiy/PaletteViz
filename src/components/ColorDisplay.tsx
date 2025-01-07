import { Component } from 'solid-js';
import { useTheme } from '../context/ThemeContext';

type ColorDisplayProps = {
  colors: string[];
  onColorClick?: (color: string) => void;
}

export const ColorDisplay: Component<ColorDisplayProps> = (props) => {
  const { theme } = useTheme();

  return (
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {props.colors.map((color) => (
        <div 
          class="rounded-lg overflow-hidden"
          style={{ 'border': `1px solid ${theme().border}` }}
        >
          <div 
            class="h-24 w-full cursor-pointer transition-transform hover:scale-105"
            style={{ 'background-color': color }}
            onClick={() => props.onColorClick?.(color)}
          />
          <div 
            class="text-center py-2 px-2 text-sm font-mono"
            style={{ 'background-color': theme().background }}
          >
            {color.toUpperCase()}
          </div>
        </div>
      ))}
    </div>
  );
};