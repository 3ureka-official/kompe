"use client";

import { useState } from "react";
import { formatFileSize } from "@/utils/format";

type Props = {
  onFileChange: (file: File | null) => void;
  onPreviewChange: (preview: string | null) => void;
  accept?: string;
  maxSize?: number; // bytes
  className?: string;
};

export function AssetFileUpload({
  onFileChange,
  onPreviewChange,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024, // 5MB
  className = "",
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
    if (accept === "image/*" && !selectedFile.type.startsWith("image/")) {
      alert("画像ファイルを選択してください");
      return;
    }

    onFileChange(selectedFile);

    // プレビュー生成
    if (selectedFile.type.startsWith("image/")) {
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

  return (
    <div className={className}>
      {/* ファイル選択エリア */}
      <div
        className={`
          flex flex-col items-center border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${dragOver ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400"}
        `}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onClick={() => document.getElementById("file-upload")?.click()}
      >
        <div className="space-y-2">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
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
          <p className="text-sm text-gray-500">
            ドラッグ&ドロップまたはクリックしてファイルを選択
          </p>
        </div>
      </div>

      {/* 隠しファイル入力 */}
      <input
        type="file"
        id="file-upload"
        accept={accept}
        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
        className="hidden"
      />

      {/* ファイル制限情報 */}
      <p className="mt-2 text-sm text-gray-500 text-center">
        {accept === "image/*" ? "JPG、PNG形式" : accept}（最大
        {formatFileSize(maxSize)}）
      </p>
    </div>
  );
}
