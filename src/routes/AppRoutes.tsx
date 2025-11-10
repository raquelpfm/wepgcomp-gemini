import { Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/Public/HomePage';
import LoginPage from '@/pages/Auth/LoginPage';
import RegisterPage from '@/pages/Auth/RegisterPage';
import EmailConfirmationPage from '@/pages/Auth/EmailConfirmationPage';
import AdminDashboard from '@/pages/Admin/AdminDashboard';
import StudentDashboard from '@/pages/Student/StudentDashboard';
import PresentationDetail from '@/pages/Public/PresentationDetail';
import ProtectedRoute from './ProtectedRoute';
import { UserRole } from '@/types/entities';
import { Box, Typography } from '@mui/material';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/confirm-email/:token" element={<EmailConfirmationPage />} />
      <Route path="/presentations/:id" element={<PresentationDetail />} />
      <Route path="/registration-pending" element={<MessagePage title="Cadastro em Processo" message="Enviamos um e-mail de confirmação para você. Por favor, verifique sua caixa de entrada para completar o cadastro." />} />
      <Route path="/approval-pending" element={<MessagePage title="Cadastro Pendente de Aprovação" message="Sua solicitação de cadastro como professor foi recebida e está aguardando aprovação de um administrador." />} />
      <Route path="/unauthorized" element={<MessagePage title="Acesso Negado" message="Você não tem permissão para acessar esta página." />} />


      {/* Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.COORDINATOR]} />}>
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={[UserRole.STUDENT]} />}>
        <Route path="/student-dashboard" element={<StudentDashboard />} />
      </Route>
      
      {/* Fallback Route */}
      <Route path="*" element={<MessagePage title="Página Não Encontrada" message="A página que você está procurando não existe." />} />
    </Routes>
  );
};

const MessagePage = ({title, message}: {title: string, message: string}) => (
    <Box textAlign="center" mt={10}>
        <Typography variant="h4" gutterBottom>{title}</Typography>
        <Typography variant="body1">{message}</Typography>
    </Box>
);


export default AppRoutes;
