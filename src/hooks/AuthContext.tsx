import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname  } from 'next/navigation';

type AuthContextType = {
  isAuthenticated: boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('@NativePay:token');
    setIsAuthenticated(!!token);
  }, []);

  const logout = () => {
    localStorage.removeItem('@NativePay:token');
    setIsAuthenticated(false);
    //router.push('/');
  };

  useEffect(() => {
    const publicPaths = ['/forms/form-elements','/forms/completion'];

    if (!isAuthenticated && !publicPaths.includes(pathname)) {
      router.push('/');
    }
  }, [isAuthenticated, pathname, router]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
