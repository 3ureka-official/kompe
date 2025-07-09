"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Header() {
  const pathname = usePathname();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();
  const isDashboard = pathname.startsWith('/dashboard');

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('ログアウトエラー:', error);
    }
  };

  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    const segments = pathname.split('/').filter(Boolean);
    
    // ダッシュボードページの場合
    if (segments[0] === 'dashboard') {
      const items: BreadcrumbItem[] = [
        { label: 'ダッシュボード' }
      ];

      if (segments.length > 1) {
        switch (segments[1]) {
          case 'contests':
            items.push({ label: 'コンテスト', href: '/dashboard/contests' });
            if (segments[2]) {
              if (segments[3]) {
                // コンテスト詳細の子ページ
                items.push({ label: 'コンテスト詳細', href: `/dashboard/contests/${segments[2]}` });
                switch (segments[3]) {
                  case 'contents':
                    items.push({ label: 'コンテンツ' });
                    break;
                  case 'participants':
                    items.push({ label: '参加者' });
                    break;
                  case 'results':
                    items.push({ label: '結果' });
                    break;
                  default:
                    items.push({ label: segments[3] });
                }
              } else {
                // コンテスト詳細ページ
                items.push({ label: 'コンテスト詳細' });
              }
            }
            break;
          case 'brand':
            items.push({ label: 'ブランド情報' });
            break;
          case 'settings':
            items.push({ label: '設定' });
            break;
          case 'notifications':
            items.push({ label: '通知' });
            break;
          case 'create':
            items.push({ label: 'コンテスト作成', href: '/dashboard/create' });
            if (segments[2]) {
              switch (segments[2]) {
                case 'basic':
                  items.push({ label: '基本情報' });
                  break;
                case 'brief':
                  items.push({ label: 'ブリーフ' });
                  break;
                case 'resources':
                  items.push({ label: 'リソース' });
                  break;
                case 'prize':
                  items.push({ label: '賞金設定' });
                  break;
                default:
                  items.push({ label: segments[2] });
              }
            }
            break;
          default:
            // その他のダッシュボードページ
            items.push({ label: segments[1] });
        }
      }

      return items;
    }

    // その他のページの場合
    return [{ label: 'ホーム', href: '/' }];
  };

  const breadcrumbItems = getBreadcrumbItems();

  if (isDashboard) {
    // ダッシュボード用のヘッダー
    return (
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-8 py-2">
          <div className="flex justify-between items-center">
            {/* Breadcrumb */}
            {breadcrumbItems.length > 1 && (
              <nav className="flex items-center space-x-2 text-sm text-gray-600">
                {breadcrumbItems.map((item, index) => (
                  <div key={index} className="flex items-center">
                    {index > 0 && (
                      <svg className="w-4 h-4 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                    {item.href && index < breadcrumbItems.length - 1 ? (
                      <Link 
                        href={item.href}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className={index === breadcrumbItems.length - 1 ? 'text-gray-900 font-medium' : 'text-gray-600'}>
                        {item.label}
                      </span>
                    )}
                  </div>
                ))}
              </nav>
            )}

            {/* 右側のメニュー */}
            <div className="flex items-center space-x-4">
              {/* 通知ボタン */}
              <Link href="/dashboard/notifications" className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" color="gray">
                  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
                </svg>
                {/* 通知バッジ（未読通知がある場合） */}
                <span className="absolute -top-0 -right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  2
                </span>
              </Link>

              {/* ユーザーメニュー */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-700">
                      {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <span className="text-sm font-medium">{user?.displayName || user?.email}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* ドロップダウンメニュー */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-20">
                    <div className="py-1">
                      <Link
                        href="/dashboard/settings"
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
          </div>
        </div>
      </header>
    )
  }
} 