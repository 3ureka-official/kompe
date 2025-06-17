'use client'

import { useEffect, useState } from 'react'
import ContestGrid from '@/components/contest/ContestGrid'
import { ContestFilters } from '@/components/contest/ContestFilters'
import { Pagination } from '@/components/ui/Pagination'
import { useContests } from '@/hooks/useContests'
import { useUrlParams } from '@/hooks/useUrlParams'
import { ContestFilters as ContestFiltersType, ContestSortBy } from '@/types/contest'

export default function ContestsPage() {
  const { getFiltersFromUrl, updateUrlParams, clearUrlParams } = useUrlParams()
  const [isInitialized, setIsInitialized] = useState(false)

  // URLパラメータから初期値を取得
  const urlParams = getFiltersFromUrl()
  
  const {
    contests,
    loading,
    error,
    total,
    page,
    limit,
    filters,
    sortBy,
    search,
    fetchContests,
    setPage,
    setFilters,
    setSortBy,
    setSearch,
    reset
  } = useContests({
    initialPage: urlParams.page,
    initialFilters: urlParams.filters,
    initialSortBy: urlParams.sortBy,
    initialSearch: urlParams.search,
    autoFetch: false
  })

  // 初期化処理
  useEffect(() => {
    if (!isInitialized) {
      fetchContests()
      setIsInitialized(true)
    }
  }, [fetchContests, isInitialized])

  // フィルター変更時の処理
  const handleFiltersChange = (newFilters: ContestFiltersType) => {
    setFilters(newFilters)
    updateUrlParams({ filters: newFilters, page: 1 })
  }

  // ソート変更時の処理
  const handleSortByChange = (newSortBy: ContestSortBy) => {
    setSortBy(newSortBy)
    updateUrlParams({ sortBy: newSortBy, page: 1 })
  }

  // 検索変更時の処理
  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch)
    updateUrlParams({ search: newSearch, page: 1 })
  }

  // ページ変更時の処理
  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    updateUrlParams({ page: newPage })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // リセット処理
  const handleReset = () => {
    reset()
    clearUrlParams()
  }

  // 総ページ数を計算
  const totalPages = Math.ceil(total / limit)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ページヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            コンテスト一覧
          </h1>
          <p className="text-gray-600">
            あなたにぴったりのコンテストを見つけて、クリエイティブな才能を発揮しましょう！
          </p>
        </div>

        {/* フィルター・検索セクション */}
        <div className="mb-8">
          <ContestFilters
            filters={filters}
            sortBy={sortBy}
            search={search}
            onFiltersChange={handleFiltersChange}
            onSortByChange={handleSortByChange}
            onSearchChange={handleSearchChange}
            onReset={handleReset}
            totalCount={total}
          />
        </div>

        {/* エラー表示 */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  エラーが発生しました
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* コンテストグリッド */}
        <div className="mb-8">
          <ContestGrid
            contests={contests}
            loading={loading}
          />
        </div>

        {/* 結果が0件の場合 */}
        {!loading && !error && contests.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              コンテストが見つかりませんでした
            </h3>
            <p className="text-gray-500 mb-4">
              検索条件を変更するか、フィルターをリセットしてお試しください。
            </p>
            <button
              onClick={handleReset}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              フィルターをリセット
            </button>
          </div>
        )}

        {/* ページネーション */}
        {!loading && !error && totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              className="justify-center"
            />
          </div>
        )}

        {/* ページ情報 */}
        {!loading && !error && contests.length > 0 && (
          <div className="mt-4 text-center text-sm text-gray-500">
            {total}件中 {(page - 1) * limit + 1}〜{Math.min(page * limit, total)}件を表示
          </div>
        )}
      </div>
    </div>
  )
} 