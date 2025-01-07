export interface Theme {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    muted: string;
    accent: string;
    border: string;
    isDark: boolean; // Add this to track theme mode
}

export type SavedPalette = {
    id: number;
    colors: string[];
    timestamp: string;
}