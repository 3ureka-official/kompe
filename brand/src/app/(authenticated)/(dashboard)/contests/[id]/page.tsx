'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Creator, mockCreators } from '@/types/creator';
import { ContestHeader } from '@/components/contests/detail/ContestHeader';
import { ContestStats } from '@/components/contests/detail/ContestStats';
import { ContestOverview } from '@/components/contests/detail/ContestOverview';
import { ContestImageVideos } from '@/components/contests/detail/ContestImageVideos';
import { ContestRequirements } from '@/components/contests/detail/ContestRequirements';
import { ContestBrandInfo } from '@/components/contests/detail/ContestBrandInfo';
import { ContestCreatorSection } from '@/components/contests/detail/ContestCreatorSection';
import { CreatorDetailModal } from '@/components/contests/detail/CreatorDetailModal';
import { useContests } from '@/hooks/useContests';
import { Contest } from '@/types/Contest';

export default function ContestDetailPage() {
  const params = useParams();

  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreatorClick = (creator: Creator) => {
    console.log('Creator clicked:', creator);
    setSelectedCreator(creator);
    setIsModalOpen(true);
    console.log('Modal should be open now');
  };

  const handleCloseModal = () => {
    console.log('Closing modal');
    setIsModalOpen(false);
    setSelectedCreator(null);
  };

  console.log('Current modal state:', { isModalOpen, selectedCreator });

  const contest = useContests().contests.find(c => c.id === params.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ヘッダー */}
        <ContestHeader contest={contest as Contest} />

        {/* 統計情報 */}
        <ContestStats contest={contest as Contest} />

        {/* コンテスト概要 */}
        <ContestOverview contest={contest as Contest} />

        {/* イメージ動画 */}
        <ContestImageVideos contest={contest as Contest} />

        {/* 応募要件 */}
        <ContestRequirements contest={contest as Contest} />

        {/* ブランド情報 */}
        <ContestBrandInfo />

        {/* 参加クリエイター */}
        <ContestCreatorSection 
          creators={mockCreators} 
          onCreatorClick={handleCreatorClick} 
        />
      </div>

      {/* クリエイター詳細モーダル */}
      <CreatorDetailModal
        creator={selectedCreator}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
} 