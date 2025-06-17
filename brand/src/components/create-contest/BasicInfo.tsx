import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileUpload } from '@/components/ui/FileUpload';
import { useState } from 'react';

const categories = [
  { id: 'video', label: '動画' },
  { id: 'photo', label: '写真' },
  { id: 'design', label: 'デザイン' },
  { id: 'music', label: '音楽' },
  { id: 'other', label: 'その他' },
];

type Props = {
  onNext: () => void;
};

export function BasicInfo({ onNext }: Props) {
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');

  return (
    <div>
      <div className="flex flex-col gap-8 bg-white rounded-lg p-8 shadow-sm">
        <div className="flex gap-4">
          <div className="w-full">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              コンテストタイトル
            </label>
            <Input
              id="title"
              placeholder="例：夏の思い出フォトコンテスト"
            />
          </div>

          <div className="w-full">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              カテゴリー
            </label>
            <div className="relative">
              <select
                id="category"
                defaultValue=""
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-0.5 focus:ring-gray-900 focus:border-gray-900 appearance-none cursor-pointer"
              >
                <option value="" disabled>カテゴリーを選択してください</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            カバー画像
          </label>
          
          <FileUpload
            file={coverImage}
            preview={coverImagePreview}
            onFileChange={setCoverImage}
            onPreviewChange={setCoverImagePreview}
            accept="image/*"
            maxSize={5 * 1024 * 1024}
            placeholder="カバー画像をアップロード"
            className="w-full"
          />
        </div>

        {/* 開催期間設定 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            開催期間
          </label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 開始日時 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                開始日時
              </label>
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="flex-1"
                />
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-32"
                />
              </div>
            </div>

            {/* 終了日時 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                終了日時
              </label>
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="flex-1"
                />
                <Input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-32"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-6">
        <Button
          type="button"
          variant="secondary"
        >
          下書き保存
        </Button>
        <Button
          type="button"
          variant="primary"
          onClick={onNext}
        >
          次へ進む
        </Button>
      </div>
    </div>
  );
} 