import {
  Contest,
  ContestSummary,
  ContestFilters,
  ContestSortBy,
  ContestListResponse,
  ContestCategory,
  ContestStatus,
  EvaluationType,
} from "@/types/contest";
import contestsData from "@/mock-data/contests.json";
import brandsData from "@/mock-data/brands.json";
import creatorsData from "@/mock-data/creators.json";
import contestAssetsData from "@/mock-data/contest_assets.json";
import submissionsData from "@/mock-data/submissions.json";

// JSONデータを型として扱う
const contests = contestsData.contests;
const brands = brandsData.brands;
const creators = creatorsData.creators;
const contestAssets = contestAssetsData.contest_assets;
const submissions = submissionsData.submissions;
const videoMetricsHistory = submissionsData.video_metrics_history;

// 新しいDB構造に対応したコンテスト詳細情報を構築
function buildContestDetail(contestId: string): Contest | null {
  const contest = contests.find((c) => c.id === contestId);
  if (!contest) return null;

  const brand = brands.find((b) => b.id === contest.brand_id);
  if (!brand) return null;

  const assets = contestAssets.filter((a) => a.contest_id === contestId);
  const thumbnailAsset = assets.find((a) => a.asset_type === "thumbnail");

  // 応募情報を取得
  const contestSubmissions = submissions.filter(
    (s) => s.contest_id === contestId && s.submission_status === "approved",
  );

  // ランキング情報を構築
  const ranking = contestSubmissions
    .sort((a, b) => (a.final_rank || 999) - (b.final_rank || 999))
    .map((submission) => {
      const creator = creators.find((c) => c.id === submission.creator_id);
      const metrics = videoMetricsHistory.find(
        (m) => m.submission_id === submission.id,
      );

      return {
        rank: submission.final_rank || 0,
        creator: {
          id: creator?.id || "",
          name: creator?.tiktok_username || "",
          avatar: creator?.tiktok_avatar_url || "",
          tiktokId: creator?.tiktok_id || "",
        },
        score: submission.final_score || 0,
        videoUrl: submission.tiktok_video_url,
        metrics: {
          views: metrics?.view_count || 0,
          likes: metrics?.like_count || 0,
          comments: metrics?.comment_count || 0,
          shares: metrics?.share_count || 0,
        },
        prizeAmount: submission.prize_amount || 0,
      };
    });

  // 統計情報を計算
  const totalViews = videoMetricsHistory
    .filter((m) => contestSubmissions.some((s) => s.id === m.submission_id))
    .reduce((sum, m) => sum + m.view_count, 0);

  const totalLikes = videoMetricsHistory
    .filter((m) => contestSubmissions.some((s) => s.id === m.submission_id))
    .reduce((sum, m) => sum + m.like_count, 0);

  // Contest型に変換
  const contestDetail: Contest = {
    id: contest.id,
    title: contest.title,
    shortDescription: contest.description.substring(0, 100) + "...",
    description: contest.description,
    thumbnailUrl: thumbnailAsset?.file_url || "",
    brandName: brand.company_name,
    category: contest.category as ContestCategory,
    requirements: contest.requirements,
    inspirations: contest.inspirations,
    startDate: contest.start_date,
    endDate: contest.end_date,
    totalPrizeAmount: contest.total_prize,
    prizeStructure: contest.prize_structure,
    participantCount: contestSubmissions.length,
    viewCount: totalViews,
    likeCount: totalLikes,
    status: contest.status as ContestStatus,
    tags: [contest.category, brand.company_name.split(" ")[0]],
    createdAt: contest.created_at,
    updatedAt: contest.updated_at,
    publishedAt: contest.published_at,

    // 拡張情報
    evaluationType: contest.evaluation_type as EvaluationType,
    ranking: ranking,

    // ブランド詳細情報
    brandInfo: {
      id: brand.id,
      name: brand.company_name,
      contactName: brand.contact_name,
      email: brand.email,
      phone: brand.phone,
      website: brand.website,
    },
  };

  return contestDetail;
}

// モックデータから完全なコンテスト情報を取得
export async function getContestById(id: string): Promise<Contest | null> {
  // 実際のAPIでは await fetch(`/api/contests/${id}`) のような処理
  await new Promise((resolve) => setTimeout(resolve, 500)); // API遅延をシミュレート

  return buildContestDetail(id);
}

// コンテスト一覧用のサマリー情報を構築
function buildContestSummary(contestId: string): ContestSummary | null {
  const contest = contests.find((c) => c.id === contestId);
  if (!contest) return null;

  const brand = brands.find((b) => b.id === contest.brand_id);
  if (!brand) return null;

  const assets = contestAssets.filter((a) => a.contest_id === contestId);
  const thumbnailAsset = assets.find((a) => a.asset_type === "thumbnail");
  const brandLogoAsset = assets.find((a) => a.asset_type === "brand_logo");

  const contestSubmissions = submissions.filter(
    (s) => s.contest_id === contestId && s.submission_status === "approved",
  );

  return {
    id: contest.id,
    title: contest.title,
    shortDescription: contest.description.substring(0, 100) + "...",
    thumbnailUrl: thumbnailAsset?.file_url || "",
    brandName: brand.company_name,
    brandLogoUrl: brandLogoAsset?.file_url || "",
    category: contest.category as ContestCategory,
    totalPrizeAmount: contest.total_prize,
    participantCount: contestSubmissions.length,
    endDate: contest.end_date,
    status: contest.status as ContestStatus,
    tags: [contest.category, brand.company_name.split(" ")[0]],
  };
}

// コンテスト一覧を取得（フィルター・ソート・ページネーション対応）
export async function getContests(
  params: {
    page?: number;
    limit?: number;
    filters?: ContestFilters;
    sortBy?: ContestSortBy;
    search?: string;
  } = {},
): Promise<ContestListResponse> {
  // デフォルト値
  const {
    page = 1,
    limit = 12,
    filters = {},
    sortBy = "newest",
    search = "",
  } = params;

  // API遅延をシミュレート
  await new Promise((resolve) => setTimeout(resolve, 300));

  // 全コンテストのサマリーを構築
  let contestSummaries = contests
    .map((contest) => buildContestSummary(contest.id))
    .filter((summary): summary is ContestSummary => summary !== null);

  // 検索フィルター
  if (search) {
    const searchLower = search.toLowerCase();
    contestSummaries = contestSummaries.filter(
      (contest) =>
        contest.title.toLowerCase().includes(searchLower) ||
        contest.shortDescription.toLowerCase().includes(searchLower) ||
        contest.brandName.toLowerCase().includes(searchLower) ||
        contest.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
    );
  }

  // カテゴリフィルター
  if (filters.categories && filters.categories.length > 0) {
    contestSummaries = contestSummaries.filter((contest) =>
      filters.categories!.includes(contest.category),
    );
  }

  // ステータスフィルター
  if (filters.status && filters.status.length > 0) {
    contestSummaries = contestSummaries.filter((contest) =>
      filters.status!.includes(contest.status),
    );
  }

  // 賞金額フィルター
  if (filters.minPrizeAmount !== undefined) {
    contestSummaries = contestSummaries.filter(
      (contest) => contest.totalPrizeAmount >= filters.minPrizeAmount!,
    );
  }

  if (filters.maxPrizeAmount !== undefined) {
    contestSummaries = contestSummaries.filter(
      (contest) => contest.totalPrizeAmount <= filters.maxPrizeAmount!,
    );
  }

  // タグフィルター
  if (filters.tags && filters.tags.length > 0) {
    contestSummaries = contestSummaries.filter((contest) =>
      filters.tags!.some((tag) => contest.tags.includes(tag)),
    );
  }

  // ソート処理
  contestSummaries.sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
      case "oldest":
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
      case "prize-high":
        return b.totalPrizeAmount - a.totalPrizeAmount;
      case "prize-low":
        return a.totalPrizeAmount - b.totalPrizeAmount;
      case "deadline-soon":
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
      case "deadline-far":
        return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
      case "popular":
        return b.participantCount - a.participantCount;
      default:
        return 0;
    }
  });

  // ページネーション
  const total = contestSummaries.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedContests = contestSummaries.slice(startIndex, endIndex);

  return {
    contests: paginatedContests,
    total,
    page,
    limit,
    hasMore: endIndex < total,
  };
}

// 人気のコンテストを取得
export async function getPopularContests(
  limit: number = 6,
): Promise<ContestSummary[]> {
  const response = await getContests({
    limit,
    sortBy: "popular",
    filters: { status: ["active"] },
  });
  return response.contests;
}

// 新着コンテストを取得
export async function getLatestContests(
  limit: number = 6,
): Promise<ContestSummary[]> {
  const response = await getContests({
    limit,
    sortBy: "newest",
    filters: { status: ["active", "upcoming"] },
  });
  return response.contests;
}

// 締切間近のコンテストを取得
export async function getDeadlineSoonContests(
  limit: number = 6,
): Promise<ContestSummary[]> {
  const response = await getContests({
    limit,
    sortBy: "deadline-soon",
    filters: { status: ["active"] },
  });
  return response.contests;
}

// カテゴリ別コンテスト数を取得
export async function getContestCountsByCategory(): Promise<
  Record<string, number>
> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const counts: Record<string, number> = {};
  contests.forEach((contest) => {
    if (contest.status === "active" || contest.status === "upcoming") {
      counts[contest.category] = (counts[contest.category] || 0) + 1;
    }
  });

  return counts;
}
