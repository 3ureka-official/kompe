'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileService } from '@/lib/api/profile';
import { UserProfile, BankFormData } from '@/types/profile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { AlertCircle, CreditCard, Save, ArrowLeft, Shield, CheckCircle } from 'lucide-react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import Link from 'next/link';

export default function BankSettingsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState<BankFormData>({
    bankName: '',
    branchName: '',
    accountType: '普通',
    accountNumber: '',
    accountHolder: '',
  });

  // プロフィール情報を取得
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const profileData = await ProfileService.getUserProfile(user.id);
        
        if (profileData) {
          setProfile(profileData);
          if (profileData.bankInfo) {
            setFormData({
              bankName: profileData.bankInfo.bankName,
              branchName: profileData.bankInfo.branchName,
              accountType: profileData.bankInfo.accountType,
              accountNumber: profileData.bankInfo.accountNumber,
              accountHolder: profileData.bankInfo.accountHolder,
            });
          }
        }
      } catch {
        setError('プロフィール情報の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  // フォームデータの変更
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
    setSuccess(null);
  };

  // バリデーション
  const validateForm = () => {
    if (!formData.bankName.trim()) {
      setError('銀行名を入力してください');
      return false;
    }
    if (!formData.branchName.trim()) {
      setError('支店名を入力してください');
      return false;
    }
    if (!formData.accountNumber.trim()) {
      setError('口座番号を入力してください');
      return false;
    }
    if (!/^\d{7,8}$/.test(formData.accountNumber)) {
      setError('口座番号は7〜8桁の数字で入力してください');
      return false;
    }
    if (!formData.accountHolder.trim()) {
      setError('口座名義人を入力してください');
      return false;
    }
    if (!/^[ァ-ヶー\s]+$/.test(formData.accountHolder)) {
      setError('口座名義人はカタカナで入力してください');
      return false;
    }
    return true;
  };

  // 銀行口座情報更新
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!validateForm()) return;

    try {
      setSaving(true);
      setError(null);

      await ProfileService.updateBankInfo(user.id, formData);
      setSuccess('銀行口座情報を更新しました');
      
      // プロフィール情報を再取得
      const updatedProfile = await ProfileService.getUserProfile(user.id);
      if (updatedProfile) {
        setProfile(updatedProfile);
      }
      
      // 成功時は3秒後にプロフィールページに戻る
      setTimeout(() => {
        router.push('/profile');
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : '銀行口座情報の更新に失敗しました');
    } finally {
      setSaving(false);
    }
  };

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
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <Link href="/dashboard" className="hover:text-primary-600">
                ダッシュボード
              </Link>
              <span>/</span>
              <Link href="/profile" className="hover:text-primary-600">
                プロフィール
              </Link>
              <span>/</span>
              <span className="text-primary-600">銀行口座設定</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">銀行口座設定</h1>
                <p className="text-gray-600">
                  賞金受け取り用の銀行口座を設定します
                </p>
              </div>
            </div>
          </div>

          {/* セキュリティ注意事項 */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-900 mb-1">セキュリティについて</h3>
                <p className="text-sm text-blue-800">
                  銀行口座情報は暗号化されて安全に保存されます。この情報は賞金の振込みにのみ使用され、
                  第三者に開示されることはありません。
                </p>
              </div>
            </div>
          </div>

          {/* 現在の設定表示 */}
          {profile?.bankInfo && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  現在の設定
                </CardTitle>
                <CardDescription>
                  現在登録されている銀行口座情報
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">銀行名:</span>
                      <span className="font-medium">{profile.bankInfo.bankName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">支店名:</span>
                      <span className="font-medium">{profile.bankInfo.branchName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">口座種別:</span>
                      <span className="font-medium">{profile.bankInfo.accountType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">口座番号:</span>
                      <span className="font-medium">{profile.bankInfo.accountNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">口座名義:</span>
                      <span className="font-medium">{profile.bankInfo.accountHolder}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                {profile?.bankInfo ? '銀行口座情報の更新' : '銀行口座情報の登録'}
              </CardTitle>
              <CardDescription>
                {profile?.bankInfo 
                  ? '銀行口座情報を更新する場合は以下のフォームを入力してください'
                  : '賞金を受け取るための銀行口座情報を入力してください'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* エラー・成功メッセージ */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-green-700 font-medium">{success}</p>
                  </div>
                  <p className="text-sm text-green-600 mt-1">自動的にプロフィールページに戻ります...</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 銀行名 */}
                <Input
                  label="銀行名 *"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  placeholder="例: 三菱UFJ銀行"
                  required
                />

                {/* 支店名 */}
                <Input
                  label="支店名 *"
                  name="branchName"
                  value={formData.branchName}
                  onChange={handleChange}
                  placeholder="例: 新宿支店"
                  required
                />

                {/* 口座種別 */}
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">
                    口座種別 *
                  </label>
                  <select
                    name="accountType"
                    value={formData.accountType}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    <option value="普通">普通預金</option>
                    <option value="当座">当座預金</option>
                  </select>
                </div>

                {/* 口座番号 */}
                <Input
                  label="口座番号 *"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  placeholder="例: 1234567"
                  required
                  helperText="7〜8桁の数字で入力してください（ハイフンは不要）"
                />

                {/* 口座名義人 */}
                <Input
                  label="口座名義人 *"
                  name="accountHolder"
                  value={formData.accountHolder}
                  onChange={handleChange}
                  placeholder="例: ヤマダ タロウ"
                  required
                  helperText="カタカナで入力してください（銀行口座の名義と同じ）"
                />

                {/* ボタン */}
                <div className="pt-4 space-y-3">
                  <Button
                    type="submit"
                    disabled={saving}
                    className="w-full"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? '保存中...' : '銀行口座情報を保存'}
                  </Button>
                  
                  <Link href="/profile" className="block">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      プロフィールに戻る
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* 注意事項 */}
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-medium text-yellow-900 mb-2">ご注意</h3>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• 口座名義人は必ずアカウント登録者と同一人物である必要があります</li>
              <li>• 入力内容に誤りがある場合、賞金の振込みができない可能性があります</li>
              <li>• 口座情報は正確に入力してください</li>
              <li>• 未成年の方は保護者名義の口座を設定することも可能です</li>
            </ul>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 