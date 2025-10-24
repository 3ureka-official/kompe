import Image from "next/image";

export function CreatorSolutionSection() {
  return (
    <section className="pt-[10vw] xl:pt-30 pb-15 bg-white mx-auto gap-[5vw] xl:gap-10 flex flex-col justify-center items-center">
      <h2 className="text-[5.5vw] md:text-[5.2vw] xl:text-6xl font-bold text-black flex items-center gap-1 md:gap-3 xl:gap-5">
        そのお悩み
        <Image
          src="/images/logo/logo-characters.svg"
          alt="Kompe Logo Characters"
          width={0}
          height={0}
          className="w-[25vw] md:w-[23vw] xl:w-[270px] m-auto"
        />
        が解決します!
      </h2>

      <div className="flex flex-col gap-[12vw] xl:gap-20 px-4 md:px-10 xl:px-0 xl:container">
        <div className="bg-white/10 flex flex-col xl:flex-row xl:h-[450px] px-[10px] xl:px-0 backdrop-blur-sm gap-0 xl:gap-10">
          <div className="w-full flex items-center justify-center">
            <Image
              src="/images/contest-cards.png"
              alt="Contest Cards"
              width={0}
              height={0}
              sizes="100%"
              quality={100}
              style={{ width: "100%" }}
            />
          </div>
          <div className="py-[3vw] xl:py-5 w-full flex flex-col gap-[2vw] xl:gap-10 justify-center">
            <div className="flex items-end gap-2 border-b-2 border-black pb-[2vw] xl:pb-5">
              {/* <NumberBadge number="01" /> */}
              <h3 className="text-[4vw] xl:text-4xl font-bold pl-3">
                ショート動画の
                <span className="text-[7vw] xl:text-6xl">コンテスト</span>
              </h3>
            </div>
            <div>
              <p className="text-[3vw] xl:text-xl opacity-90 mb-[5vw] xl:mb-10 leading-[160%] xl:leading-10">
                Kompeは、ブランドのお題で
                <span className="text-[#FF0050] font-bold">
                  &quot;PR動画&quot;
                </span>
                を作って競うコンテストです。
                <br />
                コンテストで上位入賞すると
                <span className="text-[#FF0050] font-bold">賞金</span>
                がもらえます。
              </p>
              <a
                href={process.env.NEXT_PUBLIC_CREATOR_APP_URL}
                className="cursor-pointer bg-[#FF0050] text-white px-5 py-3 text-[2.8vw] md:text-[2vw] xl:text-md rounded-md font-bold hover:bg-[#FE2C55] shadow-2xl text-center"
              >
                今すぐ始める
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white/10 flex flex-col xl:flex-row-reverse xl:h-[450px] px-[10px] xl:px-0 backdrop-blur-sm gap-0 xl:gap-10">
          <div className="w-full flex items-center justify-center">
            <Image
              src="/images/ranking.png"
              alt="Contest Cards"
              width={0}
              height={0}
              sizes="100%"
              quality={100}
              style={{ width: "80%", marginBottom: "20px" }}
            />
          </div>
          <div className="w-full flex flex-col gap-[2vw] xl:gap-10 justify-center">
            <div className="flex items-end gap-2 border-b-2 border-black pb-[2vw] xl:pb-5">
              {/* <NumberBadge number="01" /> */}
              <h3 className="text-[4vw] xl:text-4xl font-bold pl-3">
                <span className="text-[7vw] xl:text-6xl">再生数</span>
                でフェアに評価
              </h3>
            </div>
            <div>
              <p className="text-[3vw] xl:text-xl opacity-90 mb-[5vw] xl:mb-10 leading-[160%] xl:leading-10">
                Kompeでは
                <span className="text-[#FF0050] font-bold">再生数</span>
                で評価されるPRコンテストに参加できます。
                <br />
                TikTokの
                <span className="text-[#FF0050] font-bold">
                  &quot;バズりやすさ&quot;
                </span>
                を利用して、フォロワー数関係なく誰でも報酬を得るチャンスがあります。
              </p>
              <a
                href={process.env.NEXT_PUBLIC_CREATOR_APP_URL}
                className="cursor-pointer bg-[#FF0050] text-white px-5 py-3 text-[2.8vw] md:text-[2vw] xl:text-md rounded-md font-bold hover:bg-[#FE2C55] shadow-2xl text-center"
              >
                今すぐ始める
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white/10 flex flex-col xl:flex-row xl:h-[450px] px-[10px] xl:px-0 backdrop-blur-sm gap-0 xl:gap-10">
          <div className="w-full flex items-center justify-center">
            <Image
              src="/images/contract.png"
              alt="Contract"
              width={0}
              height={0}
              sizes="100%"
              quality={100}
              style={{ width: "100%" }}
            />
          </div>
          <div className="py-5 w-full flex flex-col gap-[2vw] xl:gap-10 justify-center">
            <div className="flex items-center gap-2 border-b-2 border-black pb-[2vw] xl:pb-5">
              {/* <NumberBadge number="02" /> */}
              <h3 className="text-[4vw] xl:text-4xl font-bold pl-3">
                入賞で<span className="text-[7vw] xl:text-6xl">次の仕事</span>
                に繋がる
              </h3>
            </div>
            <div>
              <p className="text-[3vw] xl:text-xl opacity-90 mb-[5vw] xl:mb-10 leading-[160%] xl:leading-10">
                コンテストでの入賞はあなたの
                <span className="text-[#FF0050] font-bold">実績</span>
                になります。
                <br />
                受賞作はブランドの目に触れ、
                <span className="text-[#FF0050] font-bold">継続依頼</span>や
                <span className="text-[#FF0050] font-bold">案件</span>
                に繋がります。
              </p>
              <a
                href={process.env.NEXT_PUBLIC_CREATOR_APP_URL}
                className="cursor-pointer text-[2.8vw] md:text-[2vw] xl:text-md bg-[#FF0050] text-white px-5 py-3 rounded-md font-bold hover:bg-[#FE2C55] shadow-2xl text-center"
              >
                今すぐ始める
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
