"use client";

import { useState } from "react";
import { formatFileSize } from "@/utils/format";
import Image from "next/image";
import { FaCamera, FaTimes } from "react-icons/fa";

type Props = {
  onFileChange: (file: File | null) => void;
  onPreviewChange: (preview: string | null) => void;
  accept?: string;
  maxSize?: number; // bytes
  className?: string;
  preview?: string | null;
};

export function FileUpload({
  onFileChange,
  onPreviewChange,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024, // 5MB
  className = "",
  preview,
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
      {/* 円形のファイル選択エリア */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <div
            className={`
              w-[160px] h-[160px] rounded-full border-2 border-dashed cursor-pointer transition-colors overflow-hidden
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
            {preview ? (
              <Image
                src={preview}
                alt="Preview"
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <FaCamera className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-xs text-gray-500 text-center px-2">
                  クリックして
                  <br />
                  画像を選択
                </p>
              </div>
            )}
          </div>
          {preview && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleFileChange(null);
              }}
              className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors z-1 shadow-md"
            >
              <FaTimes className="w-4 h-4" />
            </button>
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

        {/* ファイル制限情報 */}
        <p className="mt-2 text-sm text-gray-500 text-center">
          {accept === "image/*" ? "JPG、PNG形式" : accept}（最大
          {formatFileSize(maxSize)}）
        </p>
      </div>
    </div>
  );
}
