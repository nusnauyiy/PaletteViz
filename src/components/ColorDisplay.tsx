import { Component, createSignal, For, createEffect } from 'solid-js';
import { useTheme } from '../context/ThemeContext';
import { BiRegularReset } from 'solid-icons/bi';

type ColorDisplayProps = {
  colors: string[];
  onChange?: (colors: string[]) => void;
  originalColors?: string[];
}

export const ColorDisplay: Component<ColorDisplayProps> = (props) => {
  const { theme } = useTheme();
  const [editingIndex, setEditingIndex] = createSignal<number | null>(null);
  const [currentColors, setCurrentColors] = createSignal(props.colors);

  createEffect(() => {
    setCurrentColors(props.colors);
  });

  const handleColorChange = (index: number, newColor: string) => {
    const newColors = [...currentColors()];
    newColors[index] = newColor;
    setCurrentColors(newColors);
    props.onChange?.(newColors);
  };

  const resetColor = (index: number) => {
    if (props.originalColors) {
      const newColors = [...currentColors()];
      newColors[index] = props.originalColors[index];
      setCurrentColors(newColors);
      props.onChange?.(newColors);
    }
  };

  return (
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <For each={currentColors()}>
        {(color, index) => (
          <div 
            class="rounded-lg overflow-hidden space-y-2"
            style={{ 'border': `1px solid ${theme().border}` }}
          >
            <div class="relative">
              <div 
                class="h-24 w-full cursor-pointer transition-transform hover:scale-105"
                style={{ 'background-color': color }}
                onClick={() => setEditingIndex(index() === editingIndex() ? null : index())}
              />
              {props.originalColors && color !== props.originalColors[index()] && (
                <button
                  class="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    resetColor(index());
                  }}
                  title="Reset to original color"
                >
                  <BiRegularReset size={16} />
                </button>
              )}
            </div>
            {editingIndex() === index() && (
              <div class="px-2 pb-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => handleColorChange(index(), e.currentTarget.value)}
                  class="w-full h-8 rounded cursor-pointer"
                />
              </div>
            )}
            <div 
              class="text-center py-2 px-2 text-sm font-mono"
              style={{ 'background-color': theme().background }}
            >
              {color.toUpperCase()}
            </div>
          </div>
        )}
      </For>
    </div>
  );
};