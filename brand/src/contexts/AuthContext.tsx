"use client";

import React, { createContext, useEffect, useState } from "react";
import { User as AuthUser } from "@supabase/supabase-js";
import { User } from "@/types/User";
import { useGetProfile } from "@/hooks/auth/useGetProfile";
import { Logo } from "@/components/ui/Logo";
import { supabase } from "@/lib/supabase";

type AuthContextValue = {
  user: AuthUser | null;
  profile: User | null;
  isAuthLoading: boolean;
  hasEmailConfirmed: boolean;
};

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  profile: null,
  isAuthLoading: true,
  hasEmailConfirmed: false,
});

const AuthLoading = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <Logo size="lg" />
    </div>
  );
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(true);
  const {
    data: profile,
    mutate: getProfile,
    isPending: isProfileLoading,
  } = useGetProfile();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsUserLoading(true);
      if (session?.user) {
        setUser(session.user);
        getProfile(session.user.id);
      } else {
        setUser(null);
      }
      setIsUserLoading(false);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // ローディング状態は、認証状態のローディングまたはプロフィールのローディング
  const isAuthLoading = isUserLoading || isProfileLoading;

  if (isAuthLoading && (!user || !profile)) {
    return <AuthLoading />;
  }

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        profile: profile ?? null,
        isAuthLoading,
        hasEmailConfirmed: user?.email_confirmed_at != null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
