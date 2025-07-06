import React from 'react';

export default function PreRegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FE2C55] to-[#25F4EE] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            KOMPE 事前登録
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            KOMPEの事前登録をして、最新情報をいち早く受け取りましょう！
          </p>
        </div>
        
        <div className="px-8 pb-8">
          <div className="bg-gray-50 rounded-xl p-4">
            {/* Googleフォームを埋め込むためのiframe */}
            <iframe
              src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true"
              width="100%"
              height="600"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              className="rounded-lg"
            >
              読み込んでいます…
            </iframe>
          </div>
        </div>
        
        <div className="bg-gray-100 px-8 py-6 text-center">
          <p className="text-sm text-gray-500">
            ご登録いただいた情報は、KOMPE関連の情報提供のみに使用いたします。
          </p>
        </div>
      </div>
    </div>
  );
} 