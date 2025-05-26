'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function ContestCreatePage() {
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    description: '',
    startAt: '',
    endAt: '',
    prizePool: '',
    rewards: [
      { rank: 1, amount: '' },
      { rank: 2, amount: '' },
      { rank: 3, amount: '' },
    ],
    criteria: 'views',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: フォームデータの送信処理
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRewardChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      rewards: prev.rewards.map((reward, i) => 
        i === index ? { ...reward, amount: value } : reward
      )
    }));
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">新規コンテスト作成</h1>
        <p className="mt-2 text-gray-600">新しいコンテストの詳細を入力してください</p>
      </div>

      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                コンテストタイトル
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                イメージ画像URL
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                コンテスト説明
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="startAt" className="block text-sm font-medium text-gray-700">
                  開始日
                </label>
                <input
                  type="date"
                  id="startAt"
                  name="startAt"
                  value={formData.startAt}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="endAt" className="block text-sm font-medium text-gray-700">
                  終了日
                </label>
                <input
                  type="date"
                  id="endAt"
                  name="endAt"
                  value={formData.endAt}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="prizePool" className="block text-sm font-medium text-gray-700">
                賞金総額
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">¥</span>
                </div>
                <input
                  type="number"
                  id="prizePool"
                  name="prizePool"
                  value={formData.prizePool}
                  onChange={handleChange}
                  className="block w-full pl-7 pr-12 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="0"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                順位ごとの賞金
              </label>
              <div className="space-y-2">
                {formData.rewards.map((reward, index) => (
                  <div key={reward.rank} className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 w-12">{reward.rank}位</span>
                    <div className="relative rounded-md flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">¥</span>
                      </div>
                      <input
                        type="number"
                        value={reward.amount}
                        onChange={(e) => handleRewardChange(index, e.target.value)}
                        className="block w-full pl-7 pr-12 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="0"
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="criteria" className="block text-sm font-medium text-gray-700">
                審査基準
              </label>
              <select
                id="criteria"
                name="criteria"
                value={formData.criteria}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="views">再生数</option>
                <option value="likes">いいね数</option>
                <option value="brand">ブランド審査</option>
              </select>
            </div>
          </div>

          <div className="pt-6">
            <Button variant="primary" type="submit" className="w-full">
              コンテストを作成
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 