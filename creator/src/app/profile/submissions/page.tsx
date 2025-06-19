'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileService } from '@/lib/api/profile';
import { MySubmission, SubmissionStats } from '@/types/profile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AlertCircle, ArrowLeft, Eye, Heart, MessageCircle, Share2, Trophy, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import Link from 'next/link';
import Image from 'next/image';

export default function SubmissionsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<MySubmission[]>([]);
  const [stats, setStats] = useState<SubmissionStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  // 応募履歴を取得
  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const [submissionsData, statsData] = await Promise.all([
          ProfileService.getUserSubmissions(user.id, 1, 10),
          ProfileService.getSubmissionStats(user.id)
        ]);
        
        setSubmissions(submissionsData.submissions);
        setStats(statsData);
        setHasMore(submissionsData.hasMore);
        setPage(1);
      } catch {
        setError('応募履歴の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [user]);

  // さらに読み込む
  const loadMore = async () => {
    if (!user || loadingMore) return;

    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      const submissionsData = await ProfileService.getUserSubmissions(user.id, nextPage, 10);
      
      setSubmissions(prev => [...prev, ...submissionsData.submissions]);
      setHasMore(submissionsData.hasMore);
      setPage(nextPage);
    } catch {
      setError('追加データの取得に失敗しました');
    } finally {
      setLoadingMore(false);
    }
  };

  // ステータスバッジの色を取得
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />審査中</Badge>;
      case 'approved':
        return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />承認済み</Badge>;
      case 'rejected':
        return <Badge variant="secondary" className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />却下</Badge>;
      case 'disqualified':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800"><AlertTriangle className="w-3 h-3 mr-1" />失格</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // 数値のフォーマット
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ja-JP').format(num);
  };

  // 日付のフォーマット
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <span className="text-primary-600">応募履歴</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">応募履歴</h1>
                <p className="text-gray-600">
                  これまでの応募とその結果を確認できます
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => router.push('/profile')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                戻る
              </Button>
            </div>
          </div>

          {/* エラーメッセージ */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* 統計情報 */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">総応募数</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Eye className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">承認済み</p>
                      <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-full">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">入賞回数</p>
                      <p className="text-2xl font-bold text-yellow-600">{stats.winner}</p>
                    </div>
                    <div className="p-3 bg-yellow-100 rounded-full">
                      <Trophy className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">獲得賞金</p>
                      <p className="text-2xl font-bold text-primary-600">¥{formatNumber(stats.totalPrizeAmount)}</p>
                    </div>
                    <div className="p-3 bg-primary-100 rounded-full">
                      <Trophy className="w-6 h-6 text-primary-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* 応募履歴一覧 */}
          <Card>
            <CardHeader>
              <CardTitle>応募履歴</CardTitle>
              <CardDescription>
                最新の応募から順に表示されます
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submissions.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">応募履歴がありません</h3>
                  <p className="text-gray-600 mb-6">
                    まだコンテストに応募していません。<br />
                    気になるコンテストを見つけて応募してみましょう。
                  </p>
                  <Link href="/contests">
                    <Button>
                      コンテストを探す
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {submissions.map((submission) => (
                    <div key={submission.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        {/* コンテストサムネイル */}
                        <div className="flex-shrink-0">
                          <Image
                            src={submission.contestThumbnailUrl || '/placeholder-contest.jpg'}
                            alt={submission.contestTitle}
                            width={80}
                            height={80}
                            className="rounded-lg object-cover"
                          />
                        </div>

                        {/* 応募情報 */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                {submission.contestTitle}
                              </h3>
                              <p className="text-sm text-gray-600">{submission.brandName}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(submission.submissionStatus)}
                              {submission.finalRank && submission.finalRank <= 3 && (
                                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                  <Trophy className="w-3 h-3 mr-1" />
                                  {submission.finalRank}位
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* メトリクス */}
                          {submission.metrics && (
                            <div className="flex items-center gap-4 mb-3">
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <Eye className="w-4 h-4" />
                                {formatNumber(submission.metrics.viewCount)}
                              </div>
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <Heart className="w-4 h-4" />
                                {formatNumber(submission.metrics.likeCount)}
                              </div>
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <MessageCircle className="w-4 h-4" />
                                {formatNumber(submission.metrics.commentCount)}
                              </div>
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <Share2 className="w-4 h-4" />
                                {formatNumber(submission.metrics.shareCount)}
                              </div>
                              <div className="text-sm text-gray-600">
                                エンゲージメント率: {submission.metrics.engagementRate.toFixed(1)}%
                              </div>
                            </div>
                          )}

                          {/* 賞金・スコア */}
                          <div className="flex items-center gap-4 mb-3">
                            {submission.finalScore && (
                              <div className="text-sm">
                                <span className="text-gray-600">スコア: </span>
                                <span className="font-medium">{formatNumber(submission.finalScore)}</span>
                              </div>
                            )}
                            {submission.prizeAmount && (
                              <div className="text-sm">
                                <span className="text-gray-600">賞金: </span>
                                <span className="font-medium text-green-600">¥{formatNumber(submission.prizeAmount)}</span>
                              </div>
                            )}
                          </div>

                          {/* 日付 */}
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>応募日: {formatDate(submission.submittedAt)}</span>
                            {submission.approvedAt && (
                              <span>承認日: {formatDate(submission.approvedAt)}</span>
                            )}
                          </div>
                        </div>

                        {/* アクション */}
                        <div className="flex-shrink-0">
                          <Link href={`/contests/${submission.contestId}`}>
                            <Button variant="outline" size="sm">
                              詳細を見る
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* さらに読み込む */}
                  {hasMore && (
                    <div className="text-center pt-6">
                      <Button
                        variant="outline"
                        onClick={loadMore}
                        disabled={loadingMore}
                      >
                        {loadingMore ? '読み込み中...' : 'さらに読み込む'}
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
} 