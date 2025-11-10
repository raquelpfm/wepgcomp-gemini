import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { LoginCredentials } from '@/services/authService';

const LoginPage: React.FC = () => {
  const { login, isLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>();
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LoginCredentials> = async (data: LoginCredentials) => {
    setServerError(null);
    try {
      await login(data);
      // On success, the AuthProvider will handle navigation
    } catch (error: any) {
      // FUNC04, FUNC17: Blocked login attempt
      if (error.message.includes('pending approval')) {
          setServerError('Seu cadastro ainda está pendente de aprovação pelo administrador.');
      } else {
          setServerError(error.message || 'E-mail ou senha inválidos.');
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          my: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4">
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          {serverError && <Alert severity="error">{serverError}</Alert>}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Endereço de E-mail"
            autoComplete="email"
            autoFocus
            {...register('email', {
              required: 'E-mail é obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Endereço de e-mail inválido',
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register('password', { required: 'Senha é obrigatória' })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
          <Box textAlign="center">
            <RouterLink to="/register">
              Não tem uma conta? Cadastre-se
            </RouterLink>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
