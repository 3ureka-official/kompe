export function BrandPricing() {
  const plans = [
    {
      name: "ブロンズ",
      prizeRange: "20万円",
      fee: "2万円",
      influencer: "1000人~1万人",
      suitable: "初回利用・小規模施策",
      color: "from-yellow-700 to-orange-700",
      popular: false,
    },
    {
      name: "シルバー",
      prizeRange: "50万円",
      fee: "5万円",
      influencer: "1万人~10万人",
      suitable: "本格的なマーケティング施策",
      color: "from-stone-500 to-slate-500",
      popular: true,
    },
    {
      name: "ゴールド",
      prizeRange: "100万円",
      fee: "10万円",
      influencer: "10万人~",
      suitable: "大規模キャンペーン・ブランディング",
      color: "from-yellow-500 to-orange-500",
      popular: false,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              コンテスト料金
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              シンプルで透明性の高い料金体系
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-xl border-2 ${plan.popular ? "border-purple-500 scale-105" : "border-gray-200"} overflow-hidden`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-2 text-sm font-bold">
                    ⭐ 最も人気
                  </div>
                )}

                <div
                  className={`bg-gradient-to-r ${plan.color} text-white p-6 ${plan.popular ? "pt-12" : ""}`}
                >
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold mb-1">
                    {plan.prizeRange}
                  </div>
                  <div className="text-lg opacity-90 mb-4">賞金総額目安</div>
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
                    <div className="text-sm opacity-80">手数料</div>
                    <div className="text-xl font-bold">{plan.fee}</div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-6">
                    <div className="text-sm text-gray-600 mb-2">
                      インフルエンサー数
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      {plan.influencer}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm text-gray-600 mb-2">適用場面</div>
                    <div className="text-gray-700">{plan.suitable}</div>
                  </div>

                  <button
                    className={`w-full bg-gradient-to-r ${plan.color} text-white py-3 px-6 rounded-lg font-bold hover:shadow-lg transition-shadow`}
                  >
                    このプランで相談
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* <div className="bg-gray-50 p-8 rounded-2xl mb-12">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">オプションサービス</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-3xl mb-4">📊</div>
                <h4 className="font-bold mb-2">詳細分析レポート</h4>
                <p className="text-gray-600 text-sm mb-3">より詳細なROI分析・改善提案</p>
                <div className="text-lg font-bold text-blue-600">+5万円</div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-3xl mb-4">🎬</div>
                <h4 className="font-bold mb-2">動画二次利用権</h4>
                <p className="text-gray-600 text-sm mb-3">広告・HP等での利用権取得</p>
                <div className="text-lg font-bold text-blue-600">+3万円</div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-3xl mb-4">⚡</div>
                <h4 className="font-bold mb-2">緊急対応</h4>
                <p className="text-gray-600 text-sm mb-3">3日以内の急ぎ対応</p>
                <div className="text-lg font-bold text-blue-600">+2万円</div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-3xl mb-4">🎯</div>
                <h4 className="font-bold mb-2">継続施策提案</h4>
                <p className="text-gray-600 text-sm mb-3">3ヶ月分の施策ロードマップ</p>
                <div className="text-lg font-bold text-blue-600">+8万円</div>
              </div>
            </div>
          </div> */}

          {/* <div className="text-center">
            <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">
                💼 まずは無料相談から
              </h3>
              <p className="text-lg opacity-90 mb-6">
                貴社の状況に最適なプランをご提案いたします。<br />
                お気軽にお問い合わせください。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                  無料相談を予約
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-gray-900 transition-colors">
                  詳細資料をダウンロード
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
