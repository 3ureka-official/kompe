import Link from 'next/link'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  // const footerLinks = {
  //   service: {
  //     title: 'サービス',
  //     links: [
  //       { name: 'コンテスト一覧', href: '/contests' },
  //       { name: 'ランキング', href: '/ranking' },
  //       { name: '使い方', href: '/how-to-use' },
  //       { name: 'よくある質問', href: '/faq' },
  //     ]
  //   },
  //   support: {
  //     title: 'サポート',
  //     links: [
  //       { name: 'ヘルプセンター', href: '/help' },
  //       { name: 'お問い合わせ', href: '/contact' },
  //       { name: 'コミュニティ', href: '/community' },
  //       { name: 'フィードバック', href: '/feedback' },
  //     ]
  //   },
  //   legal: {
  //     title: '法的情報',
  //     links: [
  //       { name: '利用規約', href: '/terms' },
  //       { name: 'プライバシーポリシー', href: '/privacy' },
  //       { name: '特定商取引法', href: '/commercial-law' },
  //       { name: 'ガイドライン', href: '/guidelines' },
  //     ]
  //   },
  //   company: {
  //     title: '会社情報',
  //     links: [
  //       { name: '運営会社', href: '/about' },
  //       { name: 'ニュース', href: '/news' },
  //       { name: '採用情報', href: '/careers' },
  //       { name: 'パートナー', href: '/partners' },
  //     ]
  //   }
  // }

  const socialLinks = [
    {
      name: 'TikTok',
      href: 'https://tiktok.com/@kompe',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.43z"/>
        </svg>
      )
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/3ureka_official',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 16 16">
          <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
        </svg>

      )
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/3ureka_official',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    }
  ]

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* メインフッターコンテンツ */}
        <div className="py-12">
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8"> */}
            {/* ブランド情報 */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="brand-gradient h-8 w-8 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">K</span>
                </div>
                <span className="brand-gradient-text text-xl font-bold">
                  Kompe
                </span>
              </Link>
              <p className="text-sm text-muted-foreground mb-4 max-w-xs">
                TikTokコンテストプラットフォーム。クリエイターとブランドをつなぎ、素晴らしいコンテンツを生み出します。
              </p>
              
              {/* ソーシャルリンク */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-primary/10 rounded-lg"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </Link>
                ))}
              {/* </div> */}
            </div>

            {/* リンクセクション */}
            {/* {Object.entries(footerLinks).map(([key, section]) => (
              <div key={key}>
                <h3 className="text-sm font-semibold text-foreground mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))} */}
          </div>
        </div>

        {/* ボトムセクション */}
        <div className="border-t py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-sm text-muted-foreground">
                © {currentYear} Kompe. All rights reserved.
              </p>
              <div className="flex items-center space-x-4">
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  利用規約
                </Link>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  プライバシーポリシー
                </Link>
              </div>
            </div>
            
            {/* 言語・地域選択（将来の拡張用） */}
            {/* <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3s-4.5 4.03-4.5 9 2.015 9 4.5 9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20" />
              </svg>
              <span>日本語</span>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  )
}