'use client';

import { useState } from 'react';
import { NotificationSettings } from '@/types/User';

type Props = {
  settings: NotificationSettings;
  onSave: (updatedSettings: NotificationSettings) => void;
};

export function NotificationSettingsComponent({ settings, onSave }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setIsEditing(false);
  };

  const handleToggle = (key: keyof NotificationSettings) => {
    setFormData(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleCancel = () => {
    setFormData(settings);
    setIsEditing(false);
  };

  const notificationItems = [
    {
      key: 'emailNotifications' as keyof NotificationSettings,
      label: 'メール通知を受け取る',
      description: '重要な更新情報をメールで受け取ります'
    },
    {
      key: 'contestUpdates' as keyof NotificationSettings,
      label: 'コンテスト更新通知',
      description: '新しいコンテストの開始や結果発表の通知を受け取ります'
    },
    {
      key: 'applicationNotifications' as keyof NotificationSettings,
      label: '応募通知',
      description: 'あなたのコンテストに新しい応募があった時に通知を受け取ります'
    },
    {
      key: 'marketingEmails' as keyof NotificationSettings,
      label: 'マーケティングメール',
      description: '新機能やキャンペーン情報などのお知らせを受け取ります'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">通知設定</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            編集
          </button>
        )}
      </div>
      
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {notificationItems.map((item) => (
              <div key={item.key} className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id={item.key}
                    type="checkbox"
                    checked={formData[item.key]}
                    onChange={() => handleToggle(item.key)}
                    className="focus:ring-primary-400 h-4 w-4 text-primary-400 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor={item.key} className="font-medium text-gray-700">
                    {item.label}
                  </label>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </div>
              </div>
            ))}

            {/* ボタン */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-primary-400 text-white rounded-md text-sm font-medium hover:bg-primary-500"
              >
                保存
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          {notificationItems.map((item) => (
            <div key={item.key} className="flex items-start">
              <div className="flex items-center h-5">
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                  settings[item.key] 
                    ? 'bg-primary-400 border-primary-400' 
                    : 'bg-white border-gray-300'
                }`}>
                  {settings[item.key] && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <div className="ml-3">
                <div className="font-medium text-gray-700">
                  {item.label}
                </div>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 