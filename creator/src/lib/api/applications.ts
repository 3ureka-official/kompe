import { 
  ContestListResponse, 
  UserApplication, 
  ApplicationTab,
  ApplicationFilters 
} from '@/types/contest'
import { getContests } from './contests'
import applicationsData from '@/mock-data/applications.json'

// JSONデータをUserApplication型として扱う
const applications = applicationsData as UserApplication[]

// ユーザーの応募コンテスト一覧を取得
export async function getUserApplications(params: {
  userId: string
  page?: number
  limit?: number
  tab?: ApplicationTab
  filters?: ApplicationFilters
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

  // ユーザーの応募一覧を取得
  const userApplications = applications.filter(app => app.userId === userId)
  const contestIds = userApplications.map(app => app.contestId)

  // すべてのコンテストを取得
  const allContests = await getContests({ limit: 1000 })
  
  // 応募したコンテストのみをフィルター
  let appliedContests = allContests.contests.filter(contest => 
    contestIds.includes(contest.id)
  )

  // タブによるフィルタリング
  if (tab) {
    appliedContests = appliedContests.filter(contest => {
      switch (tab) {
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
    appliedContests = appliedContests.filter(contest =>
      contest.title.toLowerCase().includes(searchLower) ||
      contest.shortDescription.toLowerCase().includes(searchLower) ||
      contest.brandName.toLowerCase().includes(searchLower) ||
      contest.tags.some(tag => tag.toLowerCase().includes(searchLower))
    )
  }

  // カテゴリフィルター
  if (filters.categories && filters.categories.length > 0) {
    appliedContests = appliedContests.filter(contest =>
      filters.categories!.includes(contest.category)
    )
  }

  // タグフィルター
  if (filters.tags && filters.tags.length > 0) {
    appliedContests = appliedContests.filter(contest =>
      filters.tags!.some(tag => contest.tags.includes(tag))
    )
  }

  // 応募日時でソート（新しい順）
  appliedContests.sort((a, b) => {
    const appA = userApplications.find(app => app.contestId === a.id)
    const appB = userApplications.find(app => app.contestId === b.id)
    if (!appA || !appB) return 0
    return new Date(appB.appliedAt).getTime() - new Date(appA.appliedAt).getTime()
  })

  // ページネーション
  const total = appliedContests.length
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedContests = appliedContests.slice(startIndex, endIndex)

  return {
    contests: paginatedContests,
    total,
    page,
    limit,
    hasMore: endIndex < total
  }
}

// 応募状況を取得
export async function getUserApplication(userId: string, contestId: string): Promise<UserApplication | null> {
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const application = applications.find(app => 
    app.userId === userId && app.contestId === contestId
  )
  
  return application || null
}

// 応募統計を取得
export async function getApplicationStats(userId: string): Promise<{
  total: number
  active: number
  ended: number
  pending: number
  approved: number
  rejected: number
  winner: number
}> {
  await new Promise(resolve => setTimeout(resolve, 300))

  const userApplications = applications.filter(app => app.userId === userId)
  const contestIds = userApplications.map(app => app.contestId)

  // すべてのコンテストを取得
  const allContests = await getContests({ limit: 1000 })
  const appliedContests = allContests.contests.filter(contest => 
    contestIds.includes(contest.id)
  )

  const stats = {
    total: userApplications.length,
    active: appliedContests.filter(c => c.status === 'active').length,
    ended: appliedContests.filter(c => 
      c.status === 'ended' || c.status === 'judging' || c.status === 'completed'
    ).length,
    pending: userApplications.filter(app => app.status === 'pending').length,
    approved: userApplications.filter(app => app.status === 'approved').length,
    rejected: userApplications.filter(app => app.status === 'rejected').length,
    winner: userApplications.filter(app => app.status === 'winner').length,
  }

  return stats
} 