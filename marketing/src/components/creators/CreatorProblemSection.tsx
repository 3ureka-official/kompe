import Image from "next/image";

export function CreatorProblemSection() {
  return (
    <section className="px-40 py-20 relative z-100">
      <div className="bg-white border-2 border-black/90 rounded-2xl px-20 mx-auto gap-10 h-[570px] flex flex-col justify-center">
        <div>
          <div className="flex items-center mb-4 gap-2">
            <Image
              src="/images/logo/mv-tiktok.svg"
              alt="TikTok Logo"
              width={140}
              height={38}
            />
            <p className="text-black text-3xl font-bold">
              クリエイターになるにあたって
            </p>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-12 text-black">
            こんなお悩みありませんか？
          </h2>
        </div>

        <div className="py-8 border-t-2 border-black space-y-8">
          <p className="font-medium flex items-end text-xl text-black">
            <span className="pr-3 text-[#FF0050] text-3xl">✔︎</span>
            <span className="font-bold text-3xl pr-2">企業案件</span>
            に応募したいけど、募集が見つからない...
          </p>
          <p className="font-medium flex items-end text-xl text-black">
            <span className="pr-3 text-[#FF0050] text-3xl">✔</span>
            <span className="font-bold text-3xl pr-2">動画制作</span>
            で稼ぎたいけど何から始めればいいかわからない...
          </p>
          <p className="font-medium flex items-end text-xl text-black">
            <span className="pr-3 text-[#FF0050] text-3xl">✔</span>
            <span className="font-bold text-3xl pr-2">フォロワー</span>
            が少ないので収益化を諦めている...
          </p>
        </div>
      </div>
    </section>
  );
}
