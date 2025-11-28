import { Contest } from "@/types/Contest";

export type ContestStatusType = "draft" | "scheduled" | "holding" | "ended";

/**
 * コンテストの現在の状態を判定（表示用）
 * @param contest コンテストデータ
 * @returns 状態タイプ
 */
export function getContestStatusType(contest: Contest): ContestStatusType {
  if (contest.is_draft) {
    return "draft";
  }

  const now = new Date();
  const contestEndDate = new Date(contest.contest_end_date);

  // 終了判定（最優先）
  if (now > contestEndDate) {
    return "ended";
  }

  // 応募期間、動画制作期間、開催期間のいずれかであれば「開催中」
  if (contest.entry_start_date && contest.entry_end_date) {
    const entryStart = new Date(contest.entry_start_date);
    const entryEnd = new Date(contest.entry_end_date);
    if (now >= entryStart && now <= entryEnd) {
      return "holding";
    }
  }

  if (
    contest.video_production_start_date &&
    contest.video_production_end_date
  ) {
    const videoStart = new Date(contest.video_production_start_date);
    const videoEnd = new Date(contest.video_production_end_date);
    if (now >= videoStart && now <= videoEnd) {
      return "holding";
    }
  }

  const contestStartDate = new Date(contest.contest_start_date);
  if (now >= contestStartDate && now <= contestEndDate) {
    return "holding";
  }

  // 開催前
  return "scheduled";
}

/**
 * フィルター用の詳細ステータスを取得
 * @param contest コンテストデータ
 * @returns 詳細ステータスタイプ
 */
export type ContestDetailStatusType =
  | "draft"
  | "entry"
  | "video_production"
  | "contest"
  | "ended"
  | "scheduled";

export function getContestDetailStatusType(
  contest: Contest,
): ContestDetailStatusType {
  if (contest.is_draft) {
    return "draft";
  }

  const now = new Date();

  // 応募期間の判定
  if (contest.entry_start_date && contest.entry_end_date) {
    const entryStart = new Date(contest.entry_start_date);
    const entryEnd = new Date(contest.entry_end_date);
    if (now >= entryStart && now <= entryEnd) {
      return "entry";
    }
  }

  // 動画制作期間の判定
  if (
    contest.video_production_start_date &&
    contest.video_production_end_date
  ) {
    const videoStart = new Date(contest.video_production_start_date);
    const videoEnd = new Date(contest.video_production_end_date);
    if (now >= videoStart && now <= videoEnd) {
      return "video_production";
    }
  }

  // 開催期間の判定
  const contestStartDate = new Date(contest.contest_start_date);
  const contestEndDate = new Date(contest.contest_end_date);
  if (now >= contestStartDate && now <= contestEndDate) {
    return "contest";
  }

  // 終了
  if (now > contestEndDate) {
    return "ended";
  }

  // 開催前
  return "scheduled";
}

/**
 * レガシー関数（後方互換性のため保持）
 * @deprecated getContestStatusTypeを使用してください
 */
export function getContestStatus(contest: Contest) {
  const statusType = getContestStatusType(contest);

  switch (statusType) {
    case "draft":
      return 0;
    case "scheduled":
      return 1;
    case "holding":
      return 2;
    case "ended":
      return 3;
    default:
      return 0;
  }
}
