import React from 'react';

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-[#1D1D1D]/95 backdrop-blur-sm z-50 border-b border-white/10">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-white">ブランドコンテスト</span>
        </div>
      </div>
    </header>
  );
};