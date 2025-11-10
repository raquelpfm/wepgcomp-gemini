import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import * as authService from '@/services/authService';

const EmailConfirmationPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const confirmEmail = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Token de confirmação inválido ou ausente.');
        return;
      }

      try {
        // FUNC03, FUNC07: The UI part of handling the confirmation link
        await authService.confirmEmail(token);
        setStatus('success');
        setMessage('Seu e-mail foi confirmado com sucesso! Você será redirecionado para a página de login em 5 segundos.');
        
        setTimeout(() => {
          navigate('/login');
        }, 5000);

      } catch (error: any) {
        setStatus('error');
        setMessage(error.message || 'Ocorreu um erro ao confirmar seu e-mail. O link pode ter expirado.');
      }
    };

    confirmEmail();
  }, [token, navigate]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Confirmação de Cadastro
        </Typography>
        {status === 'loading' && <CircularProgress />}
        {status === 'success' && <Alert severity="success">{message}</Alert>}
        {status === 'error' && <Alert severity="error">{message}</Alert>}
      </Box>
    </Container>
  );
};

export default EmailConfirmationPage;
