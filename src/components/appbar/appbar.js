import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Bar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          component="img"
          src={`${process.env.PUBLIC_URL}/logo-white.svg`}
          alt="Markdown to Medium Logo"
          sx={{
            height: 40,
            width: 40,
            mr: 2,
          }}
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Markdown to Medium
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Bar;
