import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ブランド情報 */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Kompe Creator</h3>
            <p className="text-gray-300 mb-4">
              TikTokクリエイター向けのコンテストプラットフォーム。
              あなたの才能を発揮し、素晴らしい賞品を獲得しよう。
            </p>
          </div>

          {/* サービス */}
          <div>
            <h4 className="font-semibold mb-4">サービス</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contests" className="text-gray-300 hover:text-white transition-colors">
                  コンテスト
                </Link>
              </li>
              <li>
                <Link href="/applications" className="text-gray-300 hover:text-white transition-colors">
                  応募履歴
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="text-gray-300 hover:text-white transition-colors">
                  お気に入り
                </Link>
              </li>
            </ul>
          </div>

          {/* サポート */}
          <div>
            <h4 className="font-semibold mb-4">サポート</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-300 hover:text-white transition-colors">
                  ヘルプ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  お問い合わせ
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  プライバシーポリシー
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Kompe Creator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 