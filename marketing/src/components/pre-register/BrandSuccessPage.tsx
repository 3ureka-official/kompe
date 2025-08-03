"use client";

import Link from "next/link";

export default function BrandSuccessPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div className="mb-6">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: "#25f4ee40" }}
          >
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="#25f4ee"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            事前登録完了
          </h2>
          <p className="text-gray-600">
            今後のご案内は3urek.official@gmail.comのアドレスからメールで送信します
          </p>
        </div>

        <Link
          href="/"
          className="inline-block bg-[#FE2C55] hover:bg-[#E8174A] text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
        >
          OK
        </Link>
      </div>
    </div>
  );
}
