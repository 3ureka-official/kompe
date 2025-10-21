"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function RegisterLineSection() {
  useEffect(() => {
    // LINEのスクリプトを動的に読み込み
    const script = document.createElement("script");
    script.src =
      "https://www.line-website.com/social-plugins/js/thirdparty/loader.min.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // クリーンアップ時にスクリプトを削除
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* <div className="flex flex-col items-center justify-center"> */}
      <h2 className="text-sm font-bold text-muted-foreground px-2 py-2">
        公式LINEを登録して最新のコンテスト情報をうけとりましょう
      </h2>
      <div
        className="line-it-button"
        data-lang="ja"
        data-type="friend"
        //  data-size="large"
        data-env="PROD"
        data-lineid="@835angbx"
        style={{ display: "none" }}
      ></div>
      {/* <a href="https://lin.ee/1UN92jO"><Image src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png" alt="友だち追加" height="25" width="110" style={{ border: 0, height: "35px" }} /></a> */}
    </div>
  );
}
