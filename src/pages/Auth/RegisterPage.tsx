import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { RegisterPayload, UserType } from '@/services/authService';

const RegisterPage: React.FC = () => {
  const {
    register: registerUser,
    isLoading,
  } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterPayload>();
  const [serverError, setServerError] = useState<string | null>(null);

  const userType = watch('user_type', UserType.LISTENER);

  const onSubmit: SubmitHandler<RegisterPayload> = async (data: RegisterPayload) => {
    setServerError(null);
    if (data.password !== data.confirmPassword) {
      setServerError('As senhas não coincidem.');
      return;
    }
    try {
      await registerUser(data);
      // The AuthProvider will navigate to /registration-pending on success
    } catch (error: any) {
      setServerError(error.message || 'Falha ao tentar registrar. Tente novamente.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4">
          Criar Conta
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          {serverError && <Alert severity="error">{serverError}</Alert>}

          {/* FUNC05: Listener can register with any email */}
          <FormControl fullWidth margin="normal" error={!!errors.user_type}>
            <InputLabel id="user-type-label">Tipo de Usuário</InputLabel>
            <Select
              labelId="user-type-label"
              id="user_type"
              label="Tipo de Usuário"
              defaultValue={UserType.LISTENER}
              {...register('user_type', { required: 'Tipo de usuário é obrigatório' })}
            >
              <MenuItem value={UserType.LISTENER}>Ouvinte</MenuItem>
              <MenuItem value={UserType.STUDENT}>Doutorando(a) PGCOMP</MenuItem>
              <MenuItem value={UserType.PROFESSOR}>Professor(a) PGCOMP</MenuItem>
            </Select>
            {errors.user_type && <FormHelperText>{errors.user_type.message}</FormHelperText>}
          </FormControl>

          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nome Completo"
            autoComplete="name"
            autoFocus
            {...register('name', { required: 'Nome é obrigatório' })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          {/* FUNC01 & FUNC02: UFBA email validation is suggested by placeholder */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Endereço de E-mail"
            type="email"
            autoComplete="email"
            placeholder={userType !== UserType.LISTENER ? 'use seu e-mail @ufba.br' : 'seu@email.com'}
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

          {/* FUNC01: UFBA ID for students/professors */}
          {(userType === UserType.STUDENT || userType === UserType.PROFESSOR) && (
            <TextField
              margin="normal"
              required
              fullWidth
              id="ufba_id"
              label="Matrícula UFBA"
              {...register('ufba_id', { required: 'Matrícula é obrigatória' })}
              error={!!errors.ufba_id}
              helperText={errors.ufba_id?.message}
            />
          )}

          {/* FUNC06: Strong password */}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Senha"
            type="password"
            id="password"
            autoComplete="new-password"
            {...register('password', {
              required: 'Senha é obrigatória',
              minLength: {
                value: 8,
                message: 'A senha deve ter no mínimo 8 caracteres',
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message || "A senha deve conter letras, números e símbolos."}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirmar Senha"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            {...register('confirmPassword', { required: 'Confirmação de senha é obrigatória' })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? 'Registrando...' : 'Registrar'}
          </Button>
          <Box textAlign="center">
            <RouterLink to="/login">
              Já tem uma conta? Faça login
            </RouterLink>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
