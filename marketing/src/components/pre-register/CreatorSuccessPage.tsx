export function CreatorSuccessPage() {
  const handleOK = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FE2C55] via-[#FF0050] to-[#25F4EE] flex items-center justify-center p-4">
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
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            事前登録完了！
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            ご登録ありがとうございます。
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <p className="text-gray-700 leading-relaxed">
            今後のご案内は
            <br />
            <span className="font-bold text-[#FE2C55]">
              3urek.official@gmail.com
            </span>
            <br />
            のアドレスからメールで送信します。
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleOK}
            className="w-full bg-[#FE2C55] text-white px-6 py-4 rounded-full font-bold text-lg hover:bg-[#e02549] transition-colors"
          >
            OK
          </button>
          <div className="text-sm text-gray-500">
            <p>迷惑メールフォルダもご確認ください</p>
          </div>
        </div>
      </div>
    </div>
  );
}
