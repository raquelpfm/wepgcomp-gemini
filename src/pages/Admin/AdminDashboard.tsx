import React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { Routes, Route, Link as RouterLink } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import AdminUsers from './AdminUsers';
import AdminPresentations from './AdminPresentations';
import AdminEvents from './AdminEvents';

const drawerWidth = 240;

const AdminDashboard: React.FC = () => {
  const menuItems = [
    { text: 'Gerenciar Usuários', icon: <PeopleIcon />, path: '/admin/users' },
    { text: 'Gerenciar Apresentações', icon: <SlideshowIcon />, path: '/admin/presentations' },
    { text: 'Gerenciar Evento', icon: <EventIcon />, path: '/admin/events' },
    // Add more admin sections here
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component={RouterLink} to={item.path}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Routes>
            <Route path="/" element={<Typography variant="h5">Bem-vindo ao Painel de Administração</Typography>} />
            <Route path="/users" element={<AdminUsers />} />
            <Route path="/presentations" element={<AdminPresentations />} />
            <Route path="/events" element={<AdminEvents />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
