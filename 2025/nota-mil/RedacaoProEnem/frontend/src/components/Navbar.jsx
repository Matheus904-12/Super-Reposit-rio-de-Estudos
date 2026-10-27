import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Avatar } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

export default function Navbar() {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderBottom: '1px solid #eee',
        zIndex: 1201,
        left: 0,
        right: 0,
        top: 0,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: 72 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <SchoolIcon sx={{ fontSize: 32, color: 'primary.main' }} />
          <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: 1 }}>
            RedaçãoProEnem
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button variant="contained" sx={{ borderRadius: 8, boxShadow: 'none', bgcolor: 'primary.main', color: '#fff', fontWeight: 600 }}>
            Tela Inicial
          </Button>
          <Button variant="text" sx={{ fontWeight: 600, color: 'text.primary' }}>
            Análise de Redação
          </Button>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <NotificationsNoneIcon />
          </IconButton>
          <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>P</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
