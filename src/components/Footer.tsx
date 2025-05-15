import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <AppBar
      position="fixed"
      sx={{
        top: 'auto',
        bottom: 0,
        backgroundColor: 'black',
        height: '30px',
        justifyContent: 'center', // vertically center content in toolbar
      }}
    >
      <Toolbar
        sx={{
          minHeight: '30px !important', // override default toolbar height
          display: 'flex',
          justifyContent: 'center', // center horizontally
          padding: 0,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: 'white',
            fontSize: '0.875rem', // smaller text size, ~14px
          }}
        >
          Copyright © 2025 Synsoft Global
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
