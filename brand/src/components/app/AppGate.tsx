'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

const ROOT_PATHS = ['/'];

const PUBLIC_PATHS = ['/auth/login', '/auth/signup'];

const ONBOARD_PATHS = ['/brand/create'];

export function AppGate({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useContext(AuthContext);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (loading) return;
    
    const isRoot      = ROOT_PATHS.includes(path);
    const isPublic    = PUBLIC_PATHS.includes(path);
    const isOnboard   = ONBOARD_PATHS.includes(path);
    const isLoggedIn  = !!user;
    const hasBrand    = !!profile?.brand_id;

    if (isRoot) {
      router.replace('/contests');
    }

    if (!isLoggedIn && !isPublic) {
      router.replace('/auth/login');
    }

    else if (isLoggedIn && isPublic) {
      router.replace('/contests');
    }

    else if (isLoggedIn && profile && !hasBrand && !isOnboard) {
      router.replace('/brand/create');
    }

    else if (isLoggedIn) {
      console.log('isLoggedIn', isLoggedIn);
      console.log('profile', profile);
      console.log('hasBrand', hasBrand);
      console.log('isOnboard', isOnboard);
    }

    else if (isLoggedIn && hasBrand && isOnboard) {
      router.replace('/contests');
    }
  }, [user, profile, loading, path, router]);

  // リダイレクト中は何も出さない
  const isRedirecting =
    (!user && !PUBLIC_PATHS.includes(path)) ||
    (user && PUBLIC_PATHS.includes(path)) ||
    (user && profile && !profile.brand_id && !ONBOARD_PATHS.includes(path)) ||
    (user && profile && profile.brand_id && ONBOARD_PATHS.includes(path));

  if (isRedirecting) {
    return null;
  }


  if (loading) return <div>Loading...</div>;

  return <>{children}</>;
}
