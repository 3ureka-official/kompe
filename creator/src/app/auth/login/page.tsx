'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { PublicRoute } from '@/components/auth/AuthGuard';

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, loading, error, clearError, user } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showDemoCredentials, setShowDemoCredentials] = useState(false);

  const redirectTo = searchParams.get('redirect') || '/dashboard';

  useEffect(() => {
    if (user) {
      router.push(redirectTo);
    }
  }, [user, router, redirectTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      await login(formData.email, formData.password);
      router.push(redirectTo);
    } catch {
      // エラーはcontextで管理されている
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const fillDemoCredentials = (userType: 'test' | 'creator' | 'demo') => {
    const credentials = {
      test: { email: 'test@example.com', password: 'password123' },
      creator: { email: 'creator@example.com', password: 'password123' },
      demo: { email: 'demo@tiktok.com', password: 'demo123' },
    };
    
    setFormData(credentials[userType]);
    setShowDemoCredentials(false);
  };

  return (
    <PublicRoute>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 px-4">
        <div className="w-full max-w-md">

          {/* ログインカード */}
          <Card className="w-full shadow-xl border-0 bg-background/95 backdrop-blur">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">
                ログイン
              </CardTitle>
              <CardDescription>
                アカウントにログインしてコンテストを楽しもう
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* エラー表示 */}
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <p className="text-destructive text-sm font-medium">
                    {error}
                  </p>
                </div>
              )}

              {/* デモクレデンシャル表示ボタン */}
              <div className="text-center">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDemoCredentials(!showDemoCredentials)}
                  className="text-sm"
                >
                  テスト用アカウント情報を表示
                </Button>
              </div>

              {/* デモクレデンシャル */}
              {showDemoCredentials && (
                <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium text-foreground mb-3">
                    テスト用アカウント：
                  </p>
                  <div className="space-y-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => fillDemoCredentials('test')}
                      className="w-full justify-start text-sm"
                    >
                      <div>
                        <div className="font-medium">テストユーザー</div>
                        <div className="text-xs text-muted-foreground">
                          test@example.com / password123
                        </div>
                      </div>
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => fillDemoCredentials('creator')}
                      className="w-full justify-start text-sm"
                    >
                      <div>
                        <div className="font-medium">クリエイター太郎</div>
                        <div className="text-xs text-muted-foreground">
                          creator@example.com / password123
                        </div>
                      </div>
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => fillDemoCredentials('demo')}
                      className="w-full justify-start text-sm"
                    >
                      <div>
                        <div className="font-medium">TikTokデモ</div>
                        <div className="text-xs text-muted-foreground">
                          demo@tiktok.com / demo123
                        </div>
                      </div>
                    </Button>
                  </div>
                </div>
              )}

              {/* ログインフォーム */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  name="email"
                  type="email"
                  label="メールアドレス"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="example@domain.com"
                  disabled={loading}
                />
                
                <Input
                  name="password"
                  type="password"
                  label="パスワード"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="パスワードを入力"
                  disabled={loading}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                  loading={loading}
                >
                  {loading ? 'ログイン中...' : 'ログイン'}
                </Button>
              </form>

              {/* TikTokログインボタン（デモ用） */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    または
                  </span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full border-2 hover:bg-primary/5 hover:border-primary/20"
                disabled={loading}
                onClick={() => fillDemoCredentials('demo')}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
                TikTok風デモアカウント
              </Button>

              {/* アカウント作成リンク */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  アカウントをお持ちでない方は{' '}
                  <Link href="/auth/signup" className="text-primary-600 hover:text-primary-700 font-medium">
                    アカウントを作成
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PublicRoute>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    }>
      <LoginPageContent />
    </Suspense>
  );
} 