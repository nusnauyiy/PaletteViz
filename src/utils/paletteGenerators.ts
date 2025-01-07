import { hexToHSL, hslToHex } from './colorUtils';

export const generatePalette = (baseColor: string, paletteType: string) => {
  const [h, s, l] = hexToHSL(baseColor);

  switch (paletteType) {
    case 'complementary':
      return [
        baseColor,
        hslToHex((h + 0.5) % 1, s, l)
      ];
    case 'monochromatic':
      return [
        baseColor,
        hslToHex(h, s, Math.max(0.1, l - 0.3)),
        hslToHex(h, s, Math.min(0.9, l + 0.2)),
        hslToHex(h, Math.min(1, s + 0.2), l),
        hslToHex(h, Math.max(0, s - 0.2), l)
      ];
    case 'triadic':
      return [
        baseColor,
        hslToHex((h + 1 / 3) % 1, s, l),
        hslToHex((h + 2 / 3) % 1, s, l)
      ];
    default:
      return [baseColor];
  }
};