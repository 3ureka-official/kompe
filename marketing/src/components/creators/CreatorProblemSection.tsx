import Image from "next/image";

export function CreatorProblemSection() {
  return (
    <section className="py-[10vw] xl:py-20 relative z-100">
      <div className="bg-white w-[90vw] xl:w-[950px] border-2 border-black/90 rounded-4xl px-[5vw] xl:px-16 mx-auto xl:gap-10 h-[50vw] xl:h-[570px] flex flex-col justify-center">
        <div>
          <div className="flex items-center mb-0 xl:mb-4 gap-2">
            <Image
              src="/images/logo/mv-tiktok.svg"
              alt="TikTok Logo"
              width={0}
              height={0}
              className="w-[13vw] xl:w-[140px]"
            />
            <p className="text-black text-[2.5vw] xl:text-3xl font-bold">
              クリエイターになるにあたって
            </p>
          </div>
          <h2 className="text-[5vw] xl:text-6xl font-bold mb-4 xl:mb-12 text-black">
            こんなお悩みありませんか？
          </h2>
        </div>

        <div className="pt-3 border-t-2 border-black space-y-[2vw] xl:space-y-8">
          <p className="font-medium flex items-end text-[2.5vw] xl:text-xl text-black">
            <span className="pr-3 text-[#FF0050] text-[2.5vw] xl:text-3xl">
              ✔︎
            </span>
            <span className="font-bold text-[2.5vw] xl:text-3xl pr-2">
              企業案件
            </span>
            に応募したいけど、募集が見つからない...
          </p>
          <p className="font-medium flex items-end text-[2.5vw] xl:text-xl text-black">
            <span className="pr-3 text-[#FF0050] text-[2.5vw] xl:text-3xl">
              ✔
            </span>
            <span className="font-bold text-[2.5vw] xl:text-3xl pr-2">
              動画制作
            </span>
            で稼ぎたいけど何から始めればいいかわからない...
          </p>
          <p className="font-medium flex items-end text-[2.5vw] xl:text-xl text-black">
            <span className="pr-3 text-[#FF0050] text-[2.5vw] xl:text-3xl">
              ✔
            </span>
            <span className="font-bold text-[2.5vw] xl:text-3xl pr-2">
              フォロワー
            </span>
            が少ないので収益化を諦めている...
          </p>
        </div>
      </div>
    </section>
  );
}
