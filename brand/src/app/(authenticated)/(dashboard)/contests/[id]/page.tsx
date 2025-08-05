"use client";

// import { useState } from "react";
import { useParams } from "next/navigation";

export default function ContestDetailPage() {
  const params = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ヘッダー */}
        {/* <ContestHeader contest={contest as Contest} /> */}

        {/* 統計情報 */}
        {/* <ContestStats contest={contest as Contest} /> */}

        {/* コンテスト概要 */}
        {/* <ContestOverview contest={contest as Contest} /> */}

        {/* イメージ動画 */}
        {/* <ContestImageVideos contest={contest as Contest} /> */}

        {/* 応募要件 */}
        {/* <ContestRequirements contest={contest as Contest} /> */}

        {/* ブランド情報 */}
        {/* <ContestBrandInfo /> */}

        {/* 参加クリエイター */}
        {/* <ContestCreatorSection
          creators={mockCreators}
          onCreatorClick={handleCreatorClick}
        /> */}
      </div>
    </div>
  );
}
