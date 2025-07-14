'use client';

// import { useRouter } from 'next/navigation';

export function CreatorHero() {
  // const router = useRouter();

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#FE2C55] via-[#FF0050] to-[#25F4EE] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
      
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto pt-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            バズったら<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#25F4EE] to-white">
              稼げる！
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 font-medium">
            フォロワー数関係なし。あなたの動画センスで賞金ゲット
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {/* <button className="bg-white text-[#FE2C55] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors">
              TikTokで無料登録
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[#FE2C55] transition-colors">
              コンテストを見る
            </button> */}

            <a href="/pre-register/creator" className="cursor-pointer bg-white text-[#FE2C55] px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-100 transition-colors shadow-2xl text-center inline-block">
              事前登録はこちら
            </a>
            {/* <button className="cursor-pointer bg-white text-[#FE2C55] px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-100 transition-colors shadow-2xl">
              今すぐ始める
            </button> */}
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-3 gap-6 text-center max-w-2xl mx-auto">
            <div>
              <div className="text-2xl md:text-3xl font-bold">無料</div>
              <div className="text-sm opacity-80">参加費用</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">1分</div>
              <div className="text-sm opacity-80">登録時間</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">10万円</div>
              <div className="text-sm opacity-80">最低総賞金</div>
            </div>
            {/* <div>
              <div className="text-2xl md:text-3xl font-bold">100人+</div>
              <div className="text-sm opacity-80">参加中</div>
            </div> */}
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}