export type Theme = {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    muted: string;     
    accent: string;   
    border: string;   
  };
  
  export type SavedPalette = {
    id: number;
    colors: string[];
    timestamp: string;
  }