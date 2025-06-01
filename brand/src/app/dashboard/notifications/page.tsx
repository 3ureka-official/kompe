'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Notification, mockNotifications } from '@/types/notification';
import { formatRelativeTime } from '@/utils/format';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const router = useRouter();

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const handleNotificationClick = (notification: Notification) => {
    // 未読の場合は既読にする
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
    
    // 詳細ページに遷移
    if (notification.actionUrl) {
      router.push(notification.actionUrl);
    }
  };

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.isRead)
    : notifications;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div>
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">通知</h1>
            <p className="text-gray-600 mt-1">
              {unreadCount > 0 ? `${unreadCount}件の未読通知があります` : 'すべての通知を確認済みです'}
            </p>
          </div>
          
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
            >
              すべて既読にする
            </button>
          )}
        </div>

        {/* フィルター */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === 'all'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            すべて ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === 'unread'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            未読 ({unreadCount})
          </button>
        </div>

        {/* 通知リスト */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 4l8 5 8-5" />
              </svg>
              <p className="text-gray-500">
                {filter === 'unread' ? '未読の通知はありません' : '通知はありません'}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={`
                  bg-white rounded-lg border p-4 transition-all cursor-pointer hover:shadow-md
                  ${!notification.isRead ? 'border-blue-200 bg-blue-50' : 'border-gray-200'}
                `}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-sm font-medium ${
                      !notification.isRead ? 'text-gray-900' : 'text-gray-700'
                    }`}>
                      {notification.title}
                      {!notification.isRead && (
                        <span className="ml-2 w-2 h-2 bg-blue-600 rounded-full inline-block"></span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <span className="text-xs text-gray-500">
                      {formatRelativeTime(notification.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 