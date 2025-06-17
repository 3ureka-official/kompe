'use client'

import { Button } from './Button'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showFirstLast?: boolean
  maxVisiblePages?: number
  className?: string
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  maxVisiblePages = 5,
  className = ''
}: PaginationProps) {
  if (totalPages <= 1) return null

  const getVisiblePages = () => {
    const pages: (number | 'ellipsis')[] = []
    
    if (totalPages <= maxVisiblePages) {
      // 全ページを表示
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // 省略記号を使用した表示
      const halfVisible = Math.floor(maxVisiblePages / 2)
      
      if (currentPage <= halfVisible + 1) {
        // 開始付近
        for (let i = 1; i <= maxVisiblePages - 1; i++) {
          pages.push(i)
        }
        pages.push('ellipsis')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - halfVisible) {
        // 終了付近
        pages.push(1)
        pages.push('ellipsis')
        for (let i = totalPages - maxVisiblePages + 2; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // 中央付近
        pages.push(1)
        pages.push('ellipsis')
        for (let i = currentPage - halfVisible + 1; i <= currentPage + halfVisible - 1; i++) {
          pages.push(i)
        }
        pages.push('ellipsis')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  const visiblePages = getVisiblePages()

  return (
    <nav className={`flex items-center justify-center space-x-1 ${className}`} aria-label="ページネーション">
      {/* 最初のページ */}
      {showFirstLast && currentPage > 1 && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(1)}
          className="hidden sm:flex"
        >
          最初
        </Button>
      )}

      {/* 前のページ */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex items-center gap-1"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">前へ</span>
      </Button>

      {/* ページ番号 */}
      <div className="flex items-center space-x-1">
        {visiblePages.map((page, index) => (
          page === 'ellipsis' ? (
            <div key={`ellipsis-${index}`} className="px-2">
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </div>
          ) : (
            <Button
              key={page}
              variant={currentPage === page ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPageChange(page)}
              className={`min-w-[40px] ${
                currentPage === page 
                  ? 'bg-primary-600 text-white hover:bg-primary-700' 
                  : ''
              }`}
            >
              {page}
            </Button>
          )
        ))}
      </div>

      {/* 次のページ */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="flex items-center gap-1"
      >
        <span className="hidden sm:inline">次へ</span>
        <ChevronRight className="w-4 h-4" />
      </Button>

      {/* 最後のページ */}
      {showFirstLast && currentPage < totalPages && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(totalPages)}
          className="hidden sm:flex"
        >
          最後
        </Button>
      )}
    </nav>
  )
} 