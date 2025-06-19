'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useContest } from '@/hooks/useContest';
import { APPLICATION_STEPS } from '@/types/application';
import { ApplicationSteps } from '@/components/application/ApplicationSteps';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  CheckCircle, 
  Calendar, 
  Trophy, 
  Users, 
  ArrowRight, 
  Home
} from 'lucide-react';

export default function CompletePage() {
  const router = useRouter();
  const params = useParams();
  const contestId = params.id as string;
  const { user } = useAuth();
  const { contest, loading: contestLoading } = useContest({ id: contestId });

  // 未ログインの場合はログインページへリダイレクト
  useEffect(() => {
    if (!user) {
      router.push(`/auth/login?redirect=/contests/${contestId}/apply/complete`);
    }
  }, [user, contestId, router]);

  // ローディング中
  if (contestLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  // コンテストまたは応募データが見つからない場合
  if (!contest) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">ページが見つかりません</h1>
          <Button onClick={() => router.push('/contests')}>
            コンテスト一覧に戻る
          </Button>
        </div>
      </div>
    );
  }

  // ステップ状態を更新
  const steps = APPLICATION_STEPS.map((step) => ({
    ...step,
    isActive: false,
    isCompleted: true,
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
            <span>応募完了</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">応募完了</h1>
          <p className="text-gray-600">
            応募が正常に完了しました
          </p>
        </div>

        {/* ステップ表示 */}
        <div className="mb-8">
          <ApplicationSteps steps={steps} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* メインコンテンツ */}
          <div className="lg:col-span-2 space-y-6">
            {/* 完了メッセージ */}
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-green-900 mb-2">
                    応募を完了しました！
                  </h2>
                  
                </div>
              </CardContent>
            </Card>
          </div>

          {/* サイドバー */}
          <div className="lg:col-span-1 space-y-6">
            {/* コンテスト情報 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{contest.title}</CardTitle>
                <CardDescription>
                  {contest.brandName}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 賞金 */}
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <div>
                    <div className="text-sm text-gray-600">賞金総額</div>
                    <div className="font-bold text-primary-600">
                      ¥{contest.totalPrizeAmount.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* 参加者数 */}
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="text-sm text-gray-600">参加者数</div>
                    <div className="font-medium">
                      {contest.participantCount.toLocaleString()}人
                    </div>
                  </div>
                </div>

                {/* 応募期限 */}
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-500" />
                  <div>
                    <div className="text-sm text-gray-600">応募期限</div>
                    <div className="font-medium">
                      {new Date(contest.endDate).toLocaleDateString('ja-JP')}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* アクション */}
            <div className="space-y-3">
              <Button
                onClick={() => router.push('/applications')}
                className="w-full"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                応募一覧を見る
              </Button>
              
              <Button
                variant="outline"
                onClick={() => router.push('/contests')}
                className="w-full"
              >
                他のコンテストを見る
              </Button>
              
              <Button
                variant="outline"
                onClick={() => router.push('/dashboard')}
                className="w-full"
              >
                <Home className="w-4 h-4 mr-2" />
                ダッシュボードに戻る
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 