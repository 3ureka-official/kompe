export function BrandCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            TikTokマーケティングの<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              新時代を始めませんか？
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto">
            従来の手法を超える、効率的で効果的なマーケティングソリューション。<br />
            Kompeで競合に差をつけましょう。
          </p>
          
          {/* <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">スピード</h3>
              <p className="opacity-90">最短1週間で開始</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">コスト効率</h3>
              <p className="opacity-90">従来比70%削減</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold mb-2">効果</h3>
              <p className="opacity-90">平均150%リーチ向上</p>
            </div>
          </div> */}
          
          
          {/* <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 mb-12">
            <h3 className="text-2xl font-bold mb-4">
              🎁 初回限定特典
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold mb-2">初期費用</div>
                <div className="text-lg text-blue-400">完全無料</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-2">詳細レポート</div>
                <div className="text-lg text-cyan-400">無料提供</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-2">次回施策</div>
                <div className="text-lg text-blue-400">10%割引</div>
              </div>
            </div>
          </div> */}
          
          <div className="text-center mb-8">
            <div className="flex flex-col gap-4 justify-center max-w-md mx-auto">
              <a href="/pre-register/brand" className="bg-white text-gray-900 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-gray-300 transition-colors shadow-2xl">
                事前登録はこちら
              </a>
              {/* <button className="bg-white text-gray-900 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-gray-300 transition-colors shadow-2xl">
                今すぐ始める
              </button> */}
            </div>

            {/* <p className="text-sm opacity-70 mt-4">
              相談は完全無料 | 強引な営業は一切ありません
            </p> */}
          </div>
          
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center opacity-80">
            <div>
              <div className="text-xl font-bold">50+</div>
              <div className="text-sm">導入企業</div>
            </div>
            <div>
              <div className="text-xl font-bold">500+</div>
              <div className="text-sm">実施コンテスト</div>
            </div>
            <div>
              <div className="text-xl font-bold">5,000+</div>
              <div className="text-sm">制作動画</div>
            </div>
            <div>
              <div className="text-xl font-bold">95%</div>
              <div className="text-sm">満足度</div>
            </div>
          </div> */}
          
          {/* <div className="mt-12 text-center">
            <p className="text-sm opacity-70">
              💼 次世代のTikTokマーケティングプラットフォーム Kompe
            </p>
          </div> */}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
    </section>
  );
}