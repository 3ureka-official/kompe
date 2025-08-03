"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useContest } from "@/hooks/useContest";
import { useApplication } from "@/hooks/useApplication";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AlertCircle, ExternalLink, Video } from "lucide-react";
import { APPLICATION_STEPS } from "@/types/application";
import { ApplicationSteps } from "@/components/application/ApplicationSteps";

export default function ApplyPage() {
  const router = useRouter();
  const params = useParams();
  const contestId = params.id as string;
  const { user } = useAuth();
  const { contest, loading: contestLoading } = useContest({ id: contestId });
  const {
    formData,
    updateFormData,
    loading,
    error,
    clearError,
    validateTikTokUrl,
    hasExistingApplication,
  } = useApplication({
    contestId,
    userId: user?.id || "",
    autoSaveDraft: true,
  });

  const [urlError, setUrlError] = useState<string | null>(null);

  // 既に応募済みの場合はリダイレクト
  useEffect(() => {
    if (hasExistingApplication) {
      router.push(
        `/contests/${params.id}/apply/complete?applicationId=${hasExistingApplication}`,
      );
    }
  }, [hasExistingApplication, params.id, router]);

  // 未ログインの場合はログインページへリダイレクト
  useEffect(() => {
    if (!user) {
      router.push(`/auth/login?redirect=/contests/${params.id}/apply`);
    }
  }, [user, params.id, router]);

  // TikTok URL変更時のバリデーション
  const handleUrlChange = (url: string) => {
    updateFormData({ tiktokUrl: url });
    setUrlError(null);

    if (url.trim()) {
      const validation = validateTikTokUrl(url);
      if (!validation.isValid) {
        setUrlError(validation.error || null);
      }
    }
  };

  // 次のステップへ進む
  const handleNext = () => {
    if (!formData.tiktokUrl.trim()) {
      setUrlError("TikTok URLを入力してください");
      return;
    }

    const validation = validateTikTokUrl(formData.tiktokUrl);
    if (!validation.isValid) {
      setUrlError(validation.error || "");
      return;
    }

    router.push(`/contests/${params.id}/apply/confirm`);
  };

  // ローディング中
  if (contestLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  // コンテストが見つからない場合
  if (!contest) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            コンテストが見つかりません
          </h1>
          <Button onClick={() => router.push("/contests")}>
            コンテスト一覧に戻る
          </Button>
        </div>
      </div>
    );
  }

  // ステップ状態を更新
  const steps = APPLICATION_STEPS.map((step, index) => ({
    ...step,
    isActive: index === 0,
    isCompleted: false,
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ヘッダー */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <span>コンテスト</span>
            <span>/</span>
            <span className="text-primary-600">{contest.title}</span>
            <span>/</span>
            <span>応募</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            コンテストに応募
          </h1>
          <p className="text-gray-600">
            TikTok動画のURLを入力して、コンテストに応募してください
          </p>
        </div>

        {/* ステップ表示 */}
        <div className="mb-8">
          <ApplicationSteps steps={steps} />
        </div>

        {/* エラー表示 */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700">{error}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearError}
              className="ml-auto text-red-600 hover:text-red-700"
            >
              ×
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* メインフォーム */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  TikTok動画URL
                </CardTitle>
                <CardDescription>
                  応募するTikTok動画のURLを入力してください
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* URL入力 */}
                <div>
                  <Input
                    label="TikTok動画URL *"
                    placeholder="https://www.tiktok.com/@username/video/..."
                    value={formData.tiktokUrl}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    error={urlError || undefined}
                    helperText="TikTokの動画URLを貼り付けてください"
                  />
                  {formData.tiktokUrl && !urlError && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                      <ExternalLink className="w-4 h-4" />
                      <a
                        href={formData.tiktokUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        動画を確認する
                      </a>
                    </div>
                  )}
                </div>

                {/* 次へボタン */}
                <div className="pt-4">
                  <Button
                    onClick={handleNext}
                    className="w-full"
                    disabled={!formData.tiktokUrl.trim() || !!urlError}
                  >
                    確認画面へ進む
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* サイドバー */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{contest.title}</CardTitle>
                <CardDescription>{contest.brandName}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 賞金 */}
                <div>
                  <div className="text-sm text-gray-600 mb-1">賞金総額</div>
                  <div className="text-2xl font-bold text-primary-600">
                    ¥{contest.totalPrizeAmount.toLocaleString()}
                  </div>
                </div>

                {/* 締切 */}
                <div>
                  <div className="text-sm text-gray-600 mb-1">応募締切</div>
                  <div className="font-medium">
                    {new Date(contest.endDate).toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>

                {/* カテゴリ */}
                <div>
                  <div className="text-sm text-gray-600 mb-2">カテゴリ</div>
                  <Badge variant="category">{contest.category}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
