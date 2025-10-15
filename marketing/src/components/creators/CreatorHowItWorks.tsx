const NumberBadge = ({ number }: { number: string }) => (
  <div className="relative inline-flex items-center justify-center">
    <span
      aria-hidden
      className="absolute -left-1 w-20 h-20 rounded-full bg-[#25F4EE] opacity-90"
    />
    <span className="relative z-10 w-20 h-20 rounded-full bg-white text-black font-bold text-4xl flex items-center justify-center transform: scale(1, 2);">
      {number}
    </span>
    <span
      aria-hidden
      className="absolute -right-1 w-20 h-20 rounded-full bg-[#FF0050] opacity-90"
    />
  </div>
);

export function CreatorHowItWorks() {
  return (
    <section className="py-25 bg-black/85">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
        <div className="text-center mb-15">
          <h2 className="text-5xl font-bold text-white">
            コンテストの参加の流れ
          </h2>
        </div>

        <div className="flex flex-col items-start justify-center gap-2">
          <div className="flex items-center gap-5 w-full">
            <NumberBadge number="01" />
            <div className="bg-white text-black p-8 rounded-2xl space-y-4 w-full">
              <h3 className="text-2xl font-bold text-gray-900 text-center">
                TikTokアカウントでKompeに登録
              </h3>
            </div>
          </div>

          {/* <span className="relative w-16 h-12 after:border-x-[32px] after:border-t-[30px] after:border-transparent after:border-t-white after:absolute after:top-0" /> */}
          <span className="font-bold border-l-2 border-white h-[30px] ml-[40px]" />

          <div className="flex items-center gap-5 w-full">
            <NumberBadge number="02" />
            <div className="bg-white text-black p-8 rounded-2xl space-y-4 w-full">
              <h3 className="text-2xl font-bold text-gray-900 text-center">
                好きなコンテストを選択
              </h3>
            </div>
          </div>

          <span className="font-bold border-l-2 border-white h-[30px] ml-[40px]" />

          <div className="flex items-center gap-5 w-full">
            <NumberBadge number="03" />
            <div className="bg-white text-black p-8 rounded-2xl space-y-4 w-full">
              <h3 className="text-2xl font-bold text-gray-900 text-center">
                TikTokに動画を投稿してコンテストに参加
              </h3>
            </div>
          </div>

          <span className="font-bold border-l-2 border-white h-[30px] ml-[40px]" />

          <div className="flex items-center gap-5 w-full">
            <NumberBadge number="04" />
            <div className="bg-white text-black p-8 rounded-2xl space-y-4 w-full">
              <h3 className="text-2xl font-bold text-gray-900 text-center">
                再生数ランキングで入賞して報酬をゲット
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
