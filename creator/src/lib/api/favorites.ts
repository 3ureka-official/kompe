import { 
  ContestSummary, 
  ContestListResponse, 
  UserFavorite, 
  FavoriteTab,
  FavoriteFilters 
} from '@/types/contest'
import { getContests } from './contests'
import favoritesData from '@/mock-data/favorites.json'

// JSONデータをUserFavorite型として扱う
const favorites = favoritesData as UserFavorite[]

// ユーザーのお気に入りコンテスト一覧を取得
export async function getUserFavorites(params: {
  userId: string
  page?: number
  limit?: number
  tab?: FavoriteTab
  filters?: FavoriteFilters
  search?: string
} = { userId: 'user_001' }): Promise<ContestListResponse> {
  const {
    userId,
    page = 1,
    limit = 12,
    tab,
    filters = {},
    search = ''
  } = params

  // API遅延をシミュレート
  await new Promise(resolve => setTimeout(resolve, 400))

  // ユーザーのお気に入り一覧を取得
  const userFavorites = favorites.filter(fav => fav.userId === userId)
  const contestIds = userFavorites.map(fav => fav.contestId)

  // すべてのコンテストを取得
  const allContests = await getContests({ limit: 1000 })
  
  // お気に入りしたコンテストのみをフィルター
  let favoriteContests = allContests.contests.filter(contest => 
    contestIds.includes(contest.id)
  )

  // タブによるフィルタリング
  if (tab) {
    favoriteContests = favoriteContests.filter(contest => {
      switch (tab) {
        case 'upcoming':
          return contest.status === 'upcoming'
        case 'active':
          return contest.status === 'active'
        case 'ended':
          return contest.status === 'ended' || contest.status === 'judging' || contest.status === 'completed'
        default:
          return true
      }
    })
  }

  // 検索フィルター
  if (search) {
    const searchLower = search.toLowerCase()
    favoriteContests = favoriteContests.filter(contest =>
      contest.title.toLowerCase().includes(searchLower) ||
      contest.shortDescription.toLowerCase().includes(searchLower) ||
      contest.brandName.toLowerCase().includes(searchLower) ||
      contest.tags.some(tag => tag.toLowerCase().includes(searchLower))
    )
  }

  // カテゴリフィルター
  if (filters.categories && filters.categories.length > 0) {
    favoriteContests = favoriteContests.filter(contest =>
      filters.categories!.includes(contest.category)
    )
  }

  // タグフィルター
  if (filters.tags && filters.tags.length > 0) {
    favoriteContests = favoriteContests.filter(contest =>
      filters.tags!.some(tag => contest.tags.includes(tag))
    )
  }

  // お気に入り登録日時でソート（新しい順）
  favoriteContests.sort((a, b) => {
    const favA = userFavorites.find(fav => fav.contestId === a.id)
    const favB = userFavorites.find(fav => fav.contestId === b.id)
    if (!favA || !favB) return 0
    return new Date(favB.favoriteAt).getTime() - new Date(favA.favoriteAt).getTime()
  })

  // ページネーション
  const total = favoriteContests.length
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedContests = favoriteContests.slice(startIndex, endIndex)

  return {
    contests: paginatedContests,
    total,
    page,
    limit,
    hasMore: endIndex < total
  }
}

// お気に入り状況を取得
export async function getUserFavorite(userId: string, contestId: string): Promise<UserFavorite | null> {
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const favorite = favorites.find(fav => 
    fav.userId === userId && fav.contestId === contestId
  )
  
  return favorite || null
}

// お気に入り統計を取得
export async function getFavoriteStats(userId: string): Promise<{
  total: number
  upcoming: number
  active: number
  ended: number
}> {
  await new Promise(resolve => setTimeout(resolve, 300))

  const userFavorites = favorites.filter(fav => fav.userId === userId)
  const contestIds = userFavorites.map(fav => fav.contestId)

  // すべてのコンテストを取得
  const allContests = await getContests({ limit: 1000 })
  const favoriteContests = allContests.contests.filter(contest => 
    contestIds.includes(contest.id)
  )

  const stats = {
    total: userFavorites.length,
    upcoming: favoriteContests.filter(c => c.status === 'upcoming').length,
    active: favoriteContests.filter(c => c.status === 'active').length,
    ended: favoriteContests.filter(c => 
      c.status === 'ended' || c.status === 'judging' || c.status === 'completed'
    ).length,
  }

  return stats
} 