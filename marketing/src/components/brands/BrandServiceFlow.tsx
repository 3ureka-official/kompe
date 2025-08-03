export function BrandServiceFlow() {
  const steps = [
    {
      number: "01",
      title: "コンテスト作成",
      subtitle: "要望確認",
      description:
        "ブランドの商品・サービスの紹介コンテストを作成いただきます。",
      details: ["商品・サービスの説明入力", "動画の要望入力", "賞金設定"],
      duration: "1時間",
      color: "from-blue-500 to-cyan-500",
    },
    {
      number: "02",
      title: "動画募集",
      subtitle: "参加者集客",
      description:
        "プラットフォーム内でコンテストを公開し、適切なクリエイターを募集します。",
      details: ["コンテスト公開", "ランキング表示"],
      duration: "7-14日",
      color: "from-green-500 to-teal-500",
    },
    {
      number: "03",
      title: "コンテスト終了",
      subtitle: "結果確定",
      description: "順位に応じて賞金を支払い、動画を入手します。",
      details: ["再生数集計", "賞金の支払い", "動画の入手"],
      duration: "1-2日",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              サービスの流れ
            </h2>
          </div>

          <div className="relative">
            {/* 接続線 */}
            <div className="absolute left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 hidden lg:block"></div>

            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {/* ステップ番号 */}
                  <div
                    className={`sm:flex hidden absolute left-0 top-0 w-24 h-24 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-xl z-10`}
                  >
                    {step.number}
                  </div>

                  {/* コンテンツ */}
                  <div className="sm:ml-32 lg:ml-40">
                    <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-gray-300">
                      <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1 flex flex-col justify-around">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <div className="block sm:hidden">
                              <div
                                className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-xl`}
                              >
                                {step.number}
                              </div>
                            </div>
                            {step.title}
                          </h3>
                        </div>

                        <div className="lg:col-span-2">
                          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                            {step.description}
                          </p>

                          <div className="grid md:grid-cols-2 gap-4">
                            {step.details.map((detail, detailIndex) => (
                              <div
                                key={detailIndex}
                                className="flex items-center gap-3"
                              >
                                <div
                                  className={`w-2 h-2 bg-gradient-to-r ${step.color} rounded-full`}
                                ></div>
                                <span className="text-gray-600">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
