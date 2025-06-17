// コンテストのステータス
export type ContestStatus = 'upcoming' | 'active' | 'ended' | 'judging' | 'completed'

// コンテストのカテゴリ
export type ContestCategory = 
  | 'fashion' 
  | 'beauty' 
  | 'food' 
  | 'lifestyle' 
  | 'tech' 
  | 'entertainment' 
  | 'sports' 
  | 'travel' 
  | 'education'
  | 'other'

// 賞金情報
export interface Prize {
  rank: number
  title: string
  amount: number
  description?: string
}

// ランキング情報
export interface RankingEntry {
  rank: number
  accountName: string
  accountHandle: string
  avatarUrl?: string
  likeCount: number
  commentCount: number
  shareCount: number
  submissionUrl: string
  submissionThumbnailUrl?: string
}

// コンテスト基本情報
export interface Contest {
  id: string
  title: string
  description: string
  shortDescription: string
  
  // 画像・メディア
  thumbnailUrl: string
  bannerUrl?: string
  brandLogoUrl?: string
  imageVideoUrl?: string // イメージ動画URL
  
  // ブランド情報
  brandName: string
  brandId: string
  
  // カテゴリ・タグ
  category: ContestCategory
  tags: string[]
  
  // 賞金・参加者情報
  totalPrizeAmount: number
  prizes: Prize[]
  participantCount: number
  maxParticipants?: number
  
  // 日程
  startDate: string // ISO 8601
  endDate: string   // ISO 8601
  judgingEndDate?: string // ISO 8601
  
  // ステータス
  status: ContestStatus
  
  // 応募条件
  requirements: string[]
  guidelines: string[]
  
  // ランキング情報
  ranking?: RankingEntry[]
  
  // メタデータ
  createdAt: string
  updatedAt: string
  
  // 統計情報
  viewCount: number
  likeCount: number
  shareCount: number
}

// コンテスト一覧用の軽量版
export interface ContestSummary {
  id: string
  title: string
  shortDescription: string
  thumbnailUrl: string
  brandName: string
  brandLogoUrl?: string
  category: ContestCategory
  totalPrizeAmount: number
  participantCount: number
  endDate: string
  status: ContestStatus
  tags: string[]
}

// フィルター・ソート用
export interface ContestFilters {
  categories?: ContestCategory[]
  status?: ContestStatus[]
  minPrizeAmount?: number
  maxPrizeAmount?: number
  prizeAmounts?: number[]
  tags?: string[]
}

export type ContestSortBy = 
  | 'newest' 
  | 'oldest' 
  | 'prize-high' 
  | 'prize-low' 
  | 'deadline-soon' 
  | 'deadline-far' 
  | 'popular'

// API レスポンス用
export interface ContestListResponse {
  contests: ContestSummary[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// カテゴリ表示用のメタデータ
export const CONTEST_CATEGORIES = {
  fashion: { label: 'ファッション', color: 'bg-pink-100 text-pink-800' },
  beauty: { label: '美容・コスメ', color: 'bg-purple-100 text-purple-800' },
  food: { label: 'グルメ・料理', color: 'bg-orange-100 text-orange-800' },
  lifestyle: { label: 'ライフスタイル', color: 'bg-green-100 text-green-800' },
  tech: { label: 'テック・ガジェット', color: 'bg-blue-100 text-blue-800' },
  entertainment: { label: 'エンタメ', color: 'bg-red-100 text-red-800' },
  sports: { label: 'スポーツ', color: 'bg-indigo-100 text-indigo-800' },
  travel: { label: '旅行', color: 'bg-teal-100 text-teal-800' },
  education: { label: '教育', color: 'bg-yellow-100 text-yellow-800' },
  other: { label: 'その他', color: 'bg-gray-100 text-gray-800' },
} as const

// ステータス表示用のメタデータ
export const CONTEST_STATUS = {
  upcoming: { label: '開催予定', color: 'bg-blue-100 text-blue-800' },
  active: { label: '開催中', color: 'bg-green-100 text-green-800' },
  ended: { label: '応募終了', color: 'bg-yellow-100 text-yellow-800' },
  judging: { label: '審査中', color: 'bg-orange-100 text-orange-800' },
  completed: { label: '完了', color: 'bg-gray-100 text-gray-800' },
} as const

// 応募・お気に入り関連の型定義
export interface UserApplication {
  id: string
  contestId: string
  userId: string
  submissionUrl: string
  appliedAt: string
  status: 'pending' | 'approved' | 'rejected' | 'winner'
}

export interface UserFavorite {
  id: string
  contestId: string
  userId: string
  favoriteAt: string
}

// 応募・お気に入り用のタブタイプ
export type ApplicationTab = 'active' | 'ended'
export type FavoriteTab = 'upcoming' | 'active' | 'ended'

// 応募・お気に入り用のフィルター
export interface ApplicationFilters {
  status?: ApplicationTab[]
  categories?: ContestCategory[]
  tags?: string[]
}

export interface FavoriteFilters {
  status?: FavoriteTab[]
  categories?: ContestCategory[]
  tags?: string[]
}

// タブ表示用のメタデータ
export const APPLICATION_TABS = {
  active: { label: '開催中', description: '現在応募可能なコンテスト' },
  ended: { label: '終了', description: '応募が終了したコンテスト' },
} as const

export const FAVORITE_TABS = {
  upcoming: { label: '開催予定', description: '開催予定のお気に入りコンテスト' },
  active: { label: '開催中', description: '現在開催中のお気に入りコンテスト' },
  ended: { label: '終了', description: '終了したお気に入りコンテスト' },
} as const 