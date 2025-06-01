'use client';

import { useState } from 'react';

const faqs = [
  {
    question: "クリエイターへの報酬や賞金はどのように構成されていますか？",
    answer: "クリエイターへの報酬は、コンテストの賞金総額に基づいて配分されます。1位から3位まで、または設定した人数に応じて賞金が分配されます。"
  },
  {
    question: "コンテストが注目されない場合はどうなりますか？",
    answer: "コンテストが十分な注目を集めない場合、プラットフォームのプロモーション機能を活用したり、賞金額を調整することで参加者を増やすことができます。"
  },
  {
    question: "プラットフォームには何人のクリエイターがいますか？",
    answer: "現在、10万人以上のクリエイターがプラットフォームに登録しており、様々なジャンルのコンテンツ制作者が参加しています。"
  },
  {
    question: "コンテストの予算はどのくらいに設定すべきですか？",
    answer: "コンテストの予算は、ブランドの規模や目標によって異なりますが、一般的に20万円から100万円の範囲で設定されることが多いです。"
  },
  {
    question: "コンバージョンはどのように追跡できますか？",
    answer: "専用のダッシュボードで、コンテストの参加者数、エンゲージメント率、コンバージョン率などの詳細な分析データを確認できます。"
  },
  {
    question: "コンテンツの所有権は私にありますか？",
    answer: "はい、コンテストで作成されたコンテンツの商用利用権は、コンテスト主催者（ブランド）に帰属します。"
  },
  {
    question: "コンテンツマーケットフィットの発見にどのように役立ちますか？",
    answer: "多様なクリエイターからのコンテンツを通じて、どのようなメッセージやスタイルがターゲット層に響くかを効率的にテストできます。"
  },
  {
    question: "視聴数が本物であることをどのように確認できますか？",
    answer: "すべての視聴データは第三者機関によって検証され、透明性のあるレポートとして提供されます。"
  },
  {
    question: "動画はどこに投稿されますか？",
    answer: "TikTok、Instagram、YouTubeなど、主要なソーシャルメディアプラットフォームに投稿されます。"
  },
  {
    question: "クリエイターへの支払いはどのように行われますか？",
    answer: "クリエイターへの支払いは、コンテスト終了後7営業日以内に、登録された銀行口座に振り込まれます。"
  }
];

export function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">よくある質問</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg bg-white">
            <button
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
            >
              <span className="font-medium text-gray-900">{faq.question}</span>
              <svg
                className={`w-5 h-5 transform transition-transform text-primary-400 ${
                  openFaq === index ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openFaq === index && (
              <div className="px-6 pb-4">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
} 