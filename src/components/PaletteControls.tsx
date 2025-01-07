import { Component } from 'solid-js';
import type { Theme } from '../types';
import { ColorDisplay } from './ColorDisplay';

type PaletteControlsProps = {
    baseColor: string;
    paletteType: string;
    onBaseColorChange: (color: string) => void;
    onPaletteTypeChange: (type: string) => void;
    theme: Theme;
    generatedColors: string[]; 
}

export const PaletteControls: Component<PaletteControlsProps> = (props) => {
    return (
        <div class="space-y-6">
            <div class="flex flex-wrap gap-4 items-center">
                <div class="flex-1 min-w-[200px]">
                    <label class="block text-sm font-medium mb-2">Base Color</label>
                    <input
                        type="color"
                        value={props.baseColor}
                        onChange={(e) => props.onBaseColorChange(e.currentTarget.value)}
                        class="w-full h-10 rounded-lg cursor-pointer"
                    />
                </div>
                <div class="flex-1 min-w-[200px]">
                    <label class="block text-sm font-medium mb-2">Palette Type</label>
                    <select
                        value={props.paletteType}
                        onChange={(e) => props.onPaletteTypeChange(e.currentTarget.value)}
                        class="w-full h-10 px-3 rounded-lg border bg-white" // Added bg-white
                        style={{
                            'border-color': props.theme.border,
                            'color': props.theme.text, // Add text color
                            'background-color': props.theme.background // Add background color
                        }}
                    >
                        <option value="complementary">Complementary</option>
                        <option value="monochromatic">Monochromatic</option>
                        <option value="triadic">Triadic</option>
                    </select>

                </div>
            </div>

            <div>
                <h2 class="text-xl font-semibold mb-6">Generated Palette</h2>
                <ColorDisplay colors={props.generatedColors} theme={props.theme} />
            </div>
        </div>
    );
};