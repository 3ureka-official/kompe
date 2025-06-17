'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import ContestGrid from '@/components/contest/ContestGrid'
import { Pagination } from '@/components/ui/Pagination'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { useFavorites } from '@/hooks/useFavorites'
import { FavoriteTab, FAVORITE_TABS } from '@/types/contest'

export default function FavoritesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // URLパラメータから初期値を取得
  const initialTab = (searchParams.get('tab') as FavoriteTab) || 'active'
  const initialPage = parseInt(searchParams.get('page') || '1', 10)
  const initialSearch = searchParams.get('search') || ''

  const {
    contests,
    loading,
    error,
    total,
    page,
    limit,
    tab,
    search,
    stats,
    fetchFavorites,
    setPage,
    setTab,
    setSearch,
    reset
  } = useFavorites({
    initialPage,
    initialTab,
    initialSearch,
    autoFetch: true
  })

  // URLパラメータを更新
  const updateUrlParams = (params: { 
    tab?: FavoriteTab | undefined
    page?: number
    search?: string 
  }) => {
    const url = new URL(window.location.href)
    
    if (params.tab) {
      url.searchParams.set('tab', params.tab)
    } else {
      url.searchParams.delete('tab')
    }
    
    if (params.page && params.page > 1) {
      url.searchParams.set('page', params.page.toString())
    } else {
      url.searchParams.delete('page')
    }
    
    if (params.search) {
      url.searchParams.set('search', params.search)
    } else {
      url.searchParams.delete('search')
    }
    
    router.push(url.pathname + url.search)
  }

  // タブ変更時の処理
  const handleTabChange = (newTab: string) => {
    const favoriteTab = newTab as FavoriteTab
    setTab(favoriteTab)
    setPage(1)
    updateUrlParams({ tab: favoriteTab, page: 1 })
  }

  // 検索変更時の処理
  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch)
    setPage(1)
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
    router.push('/favorites')
  }

  // 総ページ数を計算
  const totalPages = Math.ceil(total / limit)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ページヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            お気に入りコンテスト
          </h1>
          <p className="text-gray-600 mb-4">
            あなたがお気に入りに追加したコンテストの一覧です。
          </p>
          
          {/* 統計情報 */}
          {stats && (
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-2xl font-bold text-blue-600">{stats.upcoming}</div>
                <div className="text-sm text-gray-600">開催予定</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-2xl font-bold text-green-600">{stats.active}</div>
                <div className="text-sm text-gray-600">開催中</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-2xl font-bold text-gray-600">{stats.ended}</div>
                <div className="text-sm text-gray-600">終了</div>
              </div>
            </div>
          )}
        </div>

        {/* 検索バー */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="お気に入りコンテストを検索..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* タブセクション */}
        <Tabs value={tab || 'active'} onValueChange={handleTabChange} className="mb-8">
          <TabsList className="mb-6">
            {Object.entries(FAVORITE_TABS).map(([key, tabInfo]) => (
              <TabsTrigger key={key} value={key}>
                {tabInfo.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(FAVORITE_TABS).map(([key, tabInfo]) => (
            <TabsContent key={key} value={key}>
              <div className="mb-4">
                <p className="text-gray-600">{tabInfo.description}</p>
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {key === 'upcoming' && 'お気に入りの開催予定コンテストはありません'}
                    {key === 'active' && 'お気に入りの開催中コンテストはありません'}  
                    {key === 'ended' && 'お気に入りの終了したコンテストはありません'}
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {key === 'upcoming' && '開催予定のコンテストをお気に入りに追加すると、ここに表示されます。'}
                    {key === 'active' && '気になるコンテストをお気に入りに追加してみましょう！'}
                    {key === 'ended' && '過去にお気に入りに追加したコンテストがここに表示されます。'}
                  </p>
                  {(key === 'upcoming' || key === 'active') && (
                    <a
                      href="/contests"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      コンテストを探す
                    </a>
                  )}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

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