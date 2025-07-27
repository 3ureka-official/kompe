'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

const PUBLIC_PATHS = ['/auth/login', '/auth/signup'];

const ONBOARD_PATHS = ['/brand/create'];

export function AppGate({ children }: { children: React.ReactNode }) {
  const { user, profile } = useContext(AuthContext);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const isPublic    = PUBLIC_PATHS.includes(path);
    const isOnboard   = ONBOARD_PATHS.includes(path);
    const isLoggedIn  = !!user;
    const hasBrand    = !!profile?.brand_id;

    // 1) 未認証かつ保護ルート → /login
    if (!isLoggedIn && !isPublic) {
      router.replace('/auth/login');
    }
    // 2) 認証済かつ公開ルート → /dashboard
    else if (isLoggedIn && isPublic) {
      router.replace('/contests');
    }
    // 3) 認証済かつブランド未作成かつ非オンボードルート → /brand/create
    else if (isLoggedIn && profile && !hasBrand && !isOnboard) {
      router.replace('/brand/create');
    }
    // 4) 認証済かつブランド作成済かつオンボードルート → /dashboard
    else if (isLoggedIn && hasBrand && isOnboard) {
      router.replace('/contests');
    }
  }, [user, profile, path, router]);

  // リダイレクト中は何も出さない
  const isRedirecting =
    (!user && !PUBLIC_PATHS.includes(path)) ||
    (user && PUBLIC_PATHS.includes(path)) ||
    (user && profile && !profile.brand_id && !ONBOARD_PATHS.includes(path)) ||
    (user && profile && profile.brand_id && ONBOARD_PATHS.includes(path));

  if (isRedirecting) {
    return null;
  }

  return <>{children}</>;
}
