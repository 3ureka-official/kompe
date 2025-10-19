export function CreatorFinalCTA() {
  return (
    <section className="py-10 xl:px-0 px-[10px]">
      <div className="container mx-auto px-[2vw] xl:px-4 relative z-10 bg-[#FF0050] rounded-[100px] py-[5vw] xl:py-15">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-[2vw] xl:mb-10 flex justify-center items-center gap-[2vw] xl:gap-0">
            <span className="hidden xl:block w-1 h-35 bg-white rotate-330" />
            <div className="flex flex-col gap-0 xl:gap-4">
              <h3 className="text-[3vw] xl:text-3xl font-bold text-white">
                あなたの動画が、きっと誰かの心を動かします。
              </h3>
              <h3 className="text-[3vw] xl:text-4xl font-bold text-white">
                今すぐコンテストに参加しよう
              </h3>
            </div>
            <span className="hidden xl:block w-1 h-35 bg-white rotate-30" />
          </div>

          <div className="flex flex-col gap-4 justify-center w-[50vw] xl:max-w-md mx-auto">
            <a
              href="/pre-register/creator"
              className="cursor-pointer bg-white text-[#FE2C55] px-[2vw] py-[2vw] xl:px-10 xl:py-5 rounded-full font-bold text-[2vw] xl:text-2xl hover:bg-gray-100 transition-colors shadow-2xl text-center"
            >
              今すぐ始める
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
