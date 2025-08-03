export function ContestBrandInfo() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">ブランド情報</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ブランド基本情報 */}
        <div>
          <h3 className="text-base font-medium text-gray-700 mb-4">基本情報</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h10M7 15h10"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">ABC株式会社</p>
                <p className="text-sm text-gray-500">ブランド名</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                ブランド紹介
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                私たちは革新的な商品とサービスを通じて、お客様の生活をより豊かにすることを目指しています。
                品質と信頼性を重視し、持続可能な未来の実現に貢献します。
              </p>
            </div>
          </div>
        </div>

        {/* 連絡先・SNS情報 */}
        <div>
          <h3 className="text-base font-medium text-gray-700 mb-4">
            連絡先・SNS
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm text-gray-600">
                contact@abc-corp.com
              </span>
            </div>
            <div className="flex items-center gap-3">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="text-sm text-gray-600">03-1234-5678</span>
            </div>
            <div className="flex items-center gap-3">
              <svg
                className="w-4 h-4 text-blue-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
              <a
                href="https://twitter.com/abc_corp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                @abc_corp
              </a>
            </div>
            <div className="flex items-center gap-3">
              <svg
                className="w-4 h-4 text-pink-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.864 3.708 13.713 3.708 12.416s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.275c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.608c-.49 0-.928-.438-.928-.928 0-.49.438-.928.928-.928.49 0 .928.438.928.928 0 .49-.438.928-.928.928zm-3.862 9.608c-2.448 0-4.474-2.026-4.474-4.474s2.026-4.474 4.474-4.474 4.474 2.026 4.474 4.474-2.026 4.474-4.474 4.474z" />
              </svg>
              <a
                href="https://instagram.com/abc_corp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-pink-600 hover:text-pink-800"
              >
                @abc_corp
              </a>
            </div>
            <div className="flex items-center gap-3">
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9-9a9 9 0 00-9 9m9-9c0 5-4 9-9 9s-9-4-9-9 4-9 9-9 9 4 9 9z"
                />
              </svg>
              <a
                href="https://abc-corp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                abc-corp.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
