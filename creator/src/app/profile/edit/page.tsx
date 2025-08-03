"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { ProfileService } from "@/lib/api/profile";
import { ProfileFormData } from "@/types/profile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { AlertCircle, User, Save, ArrowLeft } from "lucide-react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Link from "next/link";

export default function ProfileEditPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    email: "",
    tiktokHandle: "",
  });

  // プロフィール情報を取得
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const profileData = await ProfileService.getUserProfile(user.id);

        if (profileData) {
          setFormData({
            name: profileData.name,
            email: profileData.email,
            tiktokHandle: profileData.tiktokHandle || "",
          });
        }
      } catch {
        setError("プロフィール情報の取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  // フォームデータの変更
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
    setSuccess(null);
  };

  // プロフィール更新
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setSaving(true);
      setError(null);

      await ProfileService.updateProfile(user.id, formData);
      setSuccess("プロフィールを更新しました");

      // 成功時は2秒後にプロフィールページに戻る
      setTimeout(() => {
        router.push("/profile");
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "プロフィールの更新に失敗しました",
      );
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
              <span className="text-primary-600">編集</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  プロフィール編集
                </h1>
                <p className="text-gray-600">アカウント情報を編集できます</p>
              </div>
            </div>
          </div>

          {/* プロフィール編集フォーム */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                基本情報の編集
              </CardTitle>
              <CardDescription>
                アカウントの基本情報を編集できます
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
                  <p className="text-green-700">{success}</p>
                  <p className="text-sm text-green-600 mt-1">
                    自動的にプロフィールページに戻ります...
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 表示名 */}
                <Input
                  label="表示名 *"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="表示名を入力"
                  required
                />

                {/* メールアドレス */}
                <Input
                  label="メールアドレス *"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="メールアドレスを入力"
                  required
                />

                {/* TikTokハンドル */}
                <Input
                  label="TikTokハンドル"
                  name="tiktokHandle"
                  value={formData.tiktokHandle}
                  onChange={handleChange}
                  placeholder="@username"
                  helperText="TikTokのユーザー名（@を含む）"
                />

                {/* ボタン */}
                <div className="pt-4 space-y-3">
                  <Button type="submit" disabled={saving} className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? "保存中..." : "変更を保存"}
                  </Button>

                  <Link href="/profile" className="block">
                    <Button type="button" variant="outline" className="w-full">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      プロフィールに戻る
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
