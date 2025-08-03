export function CreatorFinalCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#FE2C55] via-[#FF0050] to-[#25F4EE] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            今なら登録ボーナス！
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-2xl mx-auto">
            初回応募で必ず1,000円プレゼント🎁<br />
            フォロワー数ゼロでも、今すぐ稼げます
          </p> */}

          {/* <div className="bg-white/20 backdrop-blur-sm p-8 rounded-2xl border border-white/30 mb-12">
            <h3 className="text-2xl font-bold mb-6">
              🎉 期間限定キャンペーン
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">1,000円</div>
                <div className="text-sm opacity-90">初回登録ボーナス</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">500円</div>
                <div className="text-sm opacity-90">友達紹介ボーナス</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">5,000円</div>
                <div className="text-sm opacity-90">月間MVPボーナス</div>
              </div>
            </div>
          </div> */}

          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-8">
              ✨ あなたの才能を待っている企業がいます
            </h3>
            {/* <div className="flex flex-wrap justify-center gap-4 opacity-80 mb-8">
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm">#美容コスメ</span>
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm">#ファッション</span>
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm">#グルメ</span>
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm">#ライフスタイル</span>
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm">#エンタメ</span>
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm">#ゲーム</span>
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm">#Webサービス・アプリ</span>
            </div> */}
          </div>

          <div className="text-center mb-12">
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              TikTokで動画を作るのが好きなら、
              <br />
              <strong className="text-2xl">それをお金に変えませんか？</strong>
              <br />
              あなたの創造性が、きっと誰かの心を動かします。
            </p>

            <div className="flex flex-col gap-4 justify-center max-w-md mx-auto">
              <a
                href="/pre-register/creator"
                className="cursor-pointer bg-white text-[#FE2C55] px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-100 transition-colors shadow-2xl text-center"
              >
                事前登録はこちら
              </a>

              {/* <button className="cursor-pointer bg-white text-[#FE2C55] px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-100 transition-colors shadow-2xl">
                今すぐ始める
              </button> */}
              {/* <p className="text-sm opacity-70">
                登録は30秒で完了 | いつでも退会OK
              </p> */}
            </div>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-3 gap-6 text-center opacity-80 max-w-lg mx-auto">
            <div>
              <div className="text-2xl font-bold">0円</div>
              <div className="text-sm">参加費用</div>
            </div>
            <div>
              <div className="text-2xl font-bold">1分</div>
              <div className="text-sm">登録時間</div>
            </div>
            <div>
              <div className="text-2xl font-bold">10万円</div>
              <div className="text-sm">最低総賞金</div>
            </div>
            {/* <div>
              <div className="text-2xl font-bold">100+</div>
              <div className="text-sm">仲間</div>
            </div> */}
          </div>

          <div className="mt-16 text-center">
            <p className="text-lg opacity-70">
              💡 動画作りが好きなら、それが一番の才能です
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
    </section>
  );
}
