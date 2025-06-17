export function BrandCaseStudies() {
  const caseStudies = [
    {
      company: "コスメブランドA",
      industry: "美容・化粧品",
      challenge: "新商品リップの認知度向上",
      solution: "メイク動画コンテスト",
      results: {
        reach: "200万回再生",
        engagement: "350%向上",
        conversion: "売上30%増加",
        cost: "従来比60%削減"
      },
      testimonial: "想定を大きく上回る反響で、新商品の認知度が一気に向上しました。特に若年層へのリーチ力が圧倒的でした。",
      bgColor: "from-pink-500 to-purple-600"
    },
    {
      company: "ファッションブランドB",
      industry: "アパレル",
      challenge: "春夏コレクションの訴求",
      solution: "コーディネート動画コンテスト",
      results: {
        reach: "150万回再生",
        engagement: "280%向上",
        conversion: "ECサイト流入400%増",
        cost: "予算内で完遂"
      },
      testimonial: "クリエイターの皆さんの創造性により、私たちが考えもしなかった素敵なコーディネートが多数生まれました。",
      bgColor: "from-blue-500 to-teal-600"
    },
    {
      company: "食品メーカーC",
      industry: "食品・飲料",
      challenge: "新商品スナックのプロモーション",
      solution: "グルメレポート動画コンテスト",
      results: {
        reach: "300万回再生",
        engagement: "420%向上",
        conversion: "店頭売上50%増",
        cost: "ROI 5.2倍"
      },
      testimonial: "多様な食べ方提案で商品の魅力を多角的に伝えることができ、売上に直結する結果となりました。",
      bgColor: "from-orange-500 to-red-600"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              導入企業の成功事例
            </h2>
            <p className="text-xl text-gray-600">
              実際の数値で証明される、Kompeの効果
            </p>
          </div>
          
          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg">
                <div className={`bg-gradient-to-r ${study.bgColor} text-white p-8`}>
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-3xl font-bold mb-2">{study.company}</h3>
                      <div className="text-lg opacity-90 mb-4">{study.industry}</div>
                      <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                        <div className="text-sm opacity-80 mb-2">課題</div>
                        <div className="text-lg font-medium">{study.challenge}</div>
                      </div>
                    </div>
                    <div>
                      <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                        <div className="text-sm opacity-80 mb-2">ソリューション</div>
                        <div className="text-2xl font-bold">{study.solution}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-bold mb-6 text-gray-900">成果指標</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-xl shadow-sm border">
                          <div className="text-2xl font-bold text-blue-600">{study.results.reach}</div>
                          <div className="text-sm text-gray-600">総再生数</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border">
                          <div className="text-2xl font-bold text-green-600">{study.results.engagement}</div>
                          <div className="text-sm text-gray-600">エンゲージメント率</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border">
                          <div className="text-2xl font-bold text-purple-600">{study.results.conversion}</div>
                          <div className="text-sm text-gray-600">コンバージョン</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border">
                          <div className="text-2xl font-bold text-orange-600">{study.results.cost}</div>
                          <div className="text-sm text-gray-600">コスト効率</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-xl font-bold mb-6 text-gray-900">お客様の声</h4>
                      <div className="bg-gray-100 p-6 rounded-xl">
                        <div className="text-4xl text-gray-400 mb-4">"</div>
                        <p className="text-gray-700 text-lg italic leading-relaxed mb-4">
                          {study.testimonial}
                        </p>
                        <div className="text-right text-gray-600 font-medium">
                          — {study.company} マーケティング担当者
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">
                📈 あなたの企業も同様の成果を実現できます
              </h3>
              <p className="text-lg opacity-90 mb-6">
                業界・規模を問わず、多くの企業がKompeで成功を収めています
              </p>
              <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                類似事例を詳しく見る
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}