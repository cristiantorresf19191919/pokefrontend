'use client';

import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
      light: '#f5f5f5',
      dark: '#e0e0e0',
      contrastText: '#0a0a0a',
    },
    secondary: {
      main: '#64b5f6',
      light: '#9be7ff',
      dark: '#1976d2',
      contrastText: '#0a0a0a',
    },
    background: {
      default: '#0a0a0f',
      paper: '#151520',
    },
    text: {
      primary: '#e8e8f0',
      secondary: '#b0b0c0',
    },
    divider: 'rgba(100, 181, 246, 0.12)',
    action: {
      active: '#64b5f6',
      hover: 'rgba(100, 181, 246, 0.08)',
      selected: 'rgba(100, 181, 246, 0.16)',
      disabled: 'rgba(255, 255, 255, 0.26)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
    },
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
      color: '#e8e8f0',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
      color: '#e8e8f0',
    },
    h3: {
      fontWeight: 600,
      color: '#e8e8f0',
    },
    h4: {
      fontWeight: 600,
      color: '#e8e8f0',
    },
    h5: {
      fontWeight: 600,
      color: '#e8e8f0',
    },
    h6: {
      fontWeight: 600,
      color: '#e8e8f0',
    },
    body1: {
      color: '#e8e8f0',
    },
    body2: {
      color: '#b0b0c0',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #0a0a0f 0%, #151520 100%)',
          minHeight: '100vh',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(145deg, #1a1a2e 0%, #151520 100%)',
          border: '1px solid rgba(100, 181, 246, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(100, 181, 246, 0.05)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            borderColor: 'rgba(100, 181, 246, 0.3)',
            boxShadow: '0 12px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(100, 181, 246, 0.15)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '10px 24px',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        contained: {
          background: 'linear-gradient(135deg, #64b5f6 0%, #42a5f5 100%)',
          boxShadow: '0 4px 16px rgba(100, 181, 246, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #7bc5f8 0%, #64b5f6 100%)',
            boxShadow: '0 6px 24px rgba(100, 181, 246, 0.4)',
            transform: 'translateY(-1px)',
          },
        },
        outlined: {
          borderColor: 'rgba(100, 181, 246, 0.5)',
          color: '#64b5f6',
          '&:hover': {
            borderColor: '#64b5f6',
            background: 'rgba(100, 181, 246, 0.1)',
            boxShadow: '0 4px 16px rgba(100, 181, 246, 0.2)',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          background: 'rgba(100, 181, 246, 0.05)',
          border: '1px solid rgba(100, 181, 246, 0.2)',
          borderRadius: 8,
          '&:hover': {
            borderColor: 'rgba(100, 181, 246, 0.4)',
          },
          '&.Mui-focused': {
            borderColor: '#64b5f6',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(145deg, #1a1a2e 0%, #151520 100%)',
          border: '1px solid rgba(100, 181, 246, 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            background: 'rgba(100, 181, 246, 0.05)',
            borderRadius: 8,
            '& fieldset': {
              borderColor: 'rgba(100, 181, 246, 0.2)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(100, 181, 246, 0.4)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#64b5f6',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          background: 'rgba(100, 181, 246, 0.15)',
          color: '#9be7ff',
          border: '1px solid rgba(100, 181, 246, 0.3)',
          '&:hover': {
            background: 'rgba(100, 181, 246, 0.25)',
          },
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: '#64b5f6',
        },
      },
    },
  },
});

export function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

