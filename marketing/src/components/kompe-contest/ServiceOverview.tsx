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
            「ブランドコンテスト」は、ブランドが動画コンテストを開催し、
            クリエイターの皆さんが商品の紹介動画を投稿して参加できるUGC広告プラットフォームです。
          </p>
          <p className="text-gray-100 leading-relaxed font-medium text-base md:text-lg">
            入賞作品は広告素材として活用され、クリエイターには再生数や評価に応じた賞金が支払われます。
          </p>
        </div>
      </div>
    </section>
  );
}