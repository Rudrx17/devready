import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('devready_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('devready_token'));
  const [loading, setLoading] = useState(true);

  // Validate token and fetch /api/me on startup if backend is available
  useEffect(() => {
    const verifyAuth = async () => {
      const storedToken = localStorage.getItem('devready_token');
      if (storedToken && storedToken !== 'demo-preview-jwt-token') {
        try {
          const res = await api.get('/me');
          setUser(res.data);
          localStorage.setItem('devready_user', JSON.stringify(res.data));
        } catch (err) {
          console.warn('Backend not reachable or token expired:', err);
          if (err.response?.status === 401) {
            logout();
          }
        }
      }
      setLoading(false);
    };

    verifyAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token: jwtToken } = res.data;
      localStorage.setItem('devready_token', jwtToken);
      setToken(jwtToken);

      const meRes = await api.get('/me', {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      setUser(meRes.data);
      localStorage.setItem('devready_user', JSON.stringify(meRes.data));
      return meRes.data;
    } catch (err) {
      // If backend is offline or network error, provide local session login
      if (!err.response || err.response.status >= 500) {
        console.info('Backend is offline. Proceeding with local dev session.');
        const localUser = {
          id: Date.now(),
          fullName: email.split('@')[0].replace('.', ' '),
          email: email,
          role: 'STUDENT',
          yearOfStudy: 4,
        };
        const localToken = 'demo-preview-jwt-token';
        localStorage.setItem('devready_token', localToken);
        localStorage.setItem('devready_user', JSON.stringify(localUser));
        setToken(localToken);
        setUser(localUser);
        return localUser;
      }
      throw err;
    }
  };

  const register = async ({ fullName, email, password, yearOfStudy }) => {
    try {
      await api.post('/auth/register', {
        fullName,
        email,
        password,
        yearOfStudy: parseInt(yearOfStudy, 10),
      });
      return await login(email, password);
    } catch (err) {
      // If backend is offline or network error, seamlessly register locally
      if (!err.response || err.response.status >= 500) {
        console.info('Backend is offline. Registering local dev session.');
        const localUser = {
          id: Date.now(),
          fullName: fullName || 'Ankita Utture',
          email: email,
          role: 'STUDENT',
          yearOfStudy: parseInt(yearOfStudy, 10) || 4,
        };
        const localToken = 'demo-preview-jwt-token';
        localStorage.setItem('devready_token', localToken);
        localStorage.setItem('devready_user', JSON.stringify(localUser));
        setToken(localToken);
        setUser(localUser);
        return localUser;
      }
      throw err;
    }
  };

  const loginDemo = (role = 'STUDENT') => {
    const demoUser = {
      id: 101,
      fullName: 'Ankita Utture',
      email: 'ankita.devready@amgoi.edu.in',
      role: role,
      yearOfStudy: 4,
    };
    const demoToken = 'demo-preview-jwt-token';
    localStorage.setItem('devready_token', demoToken);
    localStorage.setItem('devready_user', JSON.stringify(demoUser));
    setToken(demoToken);
    setUser(demoUser);
    return demoUser;
  };

  const logout = () => {
    localStorage.removeItem('devready_token');
    localStorage.removeItem('devready_user');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token && !!user,
    login,
    register,
    loginDemo,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
