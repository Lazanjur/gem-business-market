import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { setCookie, destroyCookie, parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import api from '@/lib/api';

export interface User {
  id: string; email: string; company_name: string; verification_tier: string; regulatory_regime: string; entity_type: string;
}

interface AuthContextType {
  user: User | null; token: string | null; isAuthenticated: boolean; isLoading: boolean;
  login: (email: string, password_hash: string) => Promise<void>; logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const hydrateSession = async () => {
      const cookies = parseCookies();
      if (cookies['ib_token']) {
        setToken(cookies['ib_token']);
        try {
          const res = await api.get<User>('/auth/me');
          setUser(res.data);
        } catch { logout(); }
      }
      setIsLoading(false);
    };
    hydrateSession();
  }, []);

  const login = async (email: string, password_hash: string) => {
    try {
      const res = await api.post('/auth/login', { email, password_hash });
      setCookie(null, 'ib_token', res.data.access_token, { maxAge: 2592000, path: '/', secure: true, sameSite: 'lax' });
      setToken(res.data.access_token); setUser(res.data.user);
      router.push('/dashboard/marketplace');
    } catch (err: any) { throw new Error(err.response?.data?.message || 'Login failed.'); }
  };

  const logout = () => { destroyCookie(null, 'ib_token', { path: '/' }); setToken(null); setUser(null); router.push('/login'); };

  return <AuthContext.Provider value={{ user, token, isAuthenticated: !!user && !!token, isLoading, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
