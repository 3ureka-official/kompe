"use client";

import { useState } from "react";

export function BrandFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "最短でいつから開始できますか？",
      answer:
        "最短1週間で開始可能です。お急ぎの場合は緊急対応オプション（+2万円）をご利用いただくことで、3日以内の開始も可能です。ただし、より効果的な施策のためには2週間程度の準備期間をお勧めします。",
    },
    {
      question: "どんな業種でも利用可能ですか？",
      answer:
        "美容、ファッション、食品、テクノロジー、エンターテイメントなど、幅広い業種でご利用いただけます。ただし、法的規制の厳しい業界（医療、金融等）については事前にご相談ください。",
    },
    {
      question: "動画の著作権はどうなりますか？",
      answer:
        "基本的には投稿者（クリエイター）に著作権が帰属しますが、貴社には該当コンテスト期間中の宣伝目的での使用権が付与されます。別途オプションで二次利用権（+3万円）を取得することも可能です。",
    },
    {
      question: "不適切な動画への対処はどうなっていますか？",
      answer:
        "AIによる自動チェックと運営チームによる人的監視により、不適切な内容は事前に排除されます。また、万が一問題のある投稿があった場合は、24時間以内に削除対応いたします。",
    },
    {
      question: "効果測定はどのように行われますか？",
      answer:
        "TikTokのAPIを通じて再生数、いいね数、コメント数、シェア数を自動集計します。さらに詳細分析レポートオプションでは、ROI、ブランド認知度向上、ターゲット層分析なども提供いたします。",
    },
    {
      question: "支払いタイミングはいつですか？",
      answer:
        "コンテスト開始前に賞金総額と手数料をお支払いいただきます。クレジットカード決済と銀行振込に対応しており、請求書発行も可能です。",
    },
    {
      question: "参加クリエイターの質は保証されますか？",
      answer:
        "プラットフォーム登録時に一定の審査を行っており、過去の投稿品質や評価も考慮してクリエイターを選定しています。プロフェッショナルプラン以上では、より厳選されたクリエイターを優先的にアサインします。",
    },
    {
      question: "競合他社との差別化ポイントは何ですか？",
      answer:
        "①完全成果報酬型の透明な料金体系 ②最短1週間の圧倒的スピード ③自動集計による公平性 ④多様なクリエイティブの一括獲得 ⑤詳細な効果測定とレポート機能が主な差別化ポイントです。",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              よくあるご質問
            </h2>
            <p className="text-xl text-gray-600">
              導入をご検討中の企業様からよくいただくご質問
            </p>
          </div>

          <div className="space-y-4 mb-12">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <button
                  className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-gray-900 pr-4 text-lg leading-relaxed">
                      {faq.question}
                    </h4>
                    <span className="text-blue-600 text-2xl flex-shrink-0 mt-1">
                      {openIndex === index ? "−" : "+"}
                    </span>
                  </div>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                📞 個別相談をご希望の方
              </h3>
              <p className="text-gray-600 mb-6">
                貴社の状況に合わせた詳しいご提案をいたします。専門スタッフが丁寧にお答えします。
              </p>
              <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-shadow w-full">
                無料相談を予約
              </button>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                📄 詳細資料をお求めの方
              </h3>
              <p className="text-gray-600 mb-6">
                サービス詳細、導入事例、料金表などを含む包括的な資料をご提供します。
              </p>
              <button className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-600 hover:text-white transition-colors w-full">
                資料ダウンロード
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
