'use client';

const creators = [
  { name: "baeb__8", views: "76,000", image: "/api/placeholder/300/400" },
  { name: "Jess", views: "113,000", image: "/api/placeholder/300/400" },
  { name: "Dima", views: "1,200,000", image: "/api/placeholder/300/400" },
  { name: "Emily", views: "200", image: "/api/placeholder/300/400" },
  { name: "Alex", views: "450,000", image: "/api/placeholder/300/400" },
  { name: "Sarah", views: "89,000", image: "/api/placeholder/300/400" },
  { name: "Mike", views: "320,000", image: "/api/placeholder/300/400" },
  { name: "Luna", views: "670,000", image: "/api/placeholder/300/400" }
];

export function CreatorShowcaseSection() {
  return (
    <section className="py-16 px-4 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
          ブランドのための高パフォーマンスコンテンツを獲得
        </h2>

        {/* 自動スクロールコンテナ */}
        <div className="relative">
          {/* グラデーションマスク */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
          
          {/* スクロールコンテンツ */}
          <div className="flex animate-scroll-creators">
            {/* 最初のセット */}
            <div className="flex space-x-6 min-w-max">
              {creators.map((creator, index) => (
                <div key={`first-${index}`} className="flex-shrink-0 w-64 relative rounded-lg overflow-hidden">
                  <div className="aspect-[3/4] bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">クリエイター画像</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black bg-opacity-70 text-white px-3 py-2 rounded-full text-sm flex items-center justify-between">
                      <span className="font-medium">{creator.name}</span>
                      <span className="text-primary-400">{creator.views}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 重複セット（シームレスなループのため） */}
            <div className="flex space-x-6 min-w-max ml-6">
              {creators.map((creator, index) => (
                <div key={`second-${index}`} className="flex-shrink-0 w-64 relative rounded-lg overflow-hidden">
                  <div className="aspect-[3/4] bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">クリエイター画像</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black bg-opacity-70 text-white px-3 py-2 rounded-full text-sm flex items-center justify-between">
                      <span className="font-medium">{creator.name}</span>
                      <span className="text-primary-400">{creator.views}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll-creators {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll-creators {
          animation: scroll-creators 40s linear infinite;
        }
        
        .animate-scroll-creators:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
} 