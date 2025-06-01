'use client';

import { useState } from 'react';
import { formatFileSize } from '@/utils/format';

type Props = {
  file: File | null;
  preview: string | null;
  onFileChange: (file: File | null) => void;
  onPreviewChange: (preview: string | null) => void;
  accept?: string;
  maxSize?: number; // bytes
  placeholder?: string;
  className?: string;
};

export function FileUpload({ 
  file, 
  preview, 
  onFileChange, 
  onPreviewChange,
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024, // 5MB
  placeholder = 'ファイルを選択',
  className = ''
}: Props) {
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (selectedFile: File | null) => {
    if (!selectedFile) {
      onFileChange(null);
      onPreviewChange(null);
      return;
    }

    // ファイルサイズチェック
    if (selectedFile.size > maxSize) {
      alert(`ファイルサイズは${formatFileSize(maxSize)}以下にしてください`);
      return;
    }

    // ファイル形式チェック
    if (accept === 'image/*' && !selectedFile.type.startsWith('image/')) {
      alert('画像ファイルを選択してください');
      return;
    }

    onFileChange(selectedFile);
    
    // プレビュー生成
    if (selectedFile.type.startsWith('image/')) {
      const url = URL.createObjectURL(selectedFile);
      onPreviewChange(url);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileChange(droppedFile);
    }
  };

  const handleRemove = () => {
    onFileChange(null);
    onPreviewChange(null);
    // 入力フィールドをリセット
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className={className}>
      {/* ファイル選択エリア */}
      <div
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${dragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
        `}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        {preview ? (
          <div className="space-y-4">
            <div className="w-32 h-32 mx-auto rounded-lg overflow-hidden">
              <img 
                src={preview} 
                alt="プレビュー" 
                className="w-full h-full object-cover"
              />
            </div>
            {file && (
              <div className="text-sm text-gray-600">
                <p>{file.name}</p>
                <p>{formatFileSize(file.size)}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <p className="text-gray-600">{placeholder}</p>
            <p className="text-sm text-gray-500">
              ドラッグ&ドロップまたはクリックしてファイルを選択
            </p>
          </div>
        )}
      </div>

      {/* 隠しファイル入力 */}
      <input
        type="file"
        id="file-upload"
        accept={accept}
        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
        className="hidden"
      />

      {/* 削除ボタン */}
      {preview && (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={handleRemove}
            className="inline-flex items-center px-3 py-1 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            削除
          </button>
        </div>
      )}

      {/* ファイル制限情報 */}
      <p className="mt-2 text-sm text-gray-500 text-center">
        {accept === 'image/*' ? 'JPG、PNG形式' : accept}（最大{formatFileSize(maxSize)}）
      </p>
    </div>
  );
} 