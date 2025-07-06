export function BrandHero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 text-white flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            TikTokマーケティングの<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              新常識！
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            コンテスト形式で商品をバズらせる<br />
            従来の広告とは一線を画す、効果的なマーケティングソリューション
          </p>

          <div className="flex flex-col gap-4 justify-center max-w-md mx-auto mb-8">
            <button className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold text-xl hover:bg-gray-300 transition-colors shadow-2xl">
              今すぐ始める
            </button>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-8 text-center mb-12 max-w-2xl mx-auto">
            {/* <div className="bg-white/10 backdrop-blur-sm p-2 md:p-6 rounded-xl">
              <div className="md:text-3xl font-bold text-blue-400 mb-2">成果報酬</div>
              <div className="text-sm opacity-80">料金体系</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-2 md:p-6 rounded-xl">
              <div className="md:text-3xl font-bold text-cyan-400 mb-2">1週間</div>
              <div className="text-sm opacity-80">最短実施期間</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-2 md:p-6 rounded-xl">
              <div className="md:text-3xl font-bold text-blue-400 mb-2">10%</div>
              <div className="text-sm opacity-80">手数料</div>
            </div> */}
            {/* <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <div className="text-3xl font-bold text-cyan-400 mb-2">50社+</div>
              <div className="text-sm opacity-80">導入実績</div>
            </div> */}
          </div>
          
          {/* <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              📊 平均的な成果指標
            </h3>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-400">150%</div>
                <div className="text-sm opacity-80">リーチ向上</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-400">25+</div>
                <div className="text-sm opacity-80">動画制作本数</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">80%</div>
                <div className="text-sm opacity-80">ブランド認知向上</div>
              </div>
            </div>
          </div> */}
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