'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, AuthState } from '@/types/auth';
import { AuthService } from '@/lib/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string, confirmPassword: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  // 初期化時に既存の認証状態をチェック
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = AuthService.getCurrentUser();
        setState(prev => ({
          ...prev,
          user,
          loading: false,
        }));
      } catch (error) {
        console.error('Auth check failed:', error);
        setState(prev => ({
          ...prev,
          user: null,
          loading: false,
        }));
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const user = await AuthService.login({ email, password });
      setState(prev => ({
        ...prev,
        user,
        loading: false,
        error: null,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        user: null,
        loading: false,
        error: error instanceof Error ? error.message : 'ログインに失敗しました',
      }));
      throw error;
    }
  };

  const logout = async () => {
    setState(prev => ({ ...prev, loading: true }));
    
    try {
      await AuthService.logout();
      setState({
        user: null,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'ログアウトに失敗しました',
      }));
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string, confirmPassword: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const user = await AuthService.register({ name, email, password, confirmPassword });
      setState(prev => ({
        ...prev,
        user,
        loading: false,
        error: null,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        user: null,
        loading: false,
        error: error instanceof Error ? error.message : 'アカウント作成に失敗しました',
      }));
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      await AuthService.resetPassword(email);
      setState(prev => ({
        ...prev,
        loading: false,
        error: null,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'パスワードリセットに失敗しました',
      }));
      throw error;
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!state.user) {
      throw new Error('ユーザーがログインしていません');
    }

    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const updatedUser = await AuthService.updateProfile(state.user.id, data);
      setState(prev => ({
        ...prev,
        user: updatedUser,
        loading: false,
        error: null,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'プロフィール更新に失敗しました',
      }));
      throw error;
    }
  };

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    register,
    resetPassword,
    updateProfile,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 