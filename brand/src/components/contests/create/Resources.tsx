import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { CreateContestFormData } from '@/types/contest';

type Props = {
  data: CreateContestFormData;
  onUpdate: (stepData: Partial<CreateContestFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
};

export function Resources({ onNext, onPrev }: Props) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  return (
    <div>
      <div className="bg-white rounded-lg p-8 shadow-sm">
        {/* Assets セクション */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-6">アセット</h3>
          
          {/* ファイルアップロードエリア */}
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  > 
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="mt-4 flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-medium text-primary-500 hover:text-primary-700"
                  >
                    <span>ファイルをアップロード</span>
                    <input 
                      id="file-upload" 
                      name="file-upload" 
                      type="file" 
                      className="sr-only" 
                      accept="image/*"
                      onChange={handleFileUpload}
                    />
                  </label>
                  <p className="pl-1">またはドラッグ＆ドロップ</p>
                </div>
              <p className="text-sm text-gray-500">最大ファイルサイズ: 20MB</p>
            </div>
          </div>

          {/* アップロードされたファイル一覧 */}
          {uploadedFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm text-gray-700">{file.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Or セクション */}
          <div className="flex items-center my-6 w-full justify-center">
            <span className="px-4 text-gray-500 text-base">or</span>
          </div>

          {/* 外部リンク入力 */}
          <div className="mb-4">
            <Input
              id="externalLink"
              placeholder="外部フォルダリンクを貼り付け"
            />
          </div>

          {/* 説明テキストエリア */}
          <div className="mb-2">
            <Textarea
              id="description"
              placeholder="説明をここに追加"
              rows={3}
            />
          </div>

          {/* 追加ボタン */}
          <div className="flex justify-end">
            <Button
              type="button"
              variant="secondary"
            >
              追加
            </Button>
          </div>
        </div>

        {/* Inspiration セクション */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-6">インスピレーション</h3>
          
          {/* インスピレーションコンテンツ入力 */}
          <div className="mb-4">
            <Input
              id="inspirationContent"
              placeholder="インスピレーションコンテンツを貼り付け"
            />
          </div>

          {/* インスピレーション説明テキストエリア */}
          <div className="mb-2">
            <Textarea
              id="inspirationDescription"
              placeholder="説明をここに追加"
              rows={3}
            />
          </div>

          {/* 追加ボタン */}
          <div className="flex justify-end">
            <Button
              type="button"
              variant="secondary"
            >
              追加
            </Button>
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
          variant="secondary"
          onClick={onPrev}
        >
          前へ戻る
        </Button>
        <Button
          type="button"
          onClick={onNext}
          className="px-6 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
          variant="primary"
        >
          次へ進む
        </Button>
      </div>
    </div>
  );
} 