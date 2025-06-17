import React from 'react';

export function ApplicationSteps() {
  const steps = [
    {
      title: 'Googleフォーム登録',
      description: '下のリンクから応募フォームにアクセスし、必要事項を入力してください。'
    },
    {
      title: '6月20日に詳細案内',
      description: '登録いただいたメールに6月20日までに投稿の詳細をお送りします。'
    },
    // {
    //   title: '動画投稿＆エントリー',
    //   description: 'TikTokに指定ハッシュタグをつけた紹介動画を投稿してエントリー完了。'
    // },
    // {
    //   title: 'ランキング発表＆報酬獲得',
    //   description: '再生数や反響をもとに順位を決定し、上位入賞者に賞金をお支払いします。'
    // }
  ];

  return (
    <section id="apply" className="py-16 px-4 bg-[#1D1D1D]">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-xl md:text-3xl font-bold mb-12 text-center flex items-center justify-center gap-2 text-white">
          <span>応募方法</span>
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-[#222222] p-4 pb-6 md:p-8 rounded-xl relative transform transition-transform duration-300 border border-white/30"
            >
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#25F4EE] rounded-full flex items-center justify-center text-black font-bold text-lg">
                {index + 1}
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-4 mt-2 text-white">{step.title}</h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}