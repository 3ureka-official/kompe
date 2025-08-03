import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Users, Trophy, Clock } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ContestSummary,
  CONTEST_CATEGORIES,
  CONTEST_STATUS,
} from "@/types/contest";

interface ContestCardProps {
  contest: ContestSummary;
  className?: string;
}

const ContestCard: React.FC<ContestCardProps> = ({ contest, className }) => {
  // 締切までの日数を計算
  const getDaysUntilDeadline = (endDate: string) => {
    const now = new Date();
    const deadline = new Date(endDate);
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // 金額をフォーマット
  const formatPrize = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(0)}万円`;
    } else if (amount >= 10000) {
      return `${(amount / 10000).toFixed(0)}万円`;
    } else {
      return `${amount.toLocaleString()}円`;
    }
  };

  const daysLeft = getDaysUntilDeadline(contest.endDate);
  const categoryInfo = CONTEST_CATEGORIES[contest.category];
  const statusInfo = CONTEST_STATUS[contest.status];

  return (
    <Card hover className={className}>
      <div className="relative">
        {/* サムネイル画像 */}
        <div className="relative aspect-video overflow-hidden rounded-t-lg">
          <Image
            src={contest.thumbnailUrl}
            alt={contest.title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />

          {/* ステータスバッジ */}
          <div className="absolute top-3 left-3">
            <Badge
              variant={contest.status === "active" ? "success" : "secondary"}
              className={statusInfo.color}
            >
              {statusInfo.label}
            </Badge>
          </div>

          {/* 締切カウントダウン */}
          {contest.status === "active" && daysLeft > 0 && (
            <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
              <Clock className="h-3 w-3" />
              あと{daysLeft}日
            </div>
          )}
        </div>

        <CardContent className="p-4">
          {/* ブランド情報 */}
          <div className="flex items-center gap-2 mb-2">
            {contest.brandLogoUrl && (
              <div className="relative h-6 w-6 rounded-full overflow-hidden">
                <Image
                  src={contest.brandLogoUrl}
                  alt={contest.brandName}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <span className="text-sm text-muted-foreground font-medium">
              {contest.brandName}
            </span>
          </div>

          {/* タイトル */}
          <h3 className="font-bold text-lg mb-2 line-clamp-2 leading-tight">
            {contest.title}
          </h3>

          {/* 説明 */}
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {contest.shortDescription}
          </p>

          {/* カテゴリとタグ */}
          <div className="flex flex-wrap gap-1 mb-3">
            <Badge variant="category" size="sm" className={categoryInfo.color}>
              {categoryInfo.label}
            </Badge>
            {contest.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" size="sm">
                #{tag}
              </Badge>
            ))}
            {contest.tags.length > 2 && (
              <Badge variant="outline" size="sm">
                +{contest.tags.length - 2}
              </Badge>
            )}
          </div>

          {/* 統計情報 */}
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Trophy className="h-4 w-4 text-primary" />
                <span className="font-semibold text-primary">
                  {formatPrize(contest.totalPrizeAmount)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{contest.participantCount}人参加</span>
              </div>
            </div>
          </div>

          {/* 締切日 */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              締切:{" "}
              {new Date(contest.endDate).toLocaleDateString("ja-JP", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Link href={`/contests/${contest.id}`} className="w-full">
            <Button
              variant="primary"
              className="w-full"
              disabled={contest.status !== "active"}
            >
              {contest.status === "active" ? "詳細を見る" : "応募終了"}
            </Button>
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ContestCard;
