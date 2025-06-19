'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileService } from '@/lib/api/profile';
import { UserProfile } from '@/types/profile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AlertCircle, User, CreditCard, Edit, Settings, LogOut } from 'lucide-react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // プロフィール情報を取得
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const profileData = await ProfileService.getUserProfile(user.id);
        setProfile(profileData);
      } catch {
        setError('プロフィール情報の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">読み込み中...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <Link href="/dashboard" className="hover:text-primary-600">
                ダッシュボード
              </Link>
              <span>/</span>
              <span className="text-primary-600">プロフィール</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">プロフィール</h1>
                <p className="text-gray-600">
                  アカウント情報を確認できます
                </p>
              </div>
              <Link href="/profile/edit">
                <Button>
                  <Edit className="w-4 h-4 mr-2" />
                  編集
                </Button>
              </Link>
            </div>
          </div>

          {/* エラーメッセージ */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            {/* 基本情報 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  基本情報
                </CardTitle>
                <CardDescription>
                  アカウントの基本情報
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      表示名
                    </label>
                    <p className="text-gray-900">{profile?.name || '未設定'}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      メールアドレス
                    </label>
                    <p className="text-gray-900">{profile?.email || '未設定'}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      TikTokハンドル
                    </label>
                    <p className="text-gray-900">{profile?.tiktokHandle || '未設定'}</p>
                  </div>

                  {profile?.tiktokUsername && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        TikTokユーザー名
                      </label>
                      <p className="text-gray-900">@{profile.tiktokUsername}</p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      アカウント作成日
                    </label>
                    <p className="text-gray-900">
                      {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('ja-JP') : '未設定'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 銀行口座設定 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  銀行口座設定
                </CardTitle>
                <CardDescription>
                  賞金受け取り用の銀行口座情報
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile?.bankInfo ? (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-green-900">銀行口座が設定済みです</p>
                          <div className="space-y-1 mt-2">
                            <p className="text-sm text-green-700">
                              <span className="font-medium">銀行名:</span> {profile.bankInfo.bankName}
                            </p>
                            <p className="text-sm text-green-700">
                              <span className="font-medium">支店名:</span> {profile.bankInfo.branchName}
                            </p>
                            <p className="text-sm text-green-700">
                              <span className="font-medium">口座種別:</span> {profile.bankInfo.accountType}
                            </p>
                            <p className="text-sm text-green-700">
                              <span className="font-medium">口座番号:</span> {profile.bankInfo.accountNumber}
                            </p>
                            <p className="text-sm text-green-700">
                              <span className="font-medium">口座名義:</span> {profile.bankInfo.accountHolder}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-yellow-800 font-medium">銀行口座が未設定です</p>
                      <p className="text-sm text-yellow-700 mt-1">
                        賞金を受け取るには銀行口座の設定が必要です
                      </p>
                    </div>
                  )}

                  <Link href="/settings/bank">
                    <Button variant="outline" className="w-full">
                      <Settings className="w-4 h-4 mr-2" />
                      銀行口座を{profile?.bankInfo ? '編集' : '設定'}する
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {profile?.isMinor && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    未成年者設定
                  </CardTitle>
                  <CardDescription>
                    未成年者の参加に必要な設定
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {profile.parentConsentFileUrl ? (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="font-medium text-green-900">保護者同意書が提出済みです</p>
                        <p className="text-sm text-green-700 mt-1">
                          コンテストに参加できます
                        </p>
                      </div>
                    ) : (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-800 font-medium">保護者同意書が未提出です</p>
                        <p className="text-sm text-red-700 mt-1">
                          コンテストに参加するには保護者同意書の提出が必要です
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* ログアウト */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LogOut className="w-5 h-5" />
                  アカウント
                </CardTitle>
                <CardDescription>
                  アカウントからログアウトします
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="w-full"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  ログアウト
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

