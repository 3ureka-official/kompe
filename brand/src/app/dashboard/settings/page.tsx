'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { LogoutSection } from '@/components__/settings/LogoutSection';

export default function SettingsPage() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/auth/login');
    } catch (error) {
      console.error('ログアウトエラー:', error);
      alert('ログアウトに失敗しました');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-8">
        {/* ログアウト */}
        <LogoutSection 
          onLogout={handleLogout}
        />
      </div>
    </div>
  );
} 