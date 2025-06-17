import { Trophy } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Contest } from '@/types/contest'

interface ContestDescriptionProps {
  contest: Contest
}

export function ContestDescription({ contest }: ContestDescriptionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">コンテスト説明</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {contest.description}
          </p>
          
          {/* 賞金情報 */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="h-5 w-5 text-yellow-600" />
              <h3 className="font-semibold text-yellow-800">賞金・賞品</h3>
            </div>
            <div className="text-2xl font-bold text-yellow-700 mb-3">
              総額 ¥{contest.totalPrizeAmount.toLocaleString()}
            </div>
            <div className="space-y-2">
              {contest.prizes.map((prize) => (
                <div key={prize.rank} className="flex items-center justify-between p-2 bg-white/50 rounded">
                  <div>
                    <div className="font-medium text-yellow-800">{prize.title}</div>
                    {prize.description && (
                      <div className="text-sm text-yellow-600">{prize.description}</div>
                    )}
                  </div>
                  <div className="font-bold text-yellow-700">
                    ¥{prize.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* タグ */}
          <div className="flex flex-wrap gap-2">
            {contest.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 