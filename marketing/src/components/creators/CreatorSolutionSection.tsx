import Image from "next/image";

export function CreatorSolutionSection() {
  return (
    <section className="pt-30 pb-15 bg-white  mx-auto gap-10 flex flex-col justify-center items-center">
      <h2 className="text-4xl md:text-6xl font-bold text-black flex items-center gap-3">
        そのお悩み
        <Image
          src="/images/logo/logo-characters.svg"
          alt="Kompe Logo Characters"
          width={0}
          height={0}
          sizes="100%"
          style={{ width: "270px", height: "auto" }}
        />
        が解決します!
      </h2>

      <div className="flex flex-col gap-20 container">
        <div className="bg-white/10 flex h-[450px] backdrop-blur-sm gap-10">
          <div className="w-full flex items-center justify-center">
            <Image
              src="/images/contest-cards.png"
              alt="Contest Cards"
              width={0}
              height={0}
              sizes="100%"
              style={{ width: "100%" }}
            />
          </div>
          <div className="py-5 w-full flex flex-col gap-10 justify-center">
            <div className="flex items-end gap-2 border-b-2 border-black pb-5">
              {/* <NumberBadge number="01" /> */}
              <h3 className="text-4xl font-bold pl-3">
                ショート動画の<span className="text-6xl">コンテスト</span>
              </h3>
            </div>
            <div>
              <p className="text-xl opacity-90 mb-10 leading-10">
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
                href="/pre-register/creator"
                className="cursor-pointer bg-[#FF0050] text-white px-5 py-3 rounded-md font-bold hover:bg-[#FE2C55] shadow-2xl text-center"
              >
                今すぐ始める
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white/10 flex flex-row-reverse h-[450px] backdrop-blur-sm gap-10">
          <div className="w-full flex items-center justify-center">
            <Image
              src="/images/ranking.png"
              alt="Contest Cards"
              width={0}
              height={0}
              sizes="100%"
              style={{ width: "100%" }}
            />
          </div>
          <div className="py-5 w-full flex flex-col gap-10 justify-center">
            <div className="flex items-end gap-2 border-b-2 border-black pb-5">
              {/* <NumberBadge number="01" /> */}
              <h3 className="text-4xl font-bold pl-3">
                <span className="text-6xl">再生数</span>でフェアに評価
              </h3>
            </div>
            <div>
              <p className="text-xl opacity-90 mb-10 leading-10">
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
                href="/pre-register/creator"
                className="cursor-pointer bg-[#FF0050] text-white px-5 py-3 rounded-md font-bold hover:bg-[#FE2C55] shadow-2xl text-center"
              >
                今すぐ始める
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white/10 flex h-[450px] backdrop-blur-sm gap-10">
          <div className="w-full flex items-center justify-center">
            <Image
              src="/images/contract.png"
              alt="Contract"
              width={0}
              height={0}
              sizes="100%"
              style={{ width: "100%" }}
            />
          </div>
          <div className="py-5 w-full flex flex-col gap-10 justify-center">
            <div className="flex items-center gap-2 border-b-2 border-black pb-5">
              {/* <NumberBadge number="02" /> */}
              <h3 className="text-4xl font-bold pl-3">
                入賞で<span className="text-6xl">次の仕事</span>に繋がる
              </h3>
            </div>
            <div>
              <p className="text-xl opacity-90 mb-10 leading-10">
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
                href="/pre-register/creator"
                className="cursor-pointer bg-[#FF0050] text-white px-5 py-3 rounded-md font-bold hover:bg-[#FE2C55] shadow-2xl text-center"
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
