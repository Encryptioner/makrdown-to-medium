import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import App from './app.js';
import { store } from './state.js';
import './index.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00ab6c',
    },
  },
});

const WrappedApp = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<WrappedApp />);
