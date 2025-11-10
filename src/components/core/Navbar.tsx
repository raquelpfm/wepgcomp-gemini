import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/entities';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout, hasRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardPath = () => {
    if(hasRole([UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.COORDINATOR])) return "/admin";
    if(hasRole([UserRole.STUDENT])) return "/student-dashboard";
    if(hasRole([UserRole.PROFESSOR])) return "/"; // Professors might not have a specific dashboard
    return "/";
  }

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
        >
          WEPGCOMP
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Página Inicial
          </Button>
          {/* Add other public links here if needed */}
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        {isAuthenticated ? (
          <Box>
            <Button color="inherit" component={RouterLink} to={getDashboardPath()}>
              Dashboard
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Sair
            </Button>
          </Box>
        ) : (
          <Box>
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
            <Button color="inherit" component={RouterLink} to="/register">
              Cadastrar
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
