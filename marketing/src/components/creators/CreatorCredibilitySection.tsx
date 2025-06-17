export function CreatorCredibilitySection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              みんなの成功体験
            </h2>
            <p className="text-xl text-gray-600">
              フォロワー数関係なく、実際に稼いでいるクリエイターたち
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#FE2C55] mb-2">100+</div>
              <div className="text-gray-600 font-medium">参加クリエイター</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#25F4EE] mb-2">500万円+</div>
              <div className="text-gray-600 font-medium">総獲得賞金</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#FE2C55] mb-2">50+</div>
              <div className="text-gray-600 font-medium">開催済みコンテスト</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#25F4EE] mb-2">平均3万円</div>
              <div className="text-gray-600 font-medium">月間獲得額</div>
            </div>
          </div>
          
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
              💬 リアルな声
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-[#FE2C55]">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    M
                  </div>
                  <div className="ml-4">
                    <div className="font-bold text-gray-900">まいかさん</div>
                    <div className="text-gray-600 text-sm">フォロワー800人</div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 text-lg">
                  「初投稿で5万円ゲット！フォロワー少なくても全然大丈夫でした」
                </p>
                <div className="text-[#FFD700] text-xl">⭐⭐⭐⭐⭐</div>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-[#25F4EE]">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#25F4EE] to-[#FE2C55] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    T
                  </div>
                  <div className="ml-4">
                    <div className="font-bold text-gray-900">たけしさん</div>
                    <div className="text-gray-600 text-sm">フォロワー1,200人</div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 text-lg">
                  「毎月2〜3万円の副収入に！企業の要望も明確で作りやすい」
                </p>
                <div className="text-[#FFD700] text-xl">⭐⭐⭐⭐⭐</div>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-[#FE2C55]">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    S
                  </div>
                  <div className="ml-4">
                    <div className="font-bold text-gray-900">さくらさん</div>
                    <div className="text-gray-600 text-sm">フォロワー500人</div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 text-lg">
                  「フォロワー500人でも毎月入賞してます。コツコツ頑張れば稼げる！」
                </p>
                <div className="text-[#FFD700] text-xl">⭐⭐⭐⭐⭐</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] text-white p-8 rounded-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">
              🎉 次はあなたの番です
            </h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              フォロワー数に関係なく、みんな実際に稼いでいます。
              あなたも今すぐ始めませんか？
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}