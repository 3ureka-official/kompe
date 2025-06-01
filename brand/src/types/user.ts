// ユーザー関連の型定義
export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  contestUpdates: boolean;
  applicationNotifications: boolean;
  marketingEmails: boolean;
}

export interface PaymentInfo {
  bankName: string;
  branchName: string;
  accountType: 'savings' | 'checking';
  accountNumber: string;
  accountHolderName: string;
}

// モックデータ
export const mockUser: User = {
  id: 'user-1',
  name: '田中太郎',
  email: 'tanaka@example.com',
  profileImage: 'https://placehold.co/100x100',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-15T10:30:00Z'
};

export const mockNotificationSettings: NotificationSettings = {
  emailNotifications: true,
  contestUpdates: true,
  applicationNotifications: true,
  marketingEmails: false
};

export const mockPaymentInfo: PaymentInfo = {
  bankName: 'みずほ銀行',
  branchName: '新宿支店',
  accountType: 'savings',
  accountNumber: '1234567',
  accountHolderName: 'タナカ タロウ'
}; 