export function CreatorProblemSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-gray-900">
            こんな悩みありませんか？
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-red-500 text-6xl mb-4">😢</div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                フォロワー1万人<br />いかない...
              </h3>
              <p className="text-gray-600">
                収益化プログラムの条件に達せず、頑張って動画を作っても稼げない
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-red-500 text-6xl mb-4">😔</div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                いいねは増えても<br />お金にならない
              </h3>
              <p className="text-gray-600">
                反応は良いのに、それが収入に繋がらない...どうやって稼ぐの？
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-red-500 text-6xl mb-4">😣</div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                企業案件なんて<br />夢のまた夢
              </h3>
              <p className="text-gray-600">
                有名インフルエンサーじゃないと企業からの依頼は来ない...
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-red-100 to-orange-100 p-8 rounded-2xl mb-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              💔 「動画作るの好きなのに、全然稼げない...」
            </h3>
            <p className="text-lg text-gray-700">
              才能はあるのに、フォロワー数という壁に阻まれて諦めていませんか？
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] text-white p-8 rounded-2xl">
            <h3 className="text-3xl font-bold mb-4">
              → Kompeなら解決できます！
            </h3>
            <p className="text-xl">
              フォロワー数ゼロでも、今すぐ収益化のチャンス
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}