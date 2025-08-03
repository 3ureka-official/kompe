export function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#FE2C55] via-[#FF0050] to-[#25F4EE] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            TikTokで稼ぐ、
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#25F4EE] to-white">
              新しいカタチ。
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 font-medium">
            あなたの動画が賞金を生む。企業コンテストに参加して収益化
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-white text-[#FE2C55] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors">
              無料で始める
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[#FE2C55] transition-colors">
              動画で見る
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold">100万円+</div>
              <div className="text-sm opacity-80">総賞金額</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">30+</div>
              <div className="text-sm opacity-80">開催コンテスト</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">100+</div>
              <div className="text-sm opacity-80">参加クリエイター</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">99%</div>
              <div className="text-sm opacity-80">満足度</div>
            </div>
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
