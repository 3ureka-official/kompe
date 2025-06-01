'use client';

import { useState } from 'react';
import { Creator, mockContestDetail, mockCreators } from '@/types/contest';
import { ContestHeader } from '@/components/contests/ContestHeader';
import { ContestStats } from '@/components/contests/ContestStats';
import { ContestOverview } from '@/components/contests/ContestOverview';
import { ContestImageVideos } from '@/components/contests/ContestImageVideos';
import { ContestRequirements } from '@/components/contests/ContestRequirements';
import { ContestBrandInfo } from '@/components/contests/ContestBrandInfo';
import { ContestCreatorSection } from '@/components/contests/ContestCreatorSection';
import { CreatorDetailModal } from '@/components/contests/CreatorDetailModal';

export default function ContestDetailPage({ params }: { params: { id: string } }) {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ヘッダー */}
        <ContestHeader contest={mockContestDetail} />

        {/* 統計情報 */}
        <ContestStats contest={mockContestDetail} />

        {/* コンテスト概要 */}
        <ContestOverview contest={mockContestDetail} />

        {/* イメージ動画 */}
        <ContestImageVideos contest={mockContestDetail} />

        {/* 応募要件 */}
        <ContestRequirements contest={mockContestDetail} />

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