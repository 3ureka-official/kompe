'use client'

import { useState } from 'react'
import { ContestFilters as ContestFiltersType, ContestSortBy, CONTEST_CATEGORIES, CONTEST_STATUS, ContestCategory, ContestStatus } from '@/types/contest'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Search, Filter, X, ChevronDown } from 'lucide-react'

interface ContestFiltersProps {
  filters: ContestFiltersType
  sortBy: ContestSortBy
  search: string
  onFiltersChange: (filters: ContestFiltersType) => void
  onSortByChange: (sortBy: ContestSortBy) => void
  onSearchChange: (search: string) => void
  onReset: () => void
  totalCount: number
}

const SORT_OPTIONS = [
  { value: 'newest' as ContestSortBy, label: '新着順' },
  { value: 'oldest' as ContestSortBy, label: '古い順' },
  { value: 'prize-high' as ContestSortBy, label: '賞金額（高い順）' },
  { value: 'prize-low' as ContestSortBy, label: '賞金額（低い順）' },
  { value: 'deadline-soon' as ContestSortBy, label: '締切間近' },
  { value: 'deadline-far' as ContestSortBy, label: '締切まで余裕' },
  { value: 'popular' as ContestSortBy, label: '人気順' }
]

export function ContestFilters({
  filters,
  sortBy,
  search,
  onFiltersChange,
  onSortByChange,
  onSearchChange,
  onReset,
  totalCount
}: ContestFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  const handleCategoryToggle = (category: ContestCategory) => {
    const currentCategories = filters.categories || []
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter(c => c !== category)
      : [...currentCategories, category]
    
    onFiltersChange({
      ...filters,
      categories: newCategories.length > 0 ? newCategories : undefined
    })
  }

  const handleStatusToggle = (status: ContestStatus) => {
    const currentStatus = filters.status || []
    const newStatus = currentStatus.includes(status)
      ? currentStatus.filter(s => s !== status)
      : [...currentStatus, status]
    
    onFiltersChange({
      ...filters,
      status: newStatus.length > 0 ? newStatus : undefined
    })
  }

  const handlePrizeAmountToggle = (amount: number) => {
    const currentAmounts = filters.prizeAmounts || []
    const newAmounts = currentAmounts.includes(amount)
      ? currentAmounts.filter((a: number) => a !== amount)
      : [...currentAmounts, amount]
    
    onFiltersChange({
      ...filters,
      prizeAmounts: newAmounts.length > 0 ? newAmounts : undefined,
      // 古いフィルターをクリア
      minPrizeAmount: undefined,
      maxPrizeAmount: undefined
    })
  }

  const handlePrizeAmountChange = (type: 'min' | 'max', value: string) => {
    const numValue = value ? parseInt(value) : undefined
    onFiltersChange({
      ...filters,
      [type === 'min' ? 'minPrizeAmount' : 'maxPrizeAmount']: numValue
    })
  }

  const hasActiveFilters = !!(
    filters.categories?.length ||
    filters.status?.length ||
    filters.prizeAmounts?.length ||
    filters.minPrizeAmount ||
    filters.maxPrizeAmount ||
    search
  )

  const currentSortLabel = SORT_OPTIONS.find(option => option.value === sortBy)?.label || '新着順'

  return (
    <div className="space-y-4">
      {/* 検索バー */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="コンテストを検索..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* フィルター・ソートコントロール */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            フィルター
            {hasActiveFilters && (
              <Badge variant="destructive" className="ml-1 px-1 py-0 text-xs">
                {(filters.categories?.length || 0) + (filters.status?.length || 0) + (filters.minPrizeAmount ? 1 : 0) + (filters.maxPrizeAmount ? 1 : 0) + (search ? 1 : 0)}
              </Badge>
            )}
          </Button>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="flex items-center gap-1 text-gray-500"
            >
              <X className="w-3 h-3" />
              リセット
            </Button>
          )}
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {totalCount}件のコンテスト
          </span>

          {/* ソートドロップダウン */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 min-w-[140px] justify-between"
            >
              {currentSortLabel}
              <ChevronDown className="w-4 h-4" />
            </Button>

            {showSortDropdown && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[180px]">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onSortByChange(option.value)
                      setShowSortDropdown(false)
                    }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                      sortBy === option.value ? 'bg-primary-50 text-primary-600' : ''
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* フィルターパネル */}
      {showFilters && (
        <Card className="p-4">
          <div className="space-y-6">
            {/* カテゴリフィルター */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">カテゴリ</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(CONTEST_CATEGORIES).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => handleCategoryToggle(key as ContestCategory)}
                    className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                      filters.categories?.includes(key as ContestCategory)
                        ? 'bg-primary-100 border-primary-300 text-primary-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ステータスフィルター */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">ステータス</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(CONTEST_STATUS).map(([key, status]) => (
                  <button
                    key={key}
                    onClick={() => handleStatusToggle(key as ContestStatus)}
                    className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                      filters.status?.includes(key as ContestStatus)
                        ? 'bg-primary-100 border-primary-300 text-primary-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {status.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 賞金額フィルター */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">賞金額</h3>
              <div className="flex flex-wrap gap-2">
                {[200000, 500000, 1000000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handlePrizeAmountToggle(amount)}
                    className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                      filters.prizeAmounts?.includes(amount)
                        ? 'bg-primary-100 border-primary-300 text-primary-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    ¥{amount.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* アクティブフィルター表示 */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.categories?.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {CONTEST_CATEGORIES[category]?.label}
              <button
                onClick={() => handleCategoryToggle(category as ContestCategory)}
                className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {filters.status?.map((status) => (
            <Badge
              key={status}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {CONTEST_STATUS[status]?.label}
              <button
                onClick={() => handleStatusToggle(status as ContestStatus)}
                className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {filters.prizeAmounts?.map((amount) => (
            <Badge
              key={amount}
              variant="secondary"
              className="flex items-center gap-1"
            >
              ¥{amount.toLocaleString()}
              <button
                onClick={() => handlePrizeAmountToggle(amount)}
                className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {search && (
            <Badge variant="secondary" className="flex items-center gap-1">
              検索: &quot;{search}&quot;
              <button
                onClick={() => onSearchChange('')}
                className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  )
} 