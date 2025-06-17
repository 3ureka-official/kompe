import { Play } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Contest } from '@/types/contest'

interface ContestVideoProps {
  contest: Contest
}

export function ContestVideo({ contest }: ContestVideoProps) {
  if (!contest.imageVideoUrl) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Play className="h-5 w-5 text-red-500" />
          イメージ動画
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
          <video
            src={contest.imageVideoUrl}
            controls
            className="w-full h-full object-cover"
            poster={contest.thumbnailUrl}
          >
            お使いのブラウザは動画の再生に対応していません。
          </video>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          コンテストのイメージや参考動画をご覧いただけます。
        </p>
      </CardContent>
    </Card>
  )
} 