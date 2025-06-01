'use client';

import { useRouter } from 'next/navigation';

const features = [
  "コンテストと取引への完全アクセス",
  "厳選されたクリエイターネットワークへのアクセス",
  "受賞作品のSpark広告コードへのアクセス",
  "受賞作品への生涯アクセス",
  "コンテンツマーケットフィットの高速実現",
  "オーガニックなコンテンツ検証"
];

export function LaunchContestSection() {
  const router = useRouter();

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8 text-gray-900">初回コンテストを開始</h2>
        
        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
          <h3 className="text-2xl font-semibold mb-8 text-gray-900">ご利用いただける機能</h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <div className="w-6 h-6 bg-primary-400 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          <div className="bg-primary-50 rounded-lg p-6 mb-8">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary-400 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-medium text-gray-900">
                ボーナス — 無料のオンボーディングコールを予約して、専門家のアドバイスを受け、
                トップパフォーマンスのコンテンツにのみ支払うことでROIを最大化しましょう。
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center mb-8">
            <div className="text-center">
              <div className="flex items-baseline justify-center mb-2">
                <span className="text-5xl font-bold text-primary-400">¥0</span>
                <span className="text-2xl text-gray-500 line-through ml-4">¥50,000</span>
              </div>
              <div className="flex items-center justify-center text-primary-600 mb-4">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>初期費用なし。いつでもキャンセル可能</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => router.push('/signup')}
            className="w-full bg-primary-400 hover:bg-primary-500 text-black font-semibold py-4 px-8 rounded-lg text-lg transition-colors"
          >
            1ヶ月無料で試す
          </button>
        </div>
      </div>
    </section>
  );
} 