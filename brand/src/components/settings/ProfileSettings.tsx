'use client';

import { useState } from 'react';
import { User } from '@/types/User';
import Image from 'next/image';

type Props = {
  user: User;
  onSave: (updatedUser: User) => void;
};

export function ProfileSettings({ user, onSave }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user); 
  const [previewUrl, setPreviewUrl] = useState<string | null>(user.profile_image || null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(user);
    setPreviewUrl(user.profile_image || null);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">プロフィール設定</h2>
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
            {/* プロフィール画像 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">プロフィール画像</label>
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  {previewUrl ? (
                    <Image src={previewUrl} alt="プロフィール" className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="profile-image"
                  />
                  <label
                    htmlFor="profile-image"
                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    画像を選択
                  </label>
                  <p className="text-sm text-gray-500 mt-1">JPG、PNG形式（最大5MB）</p>
                </div>
              </div>
            </div>

            {/* 名前 */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                名前 <span className="text-red-500">*</span>
              </label>
              {/* <input
                type="text"
                id="name"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                required
              /> */}
            </div>

            {/* メールアドレス */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                メールアドレス <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                required
              />
            </div>

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
          {/* プロフィール画像 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">プロフィール画像</label>
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              {user.profile_image ? (
                <Image src={user.profile_image} alt="プロフィール" className="w-full h-full object-cover" />
              ) : (
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}
            </div>
          </div>

          {/* 名前 */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">名前</label>
            <p className="text-gray-900">{user.first_name} {user.last_name}</p>
          </div> */}

          {/* メールアドレス */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
            <p className="text-gray-900">{user.email}</p>
          </div>
        </div>
      )}
    </div>
  );
} 