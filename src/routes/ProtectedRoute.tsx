import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/entities';
import { Box, CircularProgress } from '@mui/material';

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, user, isLoading, hasRole } = useAuth();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Specific check for professor approval
  if (user?.role === UserRole.PROFESSOR && !user.is_approved) {
      return <Navigate to="/approval-pending" replace />;
  }

  return hasRole(allowedRoles) ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};

export default ProtectedRoute;
