import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import QueryProvider from '@/components/app/QueryProvider';
import { Header } from '@/components/app/Header';
import { AppGate } from '@/components/app/AppGate';

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
            <AppGate>
              <main>
                <Header />
                {children}
              </main>
            </AppGate>  
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
} 