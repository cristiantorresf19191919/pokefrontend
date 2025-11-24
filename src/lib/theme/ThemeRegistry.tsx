'use client';

import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { PRIMARY_COLOR, GRAYSCALE } from './pokemonTypes';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: PRIMARY_COLOR,
      light: '#FF3D4F',
      dark: '#B0081F',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: GRAYSCALE.medium,
      light: GRAYSCALE.light,
      dark: GRAYSCALE.dark,
      contrastText: '#FFFFFF',
    },
    background: {
      default: GRAYSCALE.white,
      paper: GRAYSCALE.white,
    },
    text: {
      primary: GRAYSCALE.dark,
      secondary: GRAYSCALE.medium,
    },
    divider: GRAYSCALE.light,
    action: {
      active: PRIMARY_COLOR,
      hover: 'rgba(220, 10, 45, 0.08)',
      selected: 'rgba(220, 10, 45, 0.12)',
      disabled: GRAYSCALE.light,
      disabledBackground: GRAYSCALE.background,
    },
  },
  typography: {
    fontFamily: 'var(--font-poppins), "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
      fontWeight: 700,
      fontSize: '24px',
      lineHeight: '32px',
      color: GRAYSCALE.dark,
    },
    h2: {
      fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
      fontWeight: 700,
      fontSize: '20px',
      lineHeight: '28px',
      color: GRAYSCALE.dark,
    },
    h3: {
      fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
      fontWeight: 700,
      fontSize: '18px',
      lineHeight: '24px',
      color: GRAYSCALE.dark,
    },
    h4: {
      fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
      fontWeight: 700,
      fontSize: '16px',
      lineHeight: '22px',
      color: GRAYSCALE.dark,
    },
    h5: {
      fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
      fontWeight: 600,
      fontSize: '14px',
      lineHeight: '20px',
      color: GRAYSCALE.dark,
    },
    h6: {
      fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
      fontWeight: 600,
      fontSize: '12px',
      lineHeight: '16px',
      color: GRAYSCALE.dark,
    },
    body1: {
      fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '16px',
      color: GRAYSCALE.dark,
    },
    body2: {
      fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '16px',
      color: GRAYSCALE.medium,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: GRAYSCALE.white,
          minHeight: '100vh',
          fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: GRAYSCALE.white,
          borderRadius: 8,
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)', // 2dp drop shadow
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)', // 6dp drop shadow
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
          borderRadius: 8,
          padding: '10px 24px',
          fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        contained: {
          backgroundColor: PRIMARY_COLOR,
          color: GRAYSCALE.white,
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)',
          '&:hover': {
            backgroundColor: '#B0081F',
            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)',
          },
        },
        outlined: {
          borderColor: GRAYSCALE.medium,
          color: GRAYSCALE.dark,
          '&:hover': {
            borderColor: PRIMARY_COLOR,
            backgroundColor: 'rgba(220, 10, 45, 0.08)',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: GRAYSCALE.white,
          borderRadius: 8,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: GRAYSCALE.light,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: GRAYSCALE.medium,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: PRIMARY_COLOR,
            borderWidth: 2,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: GRAYSCALE.white,
          borderRadius: 8,
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: GRAYSCALE.white,
            borderRadius: 8,
            fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
            '& fieldset': {
              borderColor: GRAYSCALE.light,
            },
            '&:hover fieldset': {
              borderColor: GRAYSCALE.medium,
            },
            '&.Mui-focused fieldset': {
              borderColor: PRIMARY_COLOR,
              borderWidth: 2,
            },
            '& input': {
              color: GRAYSCALE.dark,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
          fontWeight: 500,
          borderRadius: 8,
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: PRIMARY_COLOR,
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

