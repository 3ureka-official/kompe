"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { logout } from "@/services/userService";
import { Logo } from '@/components/ui/Logo';
import { usePathname } from "next/navigation";

export function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, profile } = useContext(AuthContext);
  const pathname = usePathname();
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('ログアウトエラー:', error);
    }
  };

  const getLinkClass = (path: string) => {
    const isActive = pathname.startsWith(path);
    return `px-3 py-2 rounded-md text-sm transition-colors ${
      isActive 
        ? 'text-gray-900 font-semibold bg-gray-100' 
        : 'text-gray-700 hover:text-gray-900 font-medium hover:bg-gray-50' 
    }`;
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 左側：ロゴ */}
          <div className="flex items-center">
            <Link href="/contests">
              <Logo size="md" />
            </Link>
          </div>

          {/* 右側：ナビゲーション */}
          {user && (
          <div className="flex items-center space-x-6">
            {/* コンテストリンク */}
            <Link 
              href="/contests"
              className={getLinkClass('/contests')}
            >
              コンテスト
            </Link>

            {/* ブランドリンク */}
            <Link 
              href="/brand"
              className={getLinkClass('/brand')}
            >
              ブランド
            </Link>

            {/* プロフィールメニュー */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                {/* プロフィール画像またはアバター */}
                <div className="w-8 h-8 border border-black rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-black">
                    {profile?.email?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
              </button>

              {/* ドロップダウンメニュー */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-20">
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-gray-500 border-b">
                      {profile?.email}
                    </div>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      設定
                    </Link>
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
        </div>
      </div>

      {/* メニュー外クリックでドロップダウンを閉じる */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  )
} 