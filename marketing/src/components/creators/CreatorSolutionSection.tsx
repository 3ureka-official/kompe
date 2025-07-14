export function CreatorSolutionSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#FE2C55] to-[#25F4EE] text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Kompeが選ばれる理由
          </h2>
          <p className="text-xl mb-16 opacity-90">
            フォロワー数に関係なく、誰でも収益化のチャンスがある新しいプラットフォーム
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <div className="text-6xl mb-6">📊</div>
              <h3 className="text-2xl font-bold mb-4">
                実力勝負
              </h3>
              <p className="text-lg opacity-90 mb-4">
                フォロワー少なくてもOK
              </p>
              <ul className="text-left space-y-2 opacity-80">
                <li>• 動画の質で評価</li>
                <li>• 再生数・エンゲージメント重視</li>
                <li>• 新人クリエイター歓迎</li>
              </ul>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <div className="text-6xl mb-6">💰</div>
              <h3 className="text-2xl font-bold mb-4">
                確実な報酬
              </h3>
              <p className="text-lg opacity-90 mb-4">
                参加するだけでもチャンス
              </p>
              <ul className="text-left space-y-2 opacity-80">
                <li>• 最低総賞金額10万円から</li>
                <li>• 複数入賞枠あり</li>
                <li>• 登録ボーナスも</li>
              </ul>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <div className="text-6xl mb-6">🎯</div>
              <h3 className="text-2xl font-bold mb-4">
                作りやすい
              </h3>
              <p className="text-lg opacity-90 mb-4">
                企業からの明確な指示
              </p>
              <ul className="text-left space-y-2 opacity-80">
                <li>• 素材も提供される</li>
                <li>• 何を作ればいいか明確</li>
                <li>• 制作サポートも充実</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16 bg-white/20 backdrop-blur-sm p-8 rounded-2xl border border-white/30">
            <h3 className="text-3xl font-bold mb-4">
              🚀 フォロワー数の呪縛から解放されよう
            </h3>
            <p className="text-xl opacity-90">
              あなたのクリエイティブスキルで、今日から収入を得られます
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}