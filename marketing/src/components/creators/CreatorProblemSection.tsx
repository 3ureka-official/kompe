import Image from "next/image";

export function CreatorProblemSection() {
  return (
    <section className="py-[10vw] xl:py-20 relative z-100">
      <div className="bg-white w-[100vw] md:w-[90vw] xl:w-[950px] border-2 border-black/90 rounded-[20vw] md:rounded-4xl px-[5vw] xl:px-16 mx-auto xl:gap-10 h-[100vw] md:h-[55vw] xl:h-[570px] flex flex-col justify-center relative">
        <div>
          <div className="flex items-center mb-0 xl:mb-4 gap-2">
            <Image
              src="/images/logo/mv-tiktok.png"
              alt="TikTok Logo"
              width={0}
              height={0}
              quality={100}
              className="w-[15vw] md:w-[13vw] xl:w-[140px]"
            />
            <p className="text-black text-[4vw] md:text-[3.5vw] xl:text-3xl font-bold">
              クリエイターになるにあたって
            </p>
          </div>
          <h2 className="text-[6vw] md:text-[5vw] xl:text-6xl font-bold mb-4 xl:mb-12 text-black">
            こんなお悩みありませんか？
          </h2>
        </div>

        <div className="pt-3 border-t-2 border-black space-y-[2vw] xl:space-y-8">
          <p className="font-medium text-[4.5vw] md:text-[2.5vw] xl:text-xl text-black">
            <span className="inline font-bold text-[#FF0050] text-[5vw] md:text-[2.5vw] xl:text-3xl leading-none mr-1 md:mr-2">
              ・
            </span>
            <span className="inline font-bold text-[4.5vw] md:text-[2.5vw] xl:text-3xl">
              企業案件
            </span>
            に応募したいけど、募集が見つからない...
          </p>
          <p className="font-medium text-[4.5vw] md:text-[2.5vw] xl:text-xl text-black">
            <span className="inline font-bold text-[#FF0050] text-[5vw] md:text-[2.5vw] xl:text-3xl leading-none mr-1 md:mr-2">
              ・
            </span>
            <span className="inline font-bold text-[4.5vw] md:text-[2.5vw] xl:text-3xl">
              動画制作
            </span>
            で稼ぎたいけど何から始めればいいかわからない...
          </p>
          <p className="font-medium text-[4.5vw] md:text-[2.5vw] xl:text-xl text-black">
            <span className="inline font-bold text-[#FF0050] text-[5vw] md:text-[2.5vw] xl:text-3xl leading-none mr-1 md:mr-2">
              ・
            </span>
            <span className="inline font-bold text-[4.5vw] md:text-[2.5vw] xl:text-3xl">
              フォロワー
            </span>
            が少ないので収益化を諦めている...
          </p>
        </div>

        {/* 下向き矢印 */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
          <div className="relative bg-white py-2.5 text-center">
            {/* 三角形部分 */}
            <div className="absolute z-10 bottom-[26px] left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-t-[37px] border-r-[37px] border-l-[37px] border-b-0 border-t-white border-r-transparent border-l-transparent"></div>

            <div className="absolute z-0 bottom-[24px] left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-t-[38px] border-r-[38px] border-l-[38px] border-b-0 border-t-black/90 border-r-transparent border-l-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
