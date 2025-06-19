import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      lightBlue: string;
      textBlue: string;
      background: string;
    };
  }
  interface PaletteOptions {
    custom: {
      lightBlue: string;
      textBlue: string;
      background: string;
    };
  }
}

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0cadc9',
    },
    secondary: {
      main: '#ffde59',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
        primary: '#202326',
        secondary: '#6D6F73',
        disabled: '#9e9e9e', // Texto desabilitado
    },
    custom: {
        lightBlue: '#86d4e1',
        textBlue: '#047b8f',
        background: '#F5F6F9'
    },
  },
  typography: {
    fontFamily: 'Nunito',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme;
