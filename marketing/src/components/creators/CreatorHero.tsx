import Image from "next/image";

export function CreatorHero() {
  return (
    <section className="relative z-100 h-screen overflow-hidden">
      <p className="absolute bottom-[30px] right-[8.5%] text-white text-3xl font-bold flex items-center justify-center pt-14">
        簡単登録！今すぐ実力を試そう！
      </p>

      <a className="absolute bottom-[93px] right-[200px] p-3 bg-[#FF0050] text-white text-xl font-bold cursor-pointer rounded-sm">
        TikTokで登録/ログイン
      </a>

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
          paddingTop: "75px",
          paddingLeft: "427px",
        }}
      >
        {/* 既存のコンテンツ */}
        <p className="text-[80px] font-bold leading-[100%]">完全実力主義</p>
        <h1 className="flex items-end">
          <span>
            <Image
              src="/images/logo/mv-tiktok.svg"
              alt="TikTok Logo"
              width={360}
              height={70}
            />
            <span className="text-[70px] font-bold">クリエイター</span>
          </span>
          <p
            className="font-bold text-black/90 h-[220px]"
            style={{ fontSize: "190px", lineHeight: "220px" }}
          >
            募集
          </p>
        </h1>
        <p className="text-[70px] font-bold leading-[115%]">
          あなたの挑戦が、
          <br />
          最初の&quot;実績&quot;になる。
        </p>
      </div>
    </section>
  );
}
