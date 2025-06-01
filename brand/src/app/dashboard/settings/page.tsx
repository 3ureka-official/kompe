'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { User, NotificationSettings, PaymentInfo, mockUser, mockNotificationSettings, mockPaymentInfo } from '@/types';
import { ProfileSettings } from '@/components/settings/ProfileSettings';
import { NotificationSettingsComponent } from '@/components/settings/NotificationSettings';
import { PaymentSettings } from '@/components/settings/PaymentSettings';
import { LogoutSection } from '@/components/settings/LogoutSection';

export default function SettingsPage() {
  const { logout } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState<User>(mockUser);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(mockNotificationSettings);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>(mockPaymentInfo);

  const handleUserSave = (updatedUser: User) => {
    setUser(updatedUser);
    // TODO: APIに保存リクエストを送信
    console.log('ユーザー情報を更新:', updatedUser);
    alert('プロフィール情報を保存しました');
  };

  const handleNotificationSave = (updatedSettings: NotificationSettings) => {
    setNotificationSettings(updatedSettings);
    // TODO: APIに保存リクエストを送信
    console.log('通知設定を更新:', updatedSettings);
    alert('通知設定を保存しました');
  };

  const handlePaymentSave = (updatedPaymentInfo: PaymentInfo) => {
    setPaymentInfo(updatedPaymentInfo);
    // TODO: APIに保存リクエストを送信
    console.log('支払い先情報を更新:', updatedPaymentInfo);
    alert('支払い先情報を保存しました');
  };

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
        {/* プロフィール設定 */}
        <ProfileSettings 
          user={user}
          onSave={handleUserSave}
        />

        {/* 通知設定 */}
        <NotificationSettingsComponent 
          settings={notificationSettings}
          onSave={handleNotificationSave}
        />

        {/* 支払い先情報 */}
        <PaymentSettings 
          paymentInfo={paymentInfo}
          onSave={handlePaymentSave}
        />

        {/* ログアウト */}
        <LogoutSection 
          onLogout={handleLogout}
        />
      </div>
    </div>
  );
} 