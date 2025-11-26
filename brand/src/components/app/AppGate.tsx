"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const ROOT_PATHS = ["/"];

const PUBLIC_PATHS = [
  "/auth/login",
  "/auth/signup",
  "/auth/signup/success",
  "/auth/verify-email",
  "/auth/verify-code",
];

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
      // サインアップページにアクセスしようとした場合は、verify-codeページにリダイレクト
      if (path === "/auth/signup") {
        router.replace("/auth/verify-code");
        return;
      }
      // verify-codeページまたはsignup/successページにいる場合は表示
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

  // メール確認未完了でverify-codeページ、サインアップ成功ページ、またはメール確認ページにいる場合は表示
  if (
    !hasEmailConfirmed &&
    (path === "/auth/verify-code" ||
      path === "/auth/signup/success" ||
      path === "/auth/verify-email")
  ) {
    return <>{children}</>;
  }

  // その他の場合はリダイレクト中なので何も表示しない
  const isPublic = PUBLIC_PATHS.includes(path);
  const isOnboard = ONBOARD_PATHS.includes(path);
  const isLoggedIn = !!user;
  const hasBrand = !!profile?.brand_id;

  if (
    (!isLoggedIn && !isPublic) ||
    (isLoggedIn && hasEmailConfirmed && isPublic) ||
    (isLoggedIn && !hasBrand && !isOnboard) ||
    (isLoggedIn && hasBrand && isOnboard)
  ) {
    return null;
  }

  return <>{children}</>;
}
