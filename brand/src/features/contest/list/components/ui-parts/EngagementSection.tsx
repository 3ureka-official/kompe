import {
  EngagementItem,
  VideoIcon,
  ViewIcon,
  LikeIcon,
  CommentIcon,
  ShareIcon,
} from "@/features/contest/list/components/ui-elements/EngagementItem";

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
    <div className={`flex items-center gap-6 ${className}`}>
      <EngagementItem icon={<VideoIcon />} value={videoCount} />
      <EngagementItem icon={<ViewIcon />} value={views} />
      <EngagementItem icon={<LikeIcon />} value={likes} />
      <EngagementItem icon={<CommentIcon />} value={comments} />
      <EngagementItem icon={<ShareIcon />} value={shares} />
    </div>
  );
}
