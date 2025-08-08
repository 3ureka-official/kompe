"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const ROOT_PATHS = ["/"];

const PUBLIC_PATHS = ["/auth/login", "/auth/signup"];

export function AppGate({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useContext(AuthContext);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (loading) return;

    const isRoot = ROOT_PATHS.includes(path);
    const isPublic = PUBLIC_PATHS.includes(path);
    const isLoggedIn = !!user;

    if (isRoot) {
      router.replace("/contests");
    }

    if (!isLoggedIn && !isPublic) {
      router.replace("/auth/login");
    } else if (isLoggedIn && isPublic) {
      router.replace("/contests");
    }
  }, [user, profile, loading, path, router]);

  // リダイレクト中は何も出さない
  const isRedirecting =
    (!user && !PUBLIC_PATHS.includes(path)) ||
    (user && PUBLIC_PATHS.includes(path)) ||
    (user && profile && !profile.tiktok_id);

  if (isRedirecting) {
    return null;
  }

  if (loading) return <div>Loading...</div>;

  return <>{children}</>;
}
