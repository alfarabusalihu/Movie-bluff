import { createTheme } from '@mui/material/styles';

/**
 * Creates MUI Theme for Light / Dark modes with rich aesthetic styling.
 * @param {'dark' | 'light'} mode 
 */
export const createAppTheme = (mode = 'dark') => {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#e50914', // Vibrant cinematic red
        light: '#ff454f',
        dark: '#b20710',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#00d2ff', // Cyan highlight
        light: '#6effff',
        dark: '#00a0cb',
        contrastText: '#0a0e17',
      },
      background: {
        default: isDark ? '#0f121d' : '#f4f6f9',
        paper: isDark ? '#181c2b' : '#ffffff',
      },
      text: {
        primary: isDark ? '#f0f3fc' : '#111827',
        secondary: isDark ? '#9da6c0' : '#4b5563',
      },
      divider: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
    },
    typography: {
      fontFamily: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
      h1: {
        fontWeight: 800,
        fontSize: '2.5rem',
        letterSpacing: '-0.02em',
      },
      h2: {
        fontWeight: 700,
        fontSize: '2rem',
        letterSpacing: '-0.01em',
      },
      h3: {
        fontWeight: 700,
        fontSize: '1.5rem',
      },
      h6: {
        fontWeight: 600,
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: isDark ? '#0f121d' : '#f4f6f9',
            color: isDark ? '#f0f3fc' : '#111827',
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: isDark ? '#0f121d' : '#f4f6f9',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: isDark ? '#2a3045' : '#cbd5e1',
              borderRadius: '4px',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? '#181c2b' : '#ffffff',
            backgroundImage: 'none',
            borderRadius: 14,
            boxShadow: isDark 
              ? '0 8px 24px rgba(0, 0, 0, 0.4)' 
              : '0 8px 24px rgba(0, 0, 0, 0.06)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            padding: '8px 20px',
          },
        },
      },
    },
  });
};

export default createAppTheme;
