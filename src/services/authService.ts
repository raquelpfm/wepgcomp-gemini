import apiClient from './api';
import { User, UserRole } from '@/types/entities';

// This is a mock database for demonstration purposes
const MOCK_USERS: User[] = [
    { id: 'admin-01', name: 'Super Admin', email: 'admin@ufba.br', role: UserRole.SUPER_ADMIN, is_approved: true },
    { id: 'prof-01', name: 'Carlos Professor', email: 'carlos@ufba.br', role: UserRole.PROFESSOR, is_approved: false },
    { id: 'student-01', name: 'Ana Doutoranda', email: 'ana@ufba.br', role: UserRole.STUDENT, is_approved: true },
];

// Types for API payloads
export interface LoginCredentials {
  email: string;
  password?: string;
}

export enum UserType {
    LISTENER = 'LISTENER',
    STUDENT = 'STUDENT',
    PROFESSOR = 'PROFESSOR',
}

export interface RegisterPayload {
  name: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  user_type: UserType;
  ufba_id?: string;
}


// --- Mock API Functions ---

// FUNC01, FUNC05: Register user
export const register = async (payload: RegisterPayload): Promise<User> => {
  console.log('Simulating user registration:', payload);
  // Simulate backend validation and user creation
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (MOCK_USERS.some(u => u.email === payload.email)) {
        reject(new Error('Este e-mail já está em uso.'));
        return;
      }
      // FUNC03, FUNC07: Simulate sending confirmation email
      console.log(`Simulating sending confirmation email to ${payload.email}`);
      resolve({} as User); // Return empty object, user needs to confirm email
    }, 1000);
  });
};

// FUNC03, FUNC07: Confirm email
export const confirmEmail = async (token: string): Promise<void> => {
    console.log(`Simulating email confirmation with token: ${token}`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (token === 'invalid-token') {
                reject(new Error('Token inválido ou expirado.'));
                return;
            }
            resolve();
        }, 1000);
    });
}


export const login = async (credentials: LoginCredentials): Promise<User> => {
  console.log('Simulating login for:', credentials.email);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = MOCK_USERS.find(u => u.email === credentials.email);
      if (!user) {
        reject(new Error('E-mail ou senha inválidos.'));
        return;
      }
      // FUNC04, FUNC17: Check if professor is approved
      if (user.role === UserRole.PROFESSOR && !user.is_approved) {
        reject(new Error('Cadastro pendente de aprovação.'));
        return;
      }
      // Simulate successful login
      const token = 'mock-auth-token';
      localStorage.setItem('authToken', token);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      resolve(user);
    }, 1000);
  });
};

export const logout = (): void => {
  localStorage.removeItem('authToken');
  delete apiClient.defaults.headers.common['Authorization'];
};

export const getCurrentUser = async (): Promise<User | null> => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        return Promise.resolve(null);
    }
    // In a real app, you'd verify the token with the backend.
    // Here, we'll just return a mock user if a token exists.
    return new Promise((resolve) => {
        setTimeout(() => {
            // For demonstration, let's assume the token belongs to the admin user
            resolve(MOCK_USERS[0]);
        }, 500);
    });
}
