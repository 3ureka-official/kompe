// components/contests/create/ui/RichTextEditer/LinkModal.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { ValidationError } from "yup";
import { Button } from "../../../../ui/Button";
import { Input } from "../../../../ui/Input";

type Props = {
  open: boolean;
  initialUrl?: string;
  onSubmit: (url: string | null) => void;
  onClose: () => void;
};

export default function LinkModal({
  open,
  initialUrl,
  onSubmit,
  onClose,
}: Props) {
  const [value, setValue] = useState(initialUrl || "");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const schema = yup.string().url("URLが不正です").required("必須です");

  useEffect(() => {
    if (!open) return;

    setValue(initialUrl || "");
    setError(null);

    // 次フレームでフォーカス
    const id = setTimeout(() => inputRef.current?.focus(), 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      clearTimeout(id);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, initialUrl, onClose]);

  if (!open) return null;

  const submit = () => {
    const trimmed = value.trim();

    // 空 → リンク解除
    if (!trimmed) {
      onSubmit(null);
      onClose();
      return;
    }

    try {
      const url = schema.validateSync(trimmed);
      onSubmit(url);
      onClose();
    } catch (err: unknown) {
      const message =
        err instanceof ValidationError
          ? (err.errors?.[0] ?? "URLが不正です")
          : "URLが不正です";
      setError(message);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 p-4"
      aria-modal="true"
      role="dialog"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-4 shadow-xl">
        <label className="mb-1 block text-sm text-gray-600">URL</label>
        <Input
          ref={inputRef}
          type="text"
          className="w-full rounded-md border px-3 py-2 outline-none ring-0 focus:outline-none focus:ring-0"
          placeholder="URLを入力してください"
          value={value}
          onChange={(v: string) => setValue(v)}
        />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

        <div className="mt-4 flex justify-between gap-2">
          <Button
            className="rounded-md border px-3 py-2 text-sm"
            onClick={onClose}
            type="button"
            variant="secondary"
          >
            キャンセル
          </Button>
          <div className="flex gap-2">
            <Button
              className="rounded-md px-3 py-2 text-sm"
              onClick={submit}
              type="button"
              variant="primary"
            >
              追加 / 更新
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
