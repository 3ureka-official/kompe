'use client';

import { useEffect, useState } from 'react';

const companies = [
  { name: "Company 1", logo: "/api/placeholder/120/60" },
  { name: "Company 2", logo: "/api/placeholder/120/60" },
  { name: "Company 3", logo: "/api/placeholder/120/60" },
  { name: "Company 4", logo: "/api/placeholder/120/60" },
  { name: "Company 5", logo: "/api/placeholder/120/60" },
  { name: "Company 6", logo: "/api/placeholder/120/60" },
  { name: "Company 7", logo: "/api/placeholder/120/60" },
  { name: "Company 8", logo: "/api/placeholder/120/60" },
  { name: "Company 9", logo: "/api/placeholder/120/60" },
  { name: "Company 10", logo: "/api/placeholder/120/60" },
];

export function TrustedCompaniesSection() {
  return (
    <section className="py-16 px-4 max-w-5xl mx-auto bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <h3 className="text-xl font-medium mb-12 text-gray-900">100社以上の企業に信頼されています</h3>
        
        {/* 自動スクロールコンテナ */}
        <div className="relative max-w-5xl mx-auto">
          {/* グラデーションマスク */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
          
          {/* スクロールコンテンツ */}
          <div className="flex animate-scroll">
            {/* 最初のセット */}
            <div className="flex space-x-8 min-w-max">
              {companies.map((company, index) => (
                <div key={`first-${index}`} className="flex-shrink-0 w-32 h-16 bg-gray-100 rounded-lg flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                  <span className="text-sm text-gray-500 font-medium">{company.name}</span>
                </div>
              ))}
            </div>
            
            {/* 重複セット（シームレスなループのため） */}
            <div className="flex space-x-8 min-w-max ml-8">
              {companies.map((company, index) => (
                <div key={`second-${index}`} className="flex-shrink-0 w-32 h-16 bg-gray-100 rounded-lg flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                  <span className="text-sm text-gray-500 font-medium">{company.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
} 