export function CreatorCurrentContests() {
  const contests = [
    {
      id: 1,
      title: "Kompe PR動画コンテスト",
      brand: "3ureka",
      category: "Webサービス",
      totalPrize: "10万円",
      deadline: "7日後",
      participants: 23,
      description: "Kompeを拡散するための紹介動画を募集中！",
      bgColor: "from-pink-500 to-purple-600",
      hot: true
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              今熱いコンテスト🔥
            </h2>
            <p className="text-xl text-gray-600">
              今すぐ参加できる！高額賞金のコンテスト一覧
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mb-12 max-w-lg mx-auto">
            {contests.map((contest) => (
              <div key={contest.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                {contest.hot && (
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-center py-2 text-sm font-bold">
                    🔥 HOT！開催間近
                  </div>
                )}
                
                <div className={`bg-gradient-to-r ${contest.bgColor} p-6 text-white`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                      {contest.category}
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">{contest.totalPrize}</div>
                      <div className="text-sm opacity-80">総賞金</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{contest.title}</h3>
                  <div className="text-sm opacity-90">by {contest.brand}</div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-6">{contest.description}</p>
                  
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#FE2C55]">{contest.participants}</div>
                        <div className="text-xs text-gray-500">参加者</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#25F4EE]">{contest.deadline}</div>
                        <div className="text-xs text-gray-500">開催まで</div>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] text-white py-3 px-6 rounded-full font-bold hover:shadow-lg transition-shadow">
                    今すぐ参加する
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* <div className="text-center mb-12">
            <button className="bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg transition-shadow">
              もっとコンテストを見る
            </button>
          </div> */}
        </div>
      </div>
    </section>
  );
}