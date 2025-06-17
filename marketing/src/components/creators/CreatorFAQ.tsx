'use client';

import { useState } from 'react';

export function CreatorFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "本当に無料で参加できるの？",
      answer: "はい、完全無料です！登録料、参加費、手数料など一切ありません。賞金を獲得した場合も、満額をお支払いします。"
    },
    {
      question: "動画の長さはどのくらい？",
      answer: "TikTokの標準に合わせて15秒〜3分以内です。企業によって希望の長さが指定される場合もありますが、基本的には自由です。"
    },
    {
      question: "何回でも応募できる？",
      answer: "1つのコンテストに対して1人1作品までです。ただし、同時期に開催されている他のコンテストには自由に参加できます。"
    },
    {
      question: "いつ賞金もらえる？",
      answer: "コンテスト終了後、最終順位が確定してから5営業日以内にお振込みします。振込手数料は当社負担です。"
    },
    {
      question: "未成年でも参加できる？",
      answer: "18歳未満の方は保護者の同意が必要です。また、賞金の受取には保護者名義の口座が必要となります。"
    },
    {
      question: "フォロワー数に制限はある？",
      answer: "一切ありません！フォロワー0人でも参加OK。実際にフォロワー100人以下のクリエイターが入賞した例も多数あります。"
    },
    {
      question: "動画が審査で落ちることはある？",
      answer: "基本的にはありません。ただし、企業の要望と大きく異なる内容や、不適切な表現がある場合は対象外となることがあります。"
    },
    {
      question: "どうやって順位が決まるの？",
      answer: "TikTokの再生数もしくはエンゲージメント（再生数、いいね数、コメント数、シェア数）で評価します。全て自動集計なので公平です。"
    }
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
              よくある質問
            </h2>
            <p className="text-xl text-gray-600">
              疑問を解消して、安心して始めよう
            </p>
          </div>
          
          <div className="space-y-4 mb-12">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <button
                  className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-gray-900 pr-4 text-lg">{faq.question}</h4>
                    <span className="text-[#FE2C55] text-2xl flex-shrink-0">
                      {openIndex === index ? '−' : '+'}
                    </span>
                  </div>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed text-lg">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* <div className="text-center">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                他にも質問がある？
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                何でもお気軽にお聞かせください。サポートチームが24時間以内にお答えします！
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-shadow">
                  サポートに連絡
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-full font-bold hover:border-gray-400 transition-colors">
                  チュートリアルを見る
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}