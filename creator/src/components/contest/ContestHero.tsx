'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Eye, Heart, Users } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Contest } from '@/types/contest'
import { CONTEST_CATEGORIES, CONTEST_STATUS } from '@/types/contest'

interface ContestHeroProps {
  contest: Contest
}

export function ContestHero({ contest }: ContestHeroProps) {
  const router = useRouter()
  const categoryInfo = CONTEST_CATEGORIES[contest.category]
  const statusInfo = CONTEST_STATUS[contest.status]

  return (
    <div className="relative">
      {/* バナー画像 */}
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <Image
          src={contest.thumbnailUrl}
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
  )
} 