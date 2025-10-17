"use client";

export function CreatorTopCTA() {
  return (
    <>
      <div
        className="absolute z-10 top-[555px] right-[-408px] w-[1350px] h-[600px] bg-black/90 rounded-[100%]"
        style={{ zIndex: 0 }}
      >
        <p className="absolute top-[0px] left-[50%] translate-x-[-50%] text-white text-3xl font-bold flex items-center justify-center pt-14">
          簡単登録！今すぐ実力を試そう！
        </p>

        <a className="absolute top-[-20px] left-[50%] translate-x-[-50%] p-3 bg-[#FF0050] text-white text-xl font-bold cursor-pointer rounded-sm">
          TikTokで登録/ログイン
        </a>
      </div>
      <div
        className="absolute z-10 top-[830px] left-[-308px] w-[1350px] h-[600px] bg-black/90 rounded-[100%]"
        style={{ zIndex: 0 }}
      />
    </>
  );
}
