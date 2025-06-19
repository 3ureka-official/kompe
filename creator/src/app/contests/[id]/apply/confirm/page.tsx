'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useContest } from '@/hooks/useContest';
import { useApplication } from '@/hooks/useApplication';
import { APPLICATION_STEPS } from '@/types/application';
import { ApplicationSteps } from '@/components/application/ApplicationSteps';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Checkbox } from '@/components/ui/Checkbox';
import { AlertCircle, ExternalLink, Video, FileText, Shield, ArrowLeft } from 'lucide-react';



export default function ConfirmPage() {
  const router = useRouter();
  const params = useParams();
  const contestId = params.id as string;
  const { user } = useAuth();
  const { contest, loading: contestLoading } = useContest({ id: contestId });
  const {
    formData,
    loading,
    error,
    updateFormData,
    submitApplication,
    clearError,
    canSubmit,
    hasExistingApplication,
  } = useApplication({ contestId: contestId, userId: user?.id || '', autoSaveDraft: false });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 既に応募済みの場合はリダイレクト
  useEffect(() => {
    
    if (hasExistingApplication) {
      router.push(`/contests/${contestId}/apply/complete?applicationId=${hasExistingApplication}`);
    }
  }, [hasExistingApplication, contestId, router]);

  // 未ログインの場合はログインページへリダイレクト
  useEffect(() => {
    if (!user) {
      router.push(`/auth/login?redirect=/contests/${contestId}/apply/confirm`);
    }
  }, [user, router, contestId]);

  // 応募を送信
  const handleSubmit = async () => {
    if (!canSubmit) return;

    try {
      setIsSubmitting(true);
      const application = await submitApplication();
      
      if (application) {
        router.push(`/contests/${contestId}/apply/complete?applicationId=${application.id}`);
      }
    } catch (err) {
      console.error('Failed to submit application:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 前のページに戻る
  const handleBack = () => {
    router.push(`/contests/${contestId}/apply`);
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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">コンテストが見つかりません</h1>
          <Button onClick={() => router.push('/contests')}>
            コンテスト一覧に戻る
          </Button>
        </div>
      </div>
    );
  }

  // ステップ状態を更新
  const steps = APPLICATION_STEPS.map((step, index) => ({
    ...step,
    isActive: index === 1,
    isCompleted: index === 0,
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
            <span>応募確認</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">応募内容の確認</h1>
          <p className="text-gray-600">
            応募内容を確認し、利用規約に同意してください
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
          {/* メインコンテンツ */}
          <div className="lg:col-span-2 space-y-6">
            {/* 応募内容確認 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  応募内容の確認
                </CardTitle>
                <CardDescription>
                  以下の内容で応募を行います
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* TikTok URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    TikTok動画URL
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 truncate flex-1 mr-2">
                        {formData.tiktokUrl}
                      </span>
                      <a
                        href={formData.tiktokUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 flex-shrink-0"
                      >
                        <ExternalLink className="w-4 h-4" />
                        確認
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 利用規約・ガイドライン同意 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  利用規約・ガイドライン
                </CardTitle>
                <CardDescription>
                  応募前に必ずお読みください
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 利用規約 */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="terms"
                      checked={formData.agreedToTerms}
                      onCheckedChange={(checked) => 
                        updateFormData({ agreedToTerms: checked === true })
                      }
                    />
                    <div className="flex-1">
                      <label htmlFor="terms" className="text-sm font-medium text-gray-700 cursor-pointer">
                        利用規約に同意する *
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        応募には利用規約への同意が必要です。
                        <a href="/terms" target="_blank" className="text-primary-600 hover:underline ml-1">
                          利用規約を確認する
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* ガイドライン */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="guidelines"
                      checked={formData.agreedToGuidelines}
                      onCheckedChange={(checked) => 
                        updateFormData({ agreedToGuidelines: checked === true })
                      }
                    />
                    <div className="flex-1">
                      <label htmlFor="guidelines" className="text-sm font-medium text-gray-700 cursor-pointer">
                        コンテストガイドラインに同意する *
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        このコンテストの参加ガイドラインを確認し、同意してください。
                      </p>
                    </div>
                  </div>
                </div>

                {/* ガイドライン詳細 */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-900 mb-2">
                    <FileText className="w-4 h-4 inline mr-1" />
                    主要なガイドライン
                  </h4>
                  <div className="text-xs text-blue-700 space-y-1">
                    <p>• 著作権を侵害しないオリジナルコンテンツであること</p>
                    <p>• 公序良俗に反する内容を含まないこと</p>
                    <p>• ブランドのイメージに適合する内容であること</p>
                    <p>• 虚偽の情報を含まないこと</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* サイドバー */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{contest.title}</CardTitle>
                <CardDescription>
                  {contest.brandName}
                </CardDescription>
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
                    {new Date(contest.endDate).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>

                {/* カテゴリ */}
                <div>
                  <div className="text-sm text-gray-600 mb-2">カテゴリ</div>
                  <Badge variant="category">{contest.category}</Badge>
                </div>

                {/* ボタン */}
                <div className="pt-4 space-y-3">
                  <Button
                    onClick={handleSubmit}
                    className="w-full"
                    disabled={!canSubmit || isSubmitting}
                    loading={isSubmitting}
                  >
                    {isSubmitting ? '応募中...' : '応募を確定する'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    戻る
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 