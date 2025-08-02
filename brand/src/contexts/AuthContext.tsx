'use client';

import React, { createContext, useEffect, useState } from 'react';
import { User as AuthUser } from '@supabase/supabase-js';
import { User } from '@/types/User';
import supabase from '@/lib/supabase';
import { getUser } from '@/services/userService';

type AuthContextValue = {
  user: AuthUser | null;
  profile: User | null;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  profile: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);  
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        getUser(session.user.id).then((profile) => {
          setProfile(profile);
        }).finally(() => {
          setLoading(false);
        });
      } else {
        setUser(null);
        setProfile(null);
        setLoading(false);
      }
    });
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading }}>
      {children}
    </AuthContext.Provider>
  );
} 