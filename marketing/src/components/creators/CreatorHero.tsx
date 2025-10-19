import Image from "next/image";

export function CreatorHero() {
  return (
    <section className="relative h-[90vw] md:h-[75vw] xl:h-[650px] overflow-hidden flex items-center sm:items-start justify-center xl:block">
      <span
        style={{ position: "absolute", top: "2.5vw", left: "4.5vw", zIndex: 1 }}
      >
        <Image
          src="/images/logo/logo-coloredhdpi.png"
          alt="Creator Hero"
          width={160}
          height={30}
          className="w-[16vw] xl:w-[160px]"
        />
      </span>

      <div
        className="flex flex-col justify-center px-10 xl:px-0 xl:pl-[50px] pt-[10vw] xl:pt-[100px]"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* 既存のコンテンツ */}
        <p className="text-[8vw] xl:text-[80px] font-bold leading-[100%]">
          完全実力主義
        </p>
        <h1 className="flex items-end">
          <span>
            <Image
              src="/images/logo/mv-tiktok.svg"
              alt="TikTok Logo"
              width={0}
              height={0}
              className="w-[35vw] xl:w-[350px]"
            />
            <span className="text-[7.5vw] xl:text-[70px] font-bold w-fit">
              クリエイター
            </span>
          </span>
          <p
            className="font-bold text-black/90 
            h-[21.5vw]  xl:h-[230px] 
            text-[15vw] md:text-[20.5vw] xl:text-[190px] 
            leading-[21.5vw] xl:leading-[230px]"
          >
            募集
          </p>
        </h1>
        <p className="text-[7.5vw] xl:text-[70px] font-bold leading-[115%]">
          あなたの挑戦が、
          <br />
          最初の&quot;実績&quot;になる。
        </p>
      </div>
    </section>
  );
}
