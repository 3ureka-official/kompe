import Link from 'next/link';

export function FooterSection() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* ブランド */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-400 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L22 20H2L12 2Z" />
                </svg>
              </div>
              <span className="text-xl font-bold">ブランドコンテスト</span>
            </div>
            <p className="text-gray-400 text-sm">
              クリエイターとブランドをつなぐ、次世代のコンテストプラットフォーム
            </p>
          </div>

          {/* プロダクト */}
          <div>
            <h3 className="font-semibold mb-4">プロダクト</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/features" className="hover:text-white">機能</Link></li>
              <li><Link href="/pricing" className="hover:text-white">料金</Link></li>
              <li><Link href="/creators" className="hover:text-white">クリエイター</Link></li>
              <li><Link href="/brands" className="hover:text-white">ブランド</Link></li>
            </ul>
          </div>

          {/* サポート */}
          <div>
            <h3 className="font-semibold mb-4">サポート</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/help" className="hover:text-white">ヘルプセンター</Link></li>
              <li><Link href="/contact" className="hover:text-white">お問い合わせ</Link></li>
              <li><Link href="/faq" className="hover:text-white">よくある質問</Link></li>
              <li><Link href="/status" className="hover:text-white">システム状況</Link></li>
            </ul>
          </div>

          {/* 会社情報 */}
          <div>
            <h3 className="font-semibold mb-4">会社情報</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white">会社概要</Link></li>
              <li><Link href="/careers" className="hover:text-white">採用情報</Link></li>
              <li><Link href="/press" className="hover:text-white">プレス</Link></li>
              <li><Link href="/blog" className="hover:text-white">ブログ</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © 2024 ブランドコンテスト. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm text-gray-400 hover:text-white">
              プライバシーポリシー
            </Link>
            <Link href="/terms" className="text-sm text-gray-400 hover:text-white">
              利用規約
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 