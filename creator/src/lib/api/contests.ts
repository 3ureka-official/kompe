import { Contest, ContestSummary, ContestFilters, ContestSortBy, ContestListResponse } from '@/types/contest'
import contestsData from '@/mock-data/contests.json'

// JSONデータをContest型として扱う
const contests = contestsData.contests as Contest[]

// モックデータから完全なコンテスト情報を取得
export async function getContestById(id: string): Promise<Contest | null> {
  // 実際のAPIでは await fetch(`/api/contests/${id}`) のような処理
  await new Promise(resolve => setTimeout(resolve, 500)) // API遅延をシミュレート
  
  const contest = contests.find(c => c.id === id)
  return contest || null
}

// コンテスト一覧を取得（フィルター・ソート・ページネーション対応）
export async function getContests(params: {
  page?: number
  limit?: number
  filters?: ContestFilters
  sortBy?: ContestSortBy
  search?: string
} = {}): Promise<ContestListResponse> {
  // デフォルト値
  const {
    page = 1,
    limit = 12,
    filters = {},
    sortBy = 'newest',
    search = ''
  } = params

  // API遅延をシミュレート
  await new Promise(resolve => setTimeout(resolve, 300))

  let filteredContests = [...contests]

  // 検索フィルター
  if (search) {
    const searchLower = search.toLowerCase()
    filteredContests = filteredContests.filter(contest =>
      contest.title.toLowerCase().includes(searchLower) ||
      contest.shortDescription.toLowerCase().includes(searchLower) ||
      contest.brandName.toLowerCase().includes(searchLower) ||
      contest.tags.some(tag => tag.toLowerCase().includes(searchLower))
    )
  }

  // カテゴリフィルター
  if (filters.categories && filters.categories.length > 0) {
    filteredContests = filteredContests.filter(contest =>
      filters.categories!.includes(contest.category)
    )
  }

  // ステータスフィルター
  if (filters.status && filters.status.length > 0) {
    filteredContests = filteredContests.filter(contest =>
      filters.status!.includes(contest.status)
    )
  }

  // 賞金額フィルター
  if (filters.minPrizeAmount !== undefined) {
    filteredContests = filteredContests.filter(contest =>
      contest.totalPrizeAmount >= filters.minPrizeAmount!
    )
  }

  if (filters.maxPrizeAmount !== undefined) {
    filteredContests = filteredContests.filter(contest =>
      contest.totalPrizeAmount <= filters.maxPrizeAmount!
    )
  }

  // タグフィルター
  if (filters.tags && filters.tags.length > 0) {
    filteredContests = filteredContests.filter(contest =>
      filters.tags!.some(tag => contest.tags.includes(tag))
    )
  }

  // ソート処理
  filteredContests.sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case 'prize-high':
        return b.totalPrizeAmount - a.totalPrizeAmount
      case 'prize-low':
        return a.totalPrizeAmount - b.totalPrizeAmount
      case 'deadline-soon':
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
      case 'deadline-far':
        return new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
      case 'popular':
        return (b.viewCount + b.likeCount) - (a.viewCount + a.likeCount)
      default:
        return 0
    }
  })

  // ページネーション
  const total = filteredContests.length
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedContests = filteredContests.slice(startIndex, endIndex)

  // ContestSummary形式に変換
  const contestSummaries: ContestSummary[] = paginatedContests.map(contest => ({
    id: contest.id,
    title: contest.title,
    shortDescription: contest.shortDescription,
    thumbnailUrl: contest.thumbnailUrl,
    brandName: contest.brandName,
    brandLogoUrl: contest.brandLogoUrl,
    category: contest.category,
    totalPrizeAmount: contest.totalPrizeAmount,
    participantCount: contest.participantCount,
    endDate: contest.endDate,
    status: contest.status,
    tags: contest.tags
  }))

  return {
    contests: contestSummaries,
    total,
    page,
    limit,
    hasMore: endIndex < total
  }
}

// 人気のコンテストを取得
export async function getPopularContests(limit: number = 6): Promise<ContestSummary[]> {
  const response = await getContests({
    limit,
    sortBy: 'popular',
    filters: { status: ['active'] }
  })
  return response.contests
}

// 新着コンテストを取得
export async function getLatestContests(limit: number = 6): Promise<ContestSummary[]> {
  const response = await getContests({
    limit,
    sortBy: 'newest',
    filters: { status: ['active', 'upcoming'] }
  })
  return response.contests
}

// 締切間近のコンテストを取得
export async function getDeadlineSoonContests(limit: number = 6): Promise<ContestSummary[]> {
  const response = await getContests({
    limit,
    sortBy: 'deadline-soon',
    filters: { status: ['active'] }
  })
  return response.contests
}

// カテゴリ別コンテスト数を取得
export async function getContestCountsByCategory(): Promise<Record<string, number>> {
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const counts: Record<string, number> = {}
  contests.forEach(contest => {
    if (contest.status === 'active' || contest.status === 'upcoming') {
      counts[contest.category] = (counts[contest.category] || 0) + 1
    }
  })
  
  return counts
} 