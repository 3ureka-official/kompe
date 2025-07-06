export function BrandSolutionSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-gray-900 to-blue-800 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Kompeのソリューション
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              コンテスト形式による、新しいTikTokマーケティングの形
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold mb-8">
                なぜ企業がKompeを選ぶのか？
              </h3>
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-r from-blue-400 to-cyan-400 p-3 rounded-full text-2xl">💡</div>
                  <div>
                    <h4 className="text-xl font-bold mb-3">多様なクリエイティブを一度に獲得</h4>
                    <p className="text-gray-300 leading-relaxed">
                      複数のクリエイターが異なるアプローチで動画を制作。一つのコンテストで20〜50本の動画を獲得し、様々な視点から商品をアピールできます。
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-r from-cyan-400 to-blue-400 p-3 rounded-full text-2xl">📈</div>
                  <div>
                    <h4 className="text-xl font-bold mb-3">自然な拡散でリーチ最大化</h4>
                    <p className="text-gray-300 leading-relaxed">
                      クリエイターの個性を活かした自然な投稿により、広告感なく多くのユーザーにリーチ。従来の広告と比べて150%のリーチ向上を実現。
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-r from-blue-400 to-cyan-400 p-3 rounded-full text-2xl">💰</div>
                  <div>
                    <h4 className="text-xl font-bold mb-3">成果報酬型で費用対効果が明確</h4>
                    <p className="text-gray-300 leading-relaxed">
                      事前に決めた賞金額のみの支払い。追加費用は一切なく、予算管理が簡単。ROIも明確に算出できます。
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-r from-cyan-400 to-blue-400 p-3 rounded-full text-2xl">⚡</div>
                  <div>
                    <h4 className="text-xl font-bold mb-3">最短1週間で実施可能</h4>
                    <p className="text-gray-300 leading-relaxed">
                      従来の広告制作と比べて圧倒的にスピーディー。急なプロモーションや季節商品の訴求にも対応できます。
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <h4 className="text-xl font-bold mb-4 text-center">従来手法 vs Kompe</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left py-3 text-gray-300 font-medium">項目</th>
                        <th className="text-center py-3 text-red-400 font-medium">従来手法</th>
                        <th className="text-center py-3 text-green-400 font-medium">Kompe</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-2">
                      <tr className="border-b border-white/10">
                        <td className="py-3 text-gray-300">費用</td>
                        <td className="py-3 text-center text-red-400 line-through">50-200万円</td>
                        <td className="py-3 text-center text-green-400 font-bold">賞金総額の10%のみ</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-3 text-gray-300">制作期間</td>
                        <td className="py-3 text-center text-red-400 line-through">1〜3ヶ月</td>
                        <td className="py-3 text-center text-green-400 font-bold">1〜3週間</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-3 text-gray-300">動画本数</td>
                        <td className="py-3 text-center text-red-400 line-through">1〜3本</td>
                        <td className="py-3 text-center text-green-400 font-bold">15〜25本以上</td>
                      </tr>
                      {/* <tr className="border-b border-white/10">
                        <td className="py-3 text-gray-300">初期費用</td>
                        <td className="py-3 text-center text-red-400 line-through">あり</td>
                        <td className="py-3 text-center text-green-400 font-bold">なし</td>
                      </tr> */}
                      <tr>
                        <td className="py-3 text-gray-300">効果測定</td>
                        <td className="py-3 text-center text-red-400 line-through">曖昧</td>
                        <td className="py-3 text-center text-green-400 font-bold">明確・詳細</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-6 rounded-xl border border-blue-300/30">
                <h4 className="text-xl font-bold mb-4 text-center">導入企業の平均成果</h4>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-400">3倍</div>
                    <div className="text-sm text-gray-300">エンゲージメント率</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-cyan-400">150%</div>
                    <div className="text-sm text-gray-300">リーチ数</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-400">70%</div>
                    <div className="text-sm text-gray-300">コスト削減</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-cyan-400">85%</div>
                    <div className="text-sm text-gray-300">満足度</div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          
          {/* <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <h3 className="text-3xl font-bold mb-4">
                🚀 新時代のTikTokマーケティングを体験
              </h3>
              <p className="text-xl opacity-90 mb-6">
                効率的、安全、そして効果的な新しいマーケティング手法
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                  詳しい資料を見る
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-gray-900 transition-colors">
                  成功事例を確認
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}