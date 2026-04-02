import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import HalfPage from './components/halfpage/halfpage.js';
import TextField from './components/textfield/textfield.js';
import Medium from './components/medium/medium.js';
import AppBar from './components/appbar/appbar.js';
import './app.css';

const App = () => {
  return (
    <div className="container">
      <AppBar />
      <div className="main">
        <HalfPage header="Markdown" background="#efffff">
          <TextField />
        </HalfPage>
        <HalfPage header="Medium" subheader="(paste into Medium editor)">
          <Medium />
        </HalfPage>
      </div>
      <Box
        component="footer"
        sx={{
          py: 1.5,
          px: 2,
          textAlign: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Free & open source{' · '}Made by{' '}
          <Link
            href="https://encryptioner.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            color="primary"
          >
            Ankur Mursalin
          </Link>
          {' · '}
          <Link
            href="https://www.supportkori.com/mirmursalinankur"
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            sx={{
              color: '#92400E',
              fontWeight: 600,
              background: 'rgba(245,158,11,0.12)',
              borderRadius: '4px',
              padding: '1px 6px',
              '&:hover': { background: 'rgba(245,158,11,0.22)', color: '#78350F' },
            }}
          >
            ☕ Buy me a coffee
          </Link>
        </Typography>
      </Box>
    </div>
  );
};

export default App;
