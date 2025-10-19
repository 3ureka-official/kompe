"use client";

export function CreatorTopCTA() {
  return (
    <>
      <div
        className="absolute z-10 
        top-[80vw] md:top-[65vw] xl:top-[455px] 
        right-[-50%] translate-x-[-50%] xl:right-[-178px] xl:translate-x-0
        w-[100vw] xl:w-[850px] 
        h-[25vw] xl:h-[800px] 
        bg-[#222] 
        rounded-[100%]"
      >
        <p className="absolute whitespace-nowrap top-[-25px] sm:top-[2vw] xl:top-[20px] left-[50%] translate-x-[-50%] text-white text-[3.5vw] xl:text-3xl font-bold flex items-center justify-center pt-14">
          簡単登録！今すぐ実力を試そう！
        </p>

        <a className="absolute whitespace-nowrap top-[-2vw] xl:top-[-20px] left-[50%] translate-x-[-50%] py-[1.3vw] px-5 xl:py-5 xl:px-8 bg-[#FF0050] text-white text-[3vw] xl:text-3xl font-bold cursor-pointer rounded-sm">
          TikTokで登録/ログイン
        </a>
      </div>
      <div
        className="absolute z-10 top-[91vw] md:top-[78vw] xl:top-[680px] left-0 w-[100vw] h-[65vw] xl:h-[680px] bg-[#222]"
        style={{ zIndex: 0 }}
      />
    </>
  );
}
