import { Theme } from '../types';

export const createStyles = (theme: Theme) => ({
  // Common styles that can be reused across components
  container: {
    backgroundColor: theme.background,
    color: theme.text,
  },
  card: {
    backgroundColor: theme.accent,
    border: `1px solid ${theme.border}`,
    borderRadius: '0.75rem',
    padding: '1.5rem',
  },
  button: {
    primary: {
      backgroundColor: theme.primary,
      color: '#FFFFFF',
      borderRadius: '0.5rem',
      padding: '0.5rem 1rem',
      transition: 'opacity 200ms',
      '&:hover': {
        opacity: 0.9,
      },
    },
    secondary: {
      backgroundColor: theme.secondary,
      color: '#FFFFFF',
      borderRadius: '0.5rem',
      padding: '0.5rem 1rem',
      transition: 'opacity 200ms',
      '&:hover': {
        opacity: 0.9,
      },
    },
  },
});