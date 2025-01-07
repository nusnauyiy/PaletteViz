import { Component, For } from 'solid-js';
import { useTheme } from '../context/ThemeContext';
import { usePalette } from '../context/PaletteContext';
import { calculateTextColor } from '../utils/colorUtils';

type SavedPalettesProps = {
    onApply: (colors: string[]) => void;
};

export const SavedPalettes: Component<SavedPalettesProps> = (props) => {
    const { theme } = useTheme();
    const { savedPalettes, removePalette } = usePalette();

    return (
        <div class="space-y-4">
            <For each={savedPalettes()}>
                {(palette) => (
                    <div
                        class="rounded-lg overflow-hidden hover:shadow-sm transition-shadow"
                        style={{ 'border': `1px solid ${theme().border}` }}
                    >
                        <div class="flex items-center">
                            {/* Color Display */}
                            <div class="flex-1 flex h-12">
                                <For each={palette.colors}>
                                    {(color) => (
                                        <div
                                            class="flex-1"
                                            style={{ 'background-color': color }}
                                        />
                                    )}
                                </For>
                            </div>

                            {/* Buttons and Date*/}
                            <div class="hidden md:flex items-center gap-2 px-3">
                                <span class="text-sm text-gray-500">
                                    {new Date(palette.timestamp).toLocaleDateString()}
                                </span>
                                <button
                                    class="px-4 py-1.5 rounded-lg text-sm transition-all duration-200 hover:opacity-90"
                                    style={{
                                        'background-color': theme().primary,
                                        color: calculateTextColor(theme().primary)
                                    }}
                                    onClick={() => props.onApply(palette.colors)}
                                >
                                    Apply
                                </button>
                                <button
                                    class="px-4 py-1.5 rounded-lg text-sm transition-all duration-200 hover:opacity-90"
                                    style={{
                                        'background-color': theme().secondary,
                                        color: calculateTextColor(theme().secondary)
                                    }}
                                    onClick={() => removePalette(palette.id)}
                                >
                                    Remove
                                </button>
                            </div>

                            {/* Mobile layout */}
                            <div class="md:hidden p-3 space-y-2 w-full">
                                <span class="text-sm text-gray-500 block">
                                    {new Date(palette.timestamp).toLocaleDateString()}
                                </span>
                                <div class="flex gap-2">
                                    <button
                                        class="flex-1 py-1.5 rounded-lg text-sm transition-all duration-200"
                                        style={{
                                            'background-color': theme().primary,
                                            color: calculateTextColor(theme().primary)
                                        }}
                                        onClick={() => props.onApply(palette.colors)}
                                    >
                                        Apply
                                    </button>
                                    <button
                                        class="flex-1 py-1.5 rounded-lg text-sm transition-all duration-200"
                                        style={{
                                            'background-color': theme().secondary,
                                            color: calculateTextColor(theme().secondary)
                                        }}
                                        onClick={() => removePalette(palette.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </For>
        </div>
    );
};