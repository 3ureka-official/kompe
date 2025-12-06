import { EngagementItem } from "@/features/contest/detail/components/ui-elements/EngagementItem";

import {
  VideoIcon,
  EyeIcon,
  HeartIcon,
  MessageCircleIcon,
  ShareIcon,
} from "lucide-react";

type Props = {
  videoCount: number;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  className?: string;
};

/**
 * エンゲージメント情報を束ねるセクションコンポーネント
 */
export function EngagementSection({
  videoCount,
  views,
  likes,
  comments,
  shares,
  className = "",
}: Props) {
  return (
    <div
      className={`flex items-center gap-1 bg-primary border border-primary rounded-lg p-4 bg-primary-50 ${className}`}
    >
      <EngagementItem
        text="動画投稿数"
        icon={<VideoIcon className="w-5 h-5 text-white" />}
        value={videoCount}
      />
      <EngagementItem
        text="閲覧数"
        icon={<EyeIcon className="w-5 h-5 text-white" />}
        value={views}
      />
      <EngagementItem
        text="いいね数"
        icon={<HeartIcon className="w-5 h-5 text-white" />}
        value={likes}
      />
      <EngagementItem
        text="コメント数"
        icon={<MessageCircleIcon className="w-5 h-5 text-white" />}
        value={comments}
      />
      <EngagementItem
        text="シェア数"
        icon={<ShareIcon className="w-5 h-5 text-white" />}
        value={shares}
      />
    </div>
  );
}
