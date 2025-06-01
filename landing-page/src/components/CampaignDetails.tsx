import React from 'react';
import { Star, Crown } from 'lucide-react';

export function CampaignDetails() {
  return (
    <section id="campaign" className="py-16 px-4 bg-[#1D1D1D]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl md:text-3xl font-bold mb-6 md:mb-12 text-center text-white">
          キャンペーン概要
        </h2>
        
        <div className="space-y-8">
          {/* Contest Content Card */}
          <div className="bg-[#222222] p-4 md:p-8 rounded-xl transform transition-transform duration-300">
            <h3 className="text-lg md:text-xl font-bold mb-4 text-white">コンテスト内容</h3>
            <p className="text-gray-300 leading-relaxed text-base md:text-base">
              本コンテストでは、ブランドコンテスト自体を広めるための紹介動画を募集します。
              クリエイターの自由な発想でサービスの魅力を表現してください。
            </p>
          </div>
          
          {/* Participation Requirements Card */}
          <div className="bg-[#222222] p-4 md:p-8 rounded-xl transform transition-transform duration-300">
            <h3 className="text-lg md:text-xl font-bold mb-4 text-white">参加資格</h3>
            <p className="text-gray-300 leading-relaxed text-base md:text-base">
              TikTokで動画を投稿しているクリエイターなら誰でも参加OK。フォロワー数は問いません。
            </p>
          </div>

          {/* Prize Money Card */}
          <div className="bg-[#222222] p-4 md:p-8 rounded-xl transform transition-transform duration-300">
            <h3 className="text-lg md:text-xl font-bold mb-6 text-white flex items-center gap-2">
              賞金
            </h3>
            <div className="space-y-6">
              <p className="text-xl md:text-3xl font-bold text-center text-[#25F4EE] mb-6">総額 100,000円</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1st Place */}
                <div className="bg-[#1D1D1D] p-6 rounded-xl text-center border border-[#25F4EE]/30 transform transition-transform duration-300">
                  <Crown className="w-8 h-8 text-[#25F4EE] mx-auto mb-3" />
                  <div className="text-lg md:text-xl font-bold mb-2 text-white">1位</div>
                  <div className="text-[#25F4EE] text-xl md:text-3xl font-bold">50,000円</div>
                </div>
                
                {/* 2nd Place */}
                <div className="bg-[#1D1D1D] p-6 rounded-xl text-center border border-white/20 transform transition-transform duration-300">
                  <Star className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                  <div className="text-lg md:text-xl font-bold mb-2 text-white">2位</div>
                  <div className="text-gray-300 text-xl md:text-3xl font-bold">30,000円</div>
                </div>
                
                {/* 3rd Place */}
                <div className="bg-[#1D1D1D] p-6 rounded-xl text-center border border-white/20 transform transition-transform duration-300">
                  <Star className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                  <div className="text-lg md:text-xl font-bold mb-2 text-white">3位</div>
                  <div className="text-gray-400 text-xl md:text-3xl font-bold">20,000円</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}