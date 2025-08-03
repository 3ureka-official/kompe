import Image from "next/image";
import { Trophy, Heart, MessageCircle, ExternalLink, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Contest } from "@/types/contest";

interface ContestRankingProps {
  contest: Contest;
}

export function ContestRanking({ contest }: ContestRankingProps) {
  if (!contest.ranking || contest.ranking.length === 0) return null;

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
                <th className="text-left py-3 px-2 font-semibold text-gray-700">
                  順位
                </th>
                <th className="text-left py-3 px-2 font-semibold text-gray-700">
                  クリエイター
                </th>
                <th className="text-center py-3 px-2 font-semibold text-gray-700">
                  スコア
                </th>
                <th className="text-center py-3 px-2 font-semibold text-gray-700">
                  再生数
                </th>
                <th className="text-center py-3 px-2 font-semibold text-gray-700">
                  いいね
                </th>
                <th className="text-center py-3 px-2 font-semibold text-gray-700">
                  コメント
                </th>
                <th className="text-center py-3 px-2 font-semibold text-gray-700">
                  賞金
                </th>
                <th className="text-center py-3 px-2 font-semibold text-gray-700">
                  動画
                </th>
              </tr>
            </thead>
            <tbody>
              {contest.ranking.map((entry) => (
                <tr
                  key={entry.rank}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`
                        w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                        ${
                          entry.rank === 1
                            ? "bg-yellow-500 text-white"
                            : entry.rank === 2
                              ? "bg-gray-400 text-white"
                              : entry.rank === 3
                                ? "bg-amber-600 text-white"
                                : "bg-gray-200 text-gray-700"
                        }
                      `}
                      >
                        {entry.rank}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-3">
                      {entry.creator.avatar && (
                        <div className="relative w-10 h-10 rounded-full overflow-hidden">
                          <Image
                            src={entry.creator.avatar}
                            alt={entry.creator.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-gray-900">
                          {entry.creator.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          @{entry.creator.tiktokId}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <span className="font-bold text-lg text-blue-600">
                      {entry.score.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Eye className="h-4 w-4 text-purple-500" />
                      <span className="font-medium">
                        {entry.metrics.views.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span className="font-medium">
                        {entry.metrics.likes.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <MessageCircle className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">
                        {entry.metrics.comments.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-center">
                    {entry.prizeAmount > 0 ? (
                      <span className="font-bold text-green-600">
                        ¥{entry.prizeAmount.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="py-4 px-2 text-center">
                    <Button variant="outline" size="sm" className="text-xs">
                      <a
                        href={entry.videoUrl}
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
        <div className="mt-4 space-y-2">
          <p className="text-sm text-gray-500">
            ※ランキングは
            {contest.evaluationType === "views"
              ? "再生数"
              : contest.evaluationType === "likes"
                ? "いいね数"
                : contest.evaluationType === "comments"
                  ? "コメント数"
                  : contest.evaluationType === "shares"
                    ? "シェア数"
                    : "総合評価"}
            に基づいて決定されます。
          </p>
          <p className="text-sm text-gray-500">
            ※ランキングは定期的に更新されます。最新の順位は参考情報です。
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
