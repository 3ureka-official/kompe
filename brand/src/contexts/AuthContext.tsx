'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { 
  getUserProfile, 
  createUserProfile, 
  getUserBrand,
  UserProfile,
  BrandData 
} from '@/services/userService';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  userBrand: BrandData | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userBrand, setUserBrand] = useState<BrandData | null>(null);
  const [loading, setLoading] = useState(true);

  // ユーザーデータを更新する関数
  const refreshUserData = async () => {
    if (user) {
      try {
        const profile = await getUserProfile(user.uid);
        setUserProfile(profile);

        if (profile?.hasBrand) {
          const brand = await getUserBrand(user.uid);
          setUserBrand(brand);
        } else {
          setUserBrand(null);
        }
      } catch (error) {
        console.error('ユーザーデータ更新エラー:', error);
      }
    } else {
      setUserProfile(null);
      setUserBrand(null);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        try {
          // ユーザープロフィールを取得または作成
          let profile = await getUserProfile(user.uid);
          if (!profile) {
            profile = await createUserProfile(user);
          }
          setUserProfile(profile);

          // ブランド情報を取得
          if (profile.hasBrand) {
            const brand = await getUserBrand(user.uid);
            setUserBrand(brand);
          } else {
            setUserBrand(null);
          }
        } catch (error) {
          console.error('ユーザーデータ取得エラー:', error);
        }
      } else {
        setUserProfile(null);
        setUserBrand(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('ログインエラー:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName });
    } catch (error) {
      console.error('サインアップエラー:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('ログアウトエラー:', error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('パスワードリセットエラー:', error);
      throw error;
    }
  };

  const value = {
    user,
    userProfile,
    userBrand,
    loading,
    signIn,
    signUp,
    logout,
    resetPassword,
    refreshUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
} 