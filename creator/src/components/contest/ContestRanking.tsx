import Image from 'next/image'
import { Trophy, Heart, MessageCircle, Share, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Contest } from '@/types/contest'

interface ContestRankingProps {
  contest: Contest
}

export function ContestRanking({ contest }: ContestRankingProps) {
  if (!contest.ranking || contest.ranking.length === 0) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Trophy className="h-5 w-5 text-amber-500" />
          現在のランキング
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-semibold text-gray-700">順位</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-700">アカウント</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-700">いいね</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-700">コメント</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-700">シェア</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-700">動画</th>
              </tr>
            </thead>
            <tbody>
              {contest.ranking.map((entry) => (
                <tr key={entry.rank} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-2">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                        ${entry.rank === 1 ? 'bg-yellow-500 text-white' : 
                          entry.rank === 2 ? 'bg-gray-400 text-white' : 
                          entry.rank === 3 ? 'bg-amber-600 text-white' : 
                          'bg-gray-200 text-gray-700'}
                      `}>
                        {entry.rank}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-3">
                      {entry.avatarUrl && (
                        <div className="relative w-10 h-10 rounded-full overflow-hidden">
                          <Image
                            src={entry.avatarUrl}
                            alt={entry.accountName}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-gray-900">{entry.accountName}</div>
                        <div className="text-sm text-gray-500">{entry.accountHandle}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span className="font-medium">{entry.likeCount.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <MessageCircle className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">{entry.commentCount.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Share className="h-4 w-4 text-green-500" />
                      <span className="font-medium">{entry.shareCount.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="text-xs"
                    >
                      <a
                        href={entry.submissionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        視聴
                      </a>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          ※ランキングは定期的に更新されます。最新の順位は参考情報です。
        </p>
      </CardContent>
    </Card>
  )
} 