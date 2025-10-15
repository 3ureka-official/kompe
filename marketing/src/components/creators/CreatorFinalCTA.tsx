export function CreatorFinalCTA() {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4 relative z-10 bg-[#FF0050] rounded-[100px] p-15">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-10 flex justify-between items-center">
            <span className="w-1 h-35 bg-white rotate-315" />
            <div className="flex flex-col gap-4">
              <h3 className="text-3xl font-bold text-white">
                あなたの動画が、きっと誰かの心を動かします。
              </h3>
              <h3 className="text-4xl font-bold text-white">
                今すぐコンテストに参加しよう
              </h3>
            </div>
            <span className="w-1 h-35 bg-white rotate-45" />
          </div>

          <div className="flex flex-col gap-4 justify-center max-w-md mx-auto">
            <a
              href="/pre-register/creator"
              className="cursor-pointer bg-white text-[#FE2C55] px-10 py-5 rounded-full font-bold text-2xl hover:bg-gray-100 transition-colors shadow-2xl text-center"
            >
              今すぐ始める
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
