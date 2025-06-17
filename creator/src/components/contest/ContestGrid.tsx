import React from 'react'
import ContestCard from './ContestCard'
import { Skeleton } from '@/components/ui/Skeleton'
import { ContestSummary } from '@/types/contest'

interface ContestGridProps {
  contests: ContestSummary[]
  loading?: boolean
  className?: string
}

const ContestGrid: React.FC<ContestGridProps> = ({ 
  contests, 
  loading = false, 
  className = '' 
}) => {
  // ローディング時のスケルトン表示
  if (loading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="space-y-4">
            <Skeleton className="aspect-video w-full rounded-lg" />
            <div className="space-y-2 p-4">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-12" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  // コンテストが空の場合
  // if (!contests || contests.length === 0) {
  //   return (
  //     <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
  //       <div className="text-center space-y-4">
  //         <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
  //           <svg
  //             className="w-12 h-12 text-muted-foreground"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             stroke="currentColor"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth={1.5}
  //               d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
  //             />
  //           </svg>
  //         </div>
  //         <div className="space-y-2">
  //           <h3 className="text-lg font-semibold text-foreground">
  //             コンテストが見つかりません
  //           </h3>
  //           <p className="text-sm text-muted-foreground max-w-md">
  //             検索条件を変更するか、新しいコンテストが開催されるまでお待ちください。
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {contests.map((contest) => (
        <ContestCard 
          key={contest.id} 
          contest={contest}
          className="h-full"
        />
      ))}
    </div>
  )
}

export default ContestGrid 