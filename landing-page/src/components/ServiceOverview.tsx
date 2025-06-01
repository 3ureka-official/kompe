import React from 'react';

export function ServiceOverview() {
  return (
    <section id="overview" className="py-16 px-2 md:px-4 bg-[#1D1D1D]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl md:text-3xl font-bold text-center text-white">
          サービス概要
        </h2>
        <div className="p-4 md:p-8 rounded-xl transform transition-transform duration-300">
          <p className="text-gray-100 leading-relaxed mb-6 text-base md:text-lg ">
            「ブランドコンテスト（仮）」は、TikTok上で動画コンテストを開催し、
            クリエイターの皆さんが紹介動画を投稿して参加できるUGC広告プラットフォームです。
          </p>
          <p className="text-[#25F4EE] leading-relaxed font-medium text-base md:text-lg">
            入賞作品は広告素材として活用され、クリエイターには再生数や評価に応じた報酬が支払われます。
          </p>
        </div>
      </div>
    </section>
  );
}