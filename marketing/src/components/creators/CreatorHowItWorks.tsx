export function CreatorHowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              簡単3ステップ
            </h2>
            <p className="text-xl text-gray-600">
              今すぐ始められる、シンプルな流れ
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 hidden md:block"></div>
            
            <div className="space-y-8">
              <div className="flex flex-col items-center gap-8 ">
                <div className="md:w-2/3 border-2 border-red-500 p-8 rounded-2xl">
                  <div className="bg-gradient-to-r from-[#FE2C55] to-[#FF0050] text-white p-4 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-6 mx-auto md:mx-0">
                    01
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center md:text-left">
                    好きなコンテスト選ぶ
                  </h3>
                  <p className="text-sm md:text-lg text-gray-600 mb-6 text-center md:text-left">
                    美容、ファッション、グルメ...あなたの得意分野から選んで参加
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="text-[#25F4EE]">✓</span>
                      賞金額を事前確認
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#25F4EE]">✓</span>
                      締切まで余裕を確認
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#25F4EE]">✓</span>
                      得意ジャンルで勝負
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex flex-col items-center gap-8">
                <div className="md:w-2/3 border-2 border-sky-500 p-8 rounded-2xl">
                  <div className="bg-gradient-to-r from-[#25F4EE] to-[#00D4FF] text-white p-4 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-6 mx-auto md:mx-0">
                    02
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center md:text-left">
                    動画作って投稿
                  </h3>
                  <p className="text-sm md:text-lg text-gray-600 mb-6 text-center md:text-left">
                    企業の要望を確認して、素材を使って動画を作成・TikTokに投稿
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="text-[#25F4EE]">✓</span>
                      企業から素材提供
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#25F4EE]">✓</span>
                      明確な制作ガイド
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#25F4EE]">✓</span>
                      自由な表現もOK
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex flex-col items-center gap-8">
                <div className="md:w-2/3 border-2 border-yellow-500 p-8 rounded-2xl">
                  <div className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-white p-4 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-6 mx-auto md:mx-0">
                    03
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center md:text-left">
                    ランキング入りで賞金！
                  </h3>
                  <p className="text-sm md:text-lg text-gray-600 mb-6 text-center md:text-left">
                    再生数やエンゲージメントでランキング決定。上位入賞で賞金ゲット！
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="text-[#25F4EE]">✓</span>
                      リアルタイム順位更新
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#25F4EE]">✓</span>
                      自動集計で公平
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#25F4EE]">✓</span>
                      5営業日以内振込
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-16 max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] text-white p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">
                完全公平なシステム
              </h3>
              <p className="text-lg opacity-90">
                再生数・いいね数・コメント数を自動集計。人為的な操作一切なし！
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}