"use client";

import Link from "next/link";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background">
      <div className="lg:container mx-auto px-8 sm:px-8 md:px-16">
        <div className="flex h-16 items-center justify-between">
          {/* ロゴ */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/logo/logo-coloredhdpi.png"
                alt="Kompe"
                width={128}
                height={128}
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
