'use client';

import { useState } from 'react';

type Props = {
  onLogout: () => void;
};

export function LogoutSection({ onLogout }: Props) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    setShowConfirm(false);
    onLogout();
  };

  return (
    <div className="bg-white rounded-lg shadow p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">アカウント</h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">ログアウト</h3>
          <p className="text-sm text-gray-500 mb-4">
            現在のセッションを終了し、ログイン画面に戻ります。
          </p>
          <button
            onClick={() => setShowConfirm(true)}
            className="inline-flex items-center px-4 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            ログアウト
          </button>
        </div>
      </div>

      {/* 確認モーダル */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center mb-4">
              <svg className="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900">ログアウトの確認</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              本当にログアウトしますか？未保存の変更は失われる可能性があります。
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
              >
                ログアウト
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 