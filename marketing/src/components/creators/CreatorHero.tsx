import Image from "next/image";

export function CreatorHero() {
  return (
    <section className="relative h-[650px] overflow-hidden">
      <span
        style={{ position: "absolute", top: "28px", left: "45px", zIndex: 1 }}
      >
        <Image
          src="/images/logo/logo-coloredhdpi.png"
          alt="Creator Hero"
          width={160}
          height={30}
        />
      </span>

      <div
        className="flex flex-col justify-center"
        style={{
          position: "relative",
          zIndex: 1,
          paddingTop: "65px",
          paddingLeft: "417px",
        }}
      >
        {/* 既存のコンテンツ */}
        <p className="text-[70px] font-bold leading-[100%]">完全実力主義</p>
        <h1 className="flex items-end">
          <span>
            <Image
              src="/images/logo/mv-tiktok.svg"
              alt="TikTok Logo"
              width={350}
              height={0}
            />
            <span className="text-[60px] font-bold">クリエイター</span>
          </span>
          <p
            className="font-bold text-black/90 h-[210px]"
            style={{ fontSize: "180px", lineHeight: "210px" }}
          >
            募集
          </p>
        </h1>
        <p className="text-[60px] font-bold leading-[115%]">
          あなたの挑戦が、
          <br />
          最初の&quot;実績&quot;になる。
        </p>
      </div>
    </section>
  );
}
