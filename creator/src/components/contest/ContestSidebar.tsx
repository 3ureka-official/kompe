'use client'

import { useEffect, useState } from 'react'
import { Calendar, Users, Clock, Trophy, Heart, Share2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Contest } from '@/types/contest'
import { useRouter } from 'next/navigation'

interface ContestSidebarProps {
  contest: Contest
}

export function ContestSidebar({ contest }: ContestSidebarProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
  } | null>(null)
  const router = useRouter()
  // カウントダウンタイマー
  useEffect(() => {
    if (contest.status !== 'active') return

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

  const handleApply = () => {
    router.push(`/contests/${contest.id}/apply`)
  }

  return (
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

      {/* 応募ボタン */}
      <div className="sticky top-4">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="pt-6">
            <div className="space-y-4">
              {contest.status === 'active' ? (
                <Button size="lg" className="w-full" variant="primary" style={{ cursor: 'pointer' }} onClick={handleApply}>
                  <Trophy className="h-5 w-5 mr-2" />
                  このコンテストに応募する
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

              <div className="text-center pt-2">
                <p className="text-sm text-gray-600">
                  応募には TikTok アカウントが必要です
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 