"use client";

import { useState } from "react";
import CreatorsPage from "@/components/creators/CreatorPage";
import BrandsPage from "@/components/brands/BrandPage";

export default function Home() {
  const [tab, setTab] = useState<"creator" | "brand">("creator");

  return (
    <div className="flex flex-col justify-center">
      <div className="sticky align-center z-100 top-20 mx-auto flex h-14 w-fit bg-black opacity-90 justify-center items-center rounded-full gap-4 shadow-md">
        <button
          className={`text-white p-4 ${tab === "creator" && "font-bold"}`}
          onClick={() => setTab("creator")}
        >
          クリエイター向け
        </button>
        <button
          className={`text-white p-4 ${tab === "brand" && "font-bold"}`}
          onClick={() => setTab("brand")}
        >
          ブランド向け
        </button>
      </div>
      {tab === "creator" && <CreatorsPage />}
      {tab === "brand" && <BrandsPage />}
    </div>
  );
}
