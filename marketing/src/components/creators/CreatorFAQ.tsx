"use client";

import { useState } from "react";

export function CreatorFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "コンテストには無料で参加できますか？",
      answer: "完全無料で参加できます。",
    },
    {
      question: "どうやって賞金額が決まりますか？",
      answer:
        "ブランドがあらかじめ決めた順位ごとの分配率に応じて賞金が決まります。順位はTikTokの再生数によって決まります。",
    },
    {
      question: "何回でも応募できますか？",
      answer:
        "1つのコンテストに対して1人1作品までです。ただし、同時期に開催されている他のコンテストには自由に参加できます。",
    },
    {
      question: "未成年でも参加できますか？",
      answer:
        "18歳未満の方は保護者の同意が必要です。また、賞金の受取には保護者名義の口座が必要となります。",
    },
    {
      question: "フォロワー数に制限はありますか？",
      answer: "TikTokアカウントさえあれば、フォロワー0人でも参加できます。",
    },
    {
      question: "動画が審査で落ちることはありますか？",
      answer:
        "基本的にはありません。ただし、企業の要望と大きく異なる内容や、不適切な表現がある場合は参加できないことがあります。",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-[10vw] xl:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-[6vw] xl:mb-16">
            <h2 className="text-[5.5vw] xl:text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              よくあるご質問
            </h2>
          </div>

          <div className="space-y-4 mb-12">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-500 overflow-hidden hover:shadow-md transition-shadow"
              >
                <button
                  className="w-full p-[4vw] xl:p-6 text-left hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-[#FE2C55] text-[4vw] xl:text-3xl">
                        Q
                      </span>
                      <h4 className="font-bold text-gray-900 pr-4 text-[3.5vw] xl:text-lg">
                        {faq.question}
                      </h4>
                    </div>
                    <span className="text-[#FE2C55] font-bold text-[4vw] xl:text-4xl flex-shrink-0">
                      {openIndex === index ? "−" : "+"}
                    </span>
                  </div>
                </button>
                {openIndex === index && (
                  <div className="px-[4vw] xl:px-6 pb-[4vw] xl:pb-6">
                    <p className="text-gray-600 leading-relaxed text-[3vw] xl:text-lg">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
