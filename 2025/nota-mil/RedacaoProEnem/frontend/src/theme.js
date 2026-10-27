import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6C63FF',
      contrastText: '#fff',
    },
    secondary: {
      main: '#FFD600',
    },
    background: {
      default: '#f7f9fb',
      paper: '#fff',
    },
    info: {
      main: '#43a047',
    },
    text: {
      primary: '#222',
      secondary: '#6c757d',
    },
  },
  shape: {
    borderRadius: 18,
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
    h3: {
      fontWeight: 700,
      letterSpacing: 1,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 8px 32px rgba(108,99,255,0.08)',
        },
      },
    },
  },
});

export default theme;
