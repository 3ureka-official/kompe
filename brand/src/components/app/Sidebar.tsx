"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { logout } from "@/services/userService";
import { Logo } from "@/components/ui/Logo";
import { usePathname, useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { FaTrophy, FaStore } from "react-icons/fa";
import Image from "next/image";

export function Sidebar() {
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, profile } = useContext(AuthContext);
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await logout().then(() => {
        router.replace("/auth/login");
      });
    } catch (error) {
      console.error("ログアウトエラー:", error);
    }
  };

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    return `flex items-center space-x-3 px-4 py-3 rounded-md text-sm transition-colors ${
      isActive
        ? "text-gray-900 font-semibold bg-gray-100"
        : "text-gray-700 hover:text-gray-900 font-medium hover:bg-gray-50"
    }`;
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col z-10">
      {/* ロゴ */}
      <div className="flex items-center justify-center h-16 border-b border-gray-200 px-4">
        <Link href="/contests">
          <Logo size="md" />
        </Link>
      </div>

      {/* ナビゲーション */}
      {user && (
        <nav className="flex-1 px-4 py-6 space-y-2">
          {/* コンテストリンク */}
          <Link href="/contests" className={getLinkClass("/contests")}>
            <FaTrophy className="w-6 h-6" />
            <span className="text-lg">コンテスト</span>
          </Link>

          {/* ブランドリンク */}
          <Link href="/brand" className={getLinkClass("/brand")}>
            <FaStore className="w-6 h-6" />
            <span className="text-lg">ブランド</span>
          </Link>
        </nav>
      )}

      {/* プロフィールセクション */}
      {user && (
        <div className="border-t border-gray-200 p-4">
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 w-full px-4 py-3 rounded-md text-sm transition-colors hover:bg-gray-50"
            >
              {/* プロフィール画像またはアバター */}
              <div className="flex items-center justify-center w-9 h-9 border-1 border-gray-500 rounded-full overflow-hidden bg-gray-500">
                {profile?.profile_image ? (
                  <Image
                    src={profile.profile_image}
                    alt="プロフィール"
                    className="w-full h-full object-cover"
                    width={36}
                    height={36}
                  />
                ) : (
                  <FaUserCircle className="w-9 h-9 text-gray-100" />
                )}
              </div>
              <span className="text-gray-700 text-lg">アカウント</span>
            </button>

            {/* ドロップダウンメニュー */}
            {showUserMenu && (
              <div className="absolute bottom-full left-0 mb-2 w-full bg-white rounded-md shadow-lg border border-gray-200 z-20">
                <div className="py-1">
                  <div className="px-4 py-2 text-sm text-gray-500 border-b">
                    {profile?.email}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    ログアウト
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* メニュー外クリックでドロップダウンを閉じる */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </aside>
  );
}
