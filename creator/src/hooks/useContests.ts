'use client'

import { useState, useEffect, useCallback } from 'react'
import { ContestSummary, ContestFilters, ContestSortBy, ContestListResponse } from '@/types/contest'
import { getContests } from '@/lib/api/contests'

interface UseContestsParams {
  initialPage?: number
  initialLimit?: number
  initialFilters?: ContestFilters
  initialSortBy?: ContestSortBy
  initialSearch?: string
  autoFetch?: boolean
}

interface UseContestsReturn {
  contests: ContestSummary[]
  loading: boolean
  error: string | null
  total: number
  page: number
  limit: number
  hasMore: boolean
  filters: ContestFilters
  sortBy: ContestSortBy
  search: string
  
  // アクション
  fetchContests: () => Promise<void>
  loadMore: () => Promise<void>
  setPage: (page: number) => void
  setFilters: (filters: ContestFilters) => void
  setSortBy: (sortBy: ContestSortBy) => void
  setSearch: (search: string) => void
  reset: () => void
}

export function useContests(params: UseContestsParams = {}): UseContestsReturn {
  const {
    initialPage = 1,
    initialLimit = 12,
    initialFilters = {},
    initialSortBy = 'newest',
    initialSearch = '',
    autoFetch = true
  } = params

  // 状態管理
  const [contests, setContests] = useState<ContestSummary[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)
  const [page, setPageState] = useState(initialPage)
  const [limit] = useState(initialLimit)
  const [hasMore, setHasMore] = useState(false)
  const [filters, setFiltersState] = useState<ContestFilters>(initialFilters)
  const [sortBy, setSortByState] = useState<ContestSortBy>(initialSortBy)
  const [search, setSearchState] = useState(initialSearch)

  // コンテスト取得関数
  const fetchContests = useCallback(async (isLoadMore = false) => {
    try {
      setLoading(true)
      setError(null)

      const response: ContestListResponse = await getContests({
        page: isLoadMore ? page + 1 : page,
        limit,
        filters,
        sortBy,
        search
      })

      if (isLoadMore) {
        setContests(prev => [...prev, ...response.contests])
        setPageState(prev => prev + 1)
      } else {
        setContests(response.contests)
      }

      setTotal(response.total)
      setHasMore(response.hasMore)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'コンテストの取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }, [page, limit, filters, sortBy, search])

  // もっと読み込む
  const loadMore = useCallback(async () => {
    if (!hasMore || loading) return
    await fetchContests(true)
  }, [hasMore, loading, fetchContests])

  // ページ設定
  const setPage = useCallback((newPage: number) => {
    setPageState(newPage)
  }, [])

  // フィルター設定
  const setFilters = useCallback((newFilters: ContestFilters) => {
    setFiltersState(newFilters)
    setPageState(1) // フィルター変更時はページをリセット
  }, [])

  // ソート設定
  const setSortBy = useCallback((newSortBy: ContestSortBy) => {
    setSortByState(newSortBy)
    setPageState(1) // ソート変更時はページをリセット
  }, [])

  // 検索設定
  const setSearch = useCallback((newSearch: string) => {
    setSearchState(newSearch)
    setPageState(1) // 検索変更時はページをリセット
  }, [])

  // リセット
  const reset = useCallback(() => {
    setContests([])
    setPageState(initialPage)
    setFiltersState(initialFilters)
    setSortByState(initialSortBy)
    setSearchState(initialSearch)
    setError(null)
  }, [initialPage, initialFilters, initialSortBy, initialSearch])

  // 初回読み込みと依存関係変更時の再読み込み
  useEffect(() => {
    if (autoFetch) {
      fetchContests()
    }
  }, [fetchContests, autoFetch])

  return {
    contests,
    loading,
    error,
    total,
    page,
    limit,
    hasMore,
    filters,
    sortBy,
    search,
    
    fetchContests: () => fetchContests(false),
    loadMore,
    setPage,
    setFilters,
    setSortBy,
    setSearch,
    reset
  }
} 