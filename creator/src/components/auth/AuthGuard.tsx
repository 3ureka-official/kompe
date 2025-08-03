"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  redirectTo?: string;
  requireAuth?: boolean;
}

export function AuthGuard({
  children,
  fallback,
  redirectTo = "/auth/login",
  requireAuth = true,
}: AuthGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        // 認証が必要だがログインしていない場合
        router.push(redirectTo);
      } else if (!requireAuth && user) {
        // 認証不要（ログインページなど）だがログイン済みの場合
        router.push("/dashboard");
      }
    }
  }, [user, loading, requireAuth, redirectTo, router]);

  // ローディング中
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  // 認証が必要だがログインしていない場合
  if (requireAuth && !user) {
    return fallback || null;
  }

  // 認証不要だがログイン済みの場合（ログインページなど）
  if (!requireAuth && user) {
    return null;
  }

  return <>{children}</>;
}

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

// ショートカット用のProtectedRouteコンポーネント
export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  return (
    <AuthGuard requireAuth={true} fallback={fallback}>
      {children}
    </AuthGuard>
  );
}

interface PublicRouteProps {
  children: ReactNode;
}

// パブリックルート用のコンポーネント
export function PublicRoute({ children }: PublicRouteProps) {
  return <AuthGuard requireAuth={false}>{children}</AuthGuard>;
}
