export function BrandSolutionSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Kompeを使う理由
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                パフォーマンスの高いコンテンツのみに支払う
              </h3>
              <p className="text-md text-gray-600 leading-relaxed">
                実際のエンゲージメントデータに基づき、成果を出した動画だけに報酬を支払うため、無駄なコストを排除できます。
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                クリエイターとのやり取りの手間を省く
              </h3>
              <p className="text-md text-gray-600 leading-relaxed">
                応募からライセンス管理、報酬支払いまで一元管理。面倒な交渉や契約業務を大幅に簡素化します。
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                “相性の良い”クリエイターとの継続的なマッチング
              </h3>
              <p className="text-md text-gray-600 leading-relaxed">
                コンテスト受賞者はブランドにマッチした実績者。次回以降も信頼できるクリエイターと継続的にコラボできます。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
