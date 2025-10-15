import Link from "next/link";
import Image from "next/image";
export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/90 border-t p-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between  items-end">
        {/* メインフッターコンテンツ */}
        <div className="py-6 float-left">
          <Link href="/" className="flex items-center space-x-2 mb-4">
            <Image
              src="/images/logo/logo-white.svg"
              alt="Kompe"
              width={300}
              height={300}
            />
          </Link>
          <p className="text-sm text-white">
            © {currentYear} Kompe. All rights reserved.
          </p>
        </div>

        {/* ボトムセクション */}
        <div className="flex gap-10 pb-5">
          <div className="flex flex-col gap-4">
            {/* <Link
                href="/contact"
                className="font-bold text-lg text-white hover:text-gray-500"
              >
              お問い合わせ
            </Link> */}
            <Link
              href="/terms"
              className="font-bold text-lg text-white hover:text-gray-500"
            >
              利用規約
            </Link>
            <Link
              href="/privacy"
              className="font-bold text-lg text-white hover:text-gray-500"
            >
              プライバシーポリシー
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <Link
              href="https://tiktok.com/@kompe"
              className="font-bold text-lg text-white hover:text-gray-500"
            >
              TikTok
            </Link>
            <Link
              href="https://instagram.com/3ureka_official"
              className="font-bold text-lg text-white hover:text-gray-500"
            >
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
