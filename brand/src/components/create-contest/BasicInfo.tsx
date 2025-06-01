import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCoverImage(file);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div>
      <div className="flex flex-col gap-8 bg-white rounded-lg p-8 shadow-sm">
        <div className="flex gap-4">
          <div className="w-full">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              コンテストタイトル
            </label>
            {/* <input
              type="text"
              id="title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0.5 focus:ring-gray-900 focus:border-gray-900"
              placeholder="例：夏の思い出フォトコンテスト"
            /> */}
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
          
          {coverImage ? (
            <div className="flex gap-4">
              <img
                src={URL.createObjectURL(coverImage)}
                alt="カバー画像"
                className="w-48 h-27 object-cover rounded-lg border border-gray-200"
              />
              <div className="mt-2 w-full text-sm text-gray-500 flex flex-col justify-around">
                <p className="text-base text-black font-bold">{coverImage.name}</p>
                <p className="text-sm text-gray-700">{formatFileSize(coverImage.size)}</p>
              </div>
              <button
                type="button"
                onClick={() => setCoverImage(null)}
                className="p-1 cursor-pointer"
              >
                <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10">
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <div className="mt-4 flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-medium text-primary-400 hover:text-primary-500"
                  >
                    <span>画像をアップロード</span>
                    <input 
                      id="file-upload" 
                      name="file-upload" 
                      type="file" 
                      className="sr-only" 
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                  <p className="pl-1">またはドラッグ＆ドロップ</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
              </div>
            </div>
          )}
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