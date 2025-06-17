'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Calendar, 
  Users, 
  Trophy, 
  Clock, 
  Heart, 
  Share2, 
  Eye,
  MapPin,
  CheckCircle,
  AlertCircle,
  ArrowLeft
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useContest } from '@/hooks/useContest'
import { CONTEST_CATEGORIES, CONTEST_STATUS } from '@/types/contest'

export default function ContestDetailPage() {
  const params = useParams()
  const router = useRouter()
  const contestId = params.id as string

  const { contest, loading, error } = useContest({
    id: contestId,
    autoFetch: true
  })

  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
  } | null>(null)

  // カウントダウンタイマー
  useEffect(() => {
    if (!contest || contest.status !== 'active') return

    const updateTimer = () => {
      const now = new Date().getTime()
      const endTime = new Date(contest.endDate).getTime()
      const difference = endTime - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      } else {
        setTimeLeft(null)
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [contest])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
              <div>
                <div className="h-48 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !contest) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            コンテストが見つかりません
          </h1>
          <p className="text-gray-600 mb-6">
            {error || 'お探しのコンテストは存在しないか、削除された可能性があります。'}
          </p>
          <Button onClick={() => router.push('/contests')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            コンテスト一覧に戻る
          </Button>
        </div>
      </div>
    )
  }

  const categoryInfo = CONTEST_CATEGORIES[contest.category]
  const statusInfo = CONTEST_STATUS[contest.status]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヒーローセクション */}
      <div className="relative">
        {/* バナー画像 */}
        <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
          <Image
            src={contest.bannerUrl || contest.thumbnailUrl}
            alt={contest.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          
          {/* ヘッダー情報 */}
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
              <div className="flex items-center gap-4 mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.back()}
                  className="text-white hover:bg-white/20"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  戻る
                </Button>
                
                <Badge 
                  variant={contest.status === 'active' ? 'success' : 'secondary'}
                  className="text-white border-white/30"
                >
                  {statusInfo.label}
                </Badge>
                
                <Badge variant="category" className="text-white border-white/30">
                  {categoryInfo.label}
                </Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {contest.title}
              </h1>
              
              <div className="flex items-center gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  {contest.brandLogoUrl && (
                    <div className="relative h-8 w-8 rounded-full overflow-hidden">
                      <Image
                        src={contest.brandLogoUrl}
                        alt={contest.brandName}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <span className="font-medium">{contest.brandName}</span>
                </div>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {contest.viewCount.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {contest.likeCount.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {contest.participantCount.toLocaleString()}人参加
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左側：詳細情報 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 概要 */}
            <Card>
              <CardHeader>
                <CardTitle>コンテスト概要</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {contest.description}
                </p>
              </CardContent>
            </Card>

            {/* 賞金情報 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  賞金・賞品
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-2xl font-bold text-primary">
                    総額 ¥{contest.totalPrizeAmount.toLocaleString()}
                  </div>
                  
                  <div className="space-y-3">
                    {contest.prizes.map((prize) => (
                      <div key={prize.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-semibold">{prize.title}</div>
                          {prize.description && (
                            <div className="text-sm text-gray-600">{prize.description}</div>
                          )}
                        </div>
                        <div className="text-lg font-bold text-primary">
                          ¥{prize.amount.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 応募条件 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  応募条件・ガイドライン
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">応募条件</h4>
                    <ul className="space-y-2">
                      {contest.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">ガイドライン</h4>
                    <ul className="space-y-2">
                      {contest.guidelines.map((guideline, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{guideline}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* タグ */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-2">
                  {contest.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右側：応募情報・アクション */}
          <div className="space-y-6">
            {/* 締切カウントダウン */}
            {contest.status === 'active' && timeLeft && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <Clock className="h-5 w-5" />
                    締切まで
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-red-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-red-600">{timeLeft.days}</div>
                      <div className="text-sm text-red-600">日</div>
                    </div>
                    <div className="bg-red-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-red-600">{timeLeft.hours}</div>
                      <div className="text-sm text-red-600">時間</div>
                    </div>
                    <div className="bg-red-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-red-600">{timeLeft.minutes}</div>
                      <div className="text-sm text-red-600">分</div>
                    </div>
                    <div className="bg-red-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-red-600">{timeLeft.seconds}</div>
                      <div className="text-sm text-red-600">秒</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 開催期間情報 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  開催期間
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600">開始日</div>
                  <div className="font-semibold">
                    {new Date(contest.startDate).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      weekday: 'short'
                    })}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600">締切日</div>
                  <div className="font-semibold">
                    {new Date(contest.endDate).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      weekday: 'short'
                    })}
                  </div>
                </div>
                
                {contest.judgingEndDate && (
                  <div>
                    <div className="text-sm text-gray-600">審査終了予定</div>
                    <div className="font-semibold">
                      {new Date(contest.judgingEndDate).toLocaleDateString('ja-JP', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        weekday: 'short'
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 参加者情報 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  参加者情報
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600">現在の参加者数</div>
                  <div className="text-2xl font-bold text-primary">
                    {contest.participantCount.toLocaleString()}人
                  </div>
                </div>
                
                {contest.maxParticipants && (
                  <div>
                    <div className="text-sm text-gray-600">定員</div>
                    <div className="font-semibold">
                      {contest.maxParticipants.toLocaleString()}人
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ 
                          width: `${Math.min((contest.participantCount / contest.maxParticipants) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* アクションボタン */}
            <div className="space-y-3">
              {contest.status === 'active' ? (
                <Button size="lg" className="w-full" variant="primary">
                  <Trophy className="h-5 w-5 mr-2" />
                  応募する
                </Button>
              ) : (
                <Button size="lg" className="w-full" disabled>
                  {contest.status === 'upcoming' && '開催前'}
                  {contest.status === 'ended' && '応募終了'}
                  {contest.status === 'judging' && '審査中'}
                  {contest.status === 'completed' && '終了'}
                </Button>
              )}
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm" className="w-full">
                  <Heart className="h-4 w-4 mr-2" />
                  お気に入り
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  シェア
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 