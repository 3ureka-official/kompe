"use client";

import { Button } from "@/components/ui/Button";
import { Trash2, Link } from "lucide-react";

type Props = {
  url: string;
  description?: string;
  onDelete: () => void;
};

/**
 * アセット・インスピレーション共通のリソースカードコンポーネント
 */
export function ResourceCard({ url, description, onDelete }: Props) {
  return (
    <div className="flex flex-col justify-between border rounded-lg p-4 bg-gray-50 gap-4 relative">
      {/* 削除ボタン */}
      <Button
        type="button"
        onClick={onDelete}
        variant="destructive"
        className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600"
      >
        <Trash2 className="w-4 h-4" />
      </Button>

      {/* URL */}
      {url && (
        <div className="text-sm rounded h-30 w-30 bg-gray-100 border border-gray-200 flex items-center justify-center gap-2">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Link className="w-10 h-10 flex-shrink-0" />
          </a>
        </div>
      )}

      {/* 説明 */}
      {description && (
        <div className="text-sm h-10 rounded overflow-hidden line-clamp-2">
          {description}
        </div>
      )}
    </div>
  );
}
