"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "@/features/auth/contexts/AuthContext";

const ROOT_PATHS = ["/"];

const PUBLIC_PATHS = ["/auth/login", "/auth/signup", "/auth/verify-code"];

const ONBOARD_PATHS = ["/brand/create"];

export function AppGate({ children }: { children: React.ReactNode }) {
  const { user, profile, hasEmailConfirmed, isAuthLoading } =
    useContext(AuthContext);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (isAuthLoading) return;

    const isRoot = ROOT_PATHS.includes(path);
    const isPublic = PUBLIC_PATHS.includes(path);
    const isOnboard = ONBOARD_PATHS.includes(path);
    const isLoggedIn = !!user;
    const hasBrand = !!profile?.brand_id;

    // ルートパスの場合はコンテストページにリダイレクト
    if (isRoot) {
      router.replace("/contests");
      return;
    }

    // 未ログインの場合
    if (!isLoggedIn) {
      if (!isPublic) {
        router.replace("/auth/login");
      }
      return;
    }

    // ログイン済みの場合
    // メール確認が完了していない場合はverify-codeページにリダイレクト
    if (isLoggedIn && !hasEmailConfirmed) {
      // verify-codeページにいない場合はリダイレクト
      if (path !== "/auth/verify-code") {
        router.replace("/auth/verify-code");
      }
      return;
    }

    // メール確認済みの場合
    // パブリックパスにいる場合はコンテストページにリダイレクト
    if (isPublic) {
      router.replace("/contests");
      return;
    }

    // ブランド未作成の場合
    if (!hasBrand && !isOnboard) {
      router.replace("/brand/create");
      return;
    }

    // ブランド作成済みでオンボードパスにいる場合
    if (hasBrand && isOnboard) {
      router.replace("/contests");
      return;
    }
  }, [user, profile, isAuthLoading, path, router, hasEmailConfirmed]);

  // ローディング中は何も表示しない
  if (isAuthLoading) {
    return null;
  }

  const isPublic = PUBLIC_PATHS.includes(path);
  const isOnboard = ONBOARD_PATHS.includes(path);
  const isLoggedIn = !!user;
  const hasBrand = !!profile?.brand_id;

  // メール確認未完了でverify-codeページにいる場合は表示
  if (!hasEmailConfirmed && path === "/auth/verify-code") {
    return <>{children}</>;
  }

  // 未ログインでパブリックパスにいる場合は表示
  if (!isLoggedIn && isPublic) {
    return <>{children}</>;
  }

  // メール確認済みでブランド未作成でオンボードパスにいる場合は表示
  if (isLoggedIn && hasEmailConfirmed && !hasBrand && isOnboard) {
    return <>{children}</>;
  }

  // メール確認済みでブランド作成済みでオンボードパス以外にいる場合は表示
  if (isLoggedIn && hasEmailConfirmed && hasBrand && !isOnboard && !isPublic) {
    return <>{children}</>;
  }

  // その他の場合はリダイレクト中なので何も表示しない
  return null;
}
