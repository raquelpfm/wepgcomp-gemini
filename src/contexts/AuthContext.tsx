import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { User, UserRole } from '@/types/entities';
import { LoginCredentials, RegisterPayload } from '@/services/authService';
import * as authService from '@/services/authService';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  hasRole: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      setIsLoading(true);
      try {
        // This function would ideally verify the token with the backend
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
        localStorage.removeItem('authToken');
      } finally {
        setIsLoading(false);
      }
    };
    checkUser();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const loggedInUser = await authService.login(credentials);
    setUser(loggedInUser);
    navigate(getDashboardPath(loggedInUser.role));
  };

  const register = async (payload: RegisterPayload) => {
    await authService.register(payload);
    // After registration, user needs to confirm email, so redirect to a confirmation message page
    navigate('/registration-pending');
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    navigate('/login');
  };

  const hasRole = (roles: UserRole[]) => {
    return user ? roles.includes(user.role) : false;
  };

  const getDashboardPath = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
      case UserRole.SUPER_ADMIN:
      case UserRole.COORDINATOR:
        return '/admin';
      case UserRole.STUDENT:
        return '/student-dashboard';
      default:
        return '/';
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
