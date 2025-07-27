'use client';

import { Creator } from '@/types/creator';
import { formatNumber } from '@/utils/format';  
import Image from 'next/image';

type Props = {
  creator: Creator | null;
  isOpen: boolean;
  onClose: () => void;
};

export function CreatorDetailModal({ creator, isOpen, onClose }: Props) {
  console.log('CreatorDetailModal render:', { isOpen, creator: creator?.name });
  
  if (!isOpen || !creator) {
    console.log('Modal not showing because:', { isOpen, hasCreator: !!creator });
    return null;
  }

  console.log('Modal should be visible now');

  return (
    <div className="fixed inset-0 z-[99999] overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* オーバーレイ */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-[99998]"
          onClick={onClose}
        />

        {/* モーダルコンテンツ */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full relative z-[99999]">
          {/* ヘッダー */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Image
                  className="h-12 w-12 rounded-full"
                  src={creator.profileImage}
                  alt={creator.username}
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {creator.name}
                  </h3>
                  <p className="text-sm text-gray-500">@{creator.username}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-400"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* コンテンツ */}
          <div className="bg-white px-6 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* TikTok動画埋め込み */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">投稿動画</h4>
                <div className="bg-gray-100 rounded-lg aspect-[9/16] flex items-center justify-center">
                  {/* TikTok埋め込み用のiframe */}
                  <iframe
                    src={`https://www.tiktok.com/embed/v2/${creator.adCode}`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  />
                </div>
              </div>

              {/* 統計情報 */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">パフォーマンス</h4>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">再生数</span>
                      </div>
                      <span className="text-lg font-bold text-gray-900">{formatNumber(creator.stats.views)}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">シェア数</span>
                      </div>
                      <span className="text-lg font-bold text-gray-900">{formatNumber(creator.stats.shares)}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">コメント数</span>
                      </div>
                      <span className="text-lg font-bold text-gray-900">{formatNumber(creator.stats.comments)}</span>
                    </div>
                  </div>

                  <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-primary-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        <span className="text-sm font-medium text-primary-700">獲得賞金</span>
                      </div>
                      <span className="text-lg font-bold text-primary-600">¥{formatNumber(creator.reward)}</span>
                    </div>
                  </div>
                </div>

                {/* Ad Code */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Ad Code</h4>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <code className="text-sm font-mono text-gray-800">{creator.adCode}</code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* フッター */}
          <div className="bg-gray-50 px-6 py-3">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-400"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 