import Image from "next/image";

export function CreatorHero() {
  return (
    <section className="relative h-[150vw] md:h-[75vw] xl:h-[100vh] overflow-hidden flex items-start justify-center xl:block">
      <div
        className="flex flex-col xl:h-[100vh] justify-center px-0 md:px-10 xl:px-0 xl:pl-[50px] pt-[40vw] md:pt-[10vw] xl:pt-[100px]"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* 既存のコンテンツ */}
        <p className="text-[10vw] md:text-[8vw] xl:text-[5.5vw] font-bold leading-[100%]">
          完全実力主義
        </p>
        <h1 className="flex items-end">
          <span>
            <Image
              src="/images/logo/mv-tiktok.png"
              alt="TikTok Logo"
              width={0}
              height={0}
              quality={100}
              sizes="100%"
              className="w-[35vw] xl:w-[25vw]"
            />
            <span className="text-[8.5vw] md:text-[7.5vw] xl:text-[5vw] font-bold w-fit">
              クリエイター
            </span>
          </span>
          <p
            className="font-bold text-black/90 
            h-[23.5vw] md:h-[21.5vw] xl:h-[16vw] 
            text-[21vw] md:text-[20.5vw] xl:text-[15vw] 
            leading-[23.5vw] md:leading-[21.5vw] xl:leading-[16vw]"
          >
            募集
          </p>
        </h1>
        <p className="text-[8.5vw] md:text-[7.5vw] xl:text-[5vw] font-bold leading-[115%]">
          あなたの挑戦が、
          <br />
          最初の&quot;実績&quot;になる。
        </p>
      </div>
    </section>
  );
}
