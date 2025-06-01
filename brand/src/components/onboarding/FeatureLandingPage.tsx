'use client';

type Props = {
  onContinue: () => void;
  onSkip?: () => void;
};

export function FeatureLandingPage({ onContinue, onSkip }: Props) {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "簡単コンテスト作成",
      description: "直感的なインターフェースで、数分でコンテストを作成できます。賞金設定から応募条件まで、すべてをワンストップで管理。"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "TikTokクリエイター発見",
      description: "数万人のTikTokクリエイターの中から、あなたのブランドに最適なパートナーを見つけることができます。"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "リアルタイム分析",
      description: "コンテストの進行状況、応募数、エンゲージメント率などをリアルタイムで確認できるダッシュボード。"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      title: "自動支払いシステム",
      description: "コンテスト終了後、勝者への賞金支払いを自動化。面倒な手続きは一切不要です。"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "ブランド認知度向上",
      description: "TikTokの拡散力を活用して、ブランドの認知度を効率的に向上させることができます。"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "コミュニティ構築",
      description: "ブランドファンとクリエイターのコミュニティを構築し、長期的な関係性を築くことができます。"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      {/* ヘッダー */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">BrandContest</h1>
            {onSkip && (
              <button
                onClick={onSkip}
                className="text-gray-500 hover:text-gray-700 text-sm font-medium"
              >
                スキップ
              </button>
            )}
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* ヒーローセクション */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            ブランド作成完了！
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            おめでとうございます！これで TikTok クリエイターとのコラボレーションを始める準備が整いました。
            まずは、BrandContest の主要機能をご紹介します。
          </p>
        </div>

        {/* 機能紹介 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                {feature.icon}
                <h3 className="text-xl font-semibold text-gray-900 ml-3">{feature.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* 統計情報 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">プラットフォーム実績</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">登録クリエイター</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">開催コンテスト</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">1M+</div>
              <div className="text-gray-600">総再生回数</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
              <div className="text-gray-600">満足度</div>
            </div>
          </div>
        </div>

        {/* 次のステップ */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">次のステップ</h3>
          <p className="text-lg mb-8 opacity-90">
            プレミアムプランにアップグレードして、すべての機能をご利用ください。
            初回限定で30日間無料でお試しいただけます。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onContinue}
              className="inline-flex items-center px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
            >
              プレミアムプランを開始
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            {onSkip && (
              <button
                onClick={onSkip}
                className="inline-flex items-center px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                後で設定する
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 