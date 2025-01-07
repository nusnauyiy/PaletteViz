import { hexToHSL, hslToHex } from './colorUtils';
import type { Theme } from '../types';

export const generateThemeFromColors = (
  colors: string[], 
  isDark: boolean
): Theme => {
  const primary = colors[0];
  const secondary = colors[1] || colors[0];
  const tertiary = colors[2] || secondary;
  const [h, s] = hexToHSL(primary);

  return {
    primary,
    secondary,
    background: isDark ? '#1A1A1A' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#2A2A2A',
    muted: tertiary || hslToHex(h, 0.3, 0.6),
    accent: isDark ? '#2D3748' : '#F5F7FA',
    border: isDark ? '#374151' : '#E5E7EB',
    isDark
  };
};