import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import  { AuthGate } from '@/components/auth/AuthGate';
import QueryProvider from '@/components/app/QueryProvider';
import { Header } from '@/components/dashboard/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ブランドコンテスト',
  description: 'TikTokクリエイターとブランドをつなぐプラットフォーム',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <QueryProvider>
          <AuthProvider>
            <AuthGate>
              <main className="">
                <Header />
                {children}
              </main>
            </AuthGate>  
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
} 