'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { ContestFilters, ContestSortBy, ContestCategory, ContestStatus } from '@/types/contest'

export function useUrlParams() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // URLパラメータからフィルター情報を取得
  const getFiltersFromUrl = useCallback((): {
    filters: ContestFilters
    sortBy: ContestSortBy
    search: string
    page: number
  } => {
    const filters: ContestFilters = {}
    
    // カテゴリ
    const categories = searchParams.get('categories')
    if (categories) {
      filters.categories = categories.split(',') as ContestCategory[]
    }
    
    // ステータス
    const status = searchParams.get('status')
    if (status) {
      filters.status = status.split(',') as ContestStatus[]
    }
    
    // 賞金額
    const minPrize = searchParams.get('minPrize')
    if (minPrize) {
      filters.minPrizeAmount = parseInt(minPrize)
    }
    
    const maxPrize = searchParams.get('maxPrize')
    if (maxPrize) {
      filters.maxPrizeAmount = parseInt(maxPrize)
    }
    
    // 賞金額（複数選択）
    const prizeAmounts = searchParams.get('prizeAmounts')
    if (prizeAmounts) {
      filters.prizeAmounts = prizeAmounts.split(',').map(amount => parseInt(amount))
    }
    
    // タグ
    const tags = searchParams.get('tags')
    if (tags) {
      filters.tags = tags.split(',')
    }
    
    // ソート
    const sortBy = (searchParams.get('sort') as ContestSortBy) || 'newest'
    
    // 検索
    const search = searchParams.get('q') || ''
    
    // ページ
    const page = parseInt(searchParams.get('page') || '1')
    
    return { filters, sortBy, search, page }
  }, [searchParams])

  // URLパラメータを更新
  const updateUrlParams = useCallback((params: {
    filters?: ContestFilters
    sortBy?: ContestSortBy
    search?: string
    page?: number
  }) => {
    const current = new URLSearchParams(searchParams.toString())
    
    // フィルター更新
    if (params.filters !== undefined) {
      // 既存のフィルターパラメータをクリア
      current.delete('categories')
      current.delete('status')
      current.delete('minPrize')
      current.delete('maxPrize')
      current.delete('prizeAmounts')
      current.delete('tags')
      
      // 新しいフィルターを設定
      if (params.filters.categories?.length) {
        current.set('categories', params.filters.categories.join(','))
      }
      if (params.filters.status?.length) {
        current.set('status', params.filters.status.join(','))
      }
      if (params.filters.minPrizeAmount) {
        current.set('minPrize', params.filters.minPrizeAmount.toString())
      }
      if (params.filters.maxPrizeAmount) {
        current.set('maxPrize', params.filters.maxPrizeAmount.toString())
      }
      if (params.filters.prizeAmounts?.length) {
        current.set('prizeAmounts', params.filters.prizeAmounts.join(','))
      }
      if (params.filters.tags?.length) {
        current.set('tags', params.filters.tags.join(','))
      }
    }
    
    // ソート更新
    if (params.sortBy !== undefined) {
      if (params.sortBy === 'newest') {
        current.delete('sort') // デフォルト値は削除
      } else {
        current.set('sort', params.sortBy)
      }
    }
    
    // 検索更新
    if (params.search !== undefined) {
      if (params.search) {
        current.set('q', params.search)
      } else {
        current.delete('q')
      }
    }
    
    // ページ更新
    if (params.page !== undefined) {
      if (params.page === 1) {
        current.delete('page') // デフォルト値は削除
      } else {
        current.set('page', params.page.toString())
      }
    }
    
    // URLを更新（ページリロードなし）
    const newUrl = current.toString() ? `?${current.toString()}` : ''
    router.push(`/contests${newUrl}`, { scroll: false })
  }, [router, searchParams])

  // URLパラメータをクリア
  const clearUrlParams = useCallback(() => {
    router.push('/contests', { scroll: false })
  }, [router])

  return {
    getFiltersFromUrl,
    updateUrlParams,
    clearUrlParams
  }
} 