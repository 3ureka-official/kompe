export function BrandProblemSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              従来のインフルエンサーマーケティングの限界
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              多くの企業が直面している、TikTokマーケティングの課題を解決します
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-red-500">
              <div className="text-red-500 text-5xl mb-4">💸</div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                高額な費用
              </h3>
              <p className="text-gray-600 mb-4">1投稿100万円〜</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• 有名インフルエンサー依頼</li>
                <li>• 成果保証なし</li>
                <li>• 予算管理が困難</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-orange-500">
              <div className="text-orange-500 text-5xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                効果測定が困難
              </h3>
              <p className="text-gray-600 mb-4">ROI算出が曖昧</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• 数値の透明性が低い</li>
                <li>• 分析レポート不足</li>
                <li>• 改善策が不明</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-yellow-500">
              <div className="text-yellow-500 text-5xl mb-4">🎭</div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                方向性が不明確
              </h3>
              <p className="text-gray-600 mb-4">クリエイティブの統制困難</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• ブランドイメージと乖離</li>
                <li>• 要望の伝達が困難</li>
                <li>• 修正依頼が高額</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-red-600">
              <div className="text-red-600 text-5xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                リスク要因
              </h3>
              <p className="text-gray-600 mb-4">炎上・イメージダウン</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• 個人の発言リスク</li>
                <li>• ブランド価値の毀損</li>
                <li>• 契約トラブル</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white p-8 rounded-2xl text-center">
            <h3 className="text-3xl font-bold mb-4">
              「もっと効率的で安全なTikTokマーケティングはないか？」
            </h3>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              費用対効果が見えにくく、リスクも高い従来の手法に疑問を感じていませんか？
              <br />
              Kompeなら、これらの課題を全て解決できます。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
