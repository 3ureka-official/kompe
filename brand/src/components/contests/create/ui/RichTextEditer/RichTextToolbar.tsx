// components/RichTextToolbar.tsx
"use client";

import type { FC } from "react";
import { useState } from "react";
import type { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/Button";
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  List as BulletListIcon,
  ListOrdered as OrderedListIcon,
  LinkIcon,
  Link2OffIcon,
} from "lucide-react";

import LinkModal from "./LinkModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import * as yup from "yup";

interface RichTextToolbarProps {
  editor: Editor | null;
}

const Divider = () => <div className="h-5 border-l border-gray-300 mx-1" />;

export const RichTextToolbar: FC<RichTextToolbarProps> = ({ editor }) => {
  if (!editor) return null;

  const [open, setOpen] = useState(false);

  const handleSubmitLink = (url: string | null) => {
    if (!editor) return;
    if (url === null) {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const openLinkModal = () => setOpen(true);

  const unlink = () => editor.chain().focus().unsetLink().run();

  const setHeading = (level: number) => {
    if (level === 0) {
      editor.chain().focus().setParagraph().run();
    } else {
      editor
        .chain()
        .focus()
        .toggleHeading({ level: level as 1 | 2 | 3 })
        .run();
    }
  };

  const getCurrentHeading = () => {
    for (let i = 1; i <= 6; i++) {
      if (editor.isActive("heading", { level: i })) return String(i);
    }
    return "paragraph";
  };

  // 直接入力でURLを入れたい場合（モーダル使わない運用ならこの関数をボタンに割り当ててください）
  const setLinkViaPrompt = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const input = window.prompt("リンクURLを入力", prev || "");
    if (input === null) return;

    const urlSchema = yup
      .string()
      .url("URLを入力してください")
      .required("URLを入力してください");

    try {
      const url = urlSchema.validateSync(input);
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } catch {
      alert("URL が不正です。http(s):// または mailto: を指定してください。");
    }
  };

  const can = editor.can().chain().focus();

  return (
    <div
      className="flex flex-wrap items-center gap-0 bg-white border-b p-2"
      style={{ height: "53px", borderRadius: "10px 10px 0 0" }}
    >
      {/* テキストの種類 */}
      <Select
        value={getCurrentHeading()}
        onValueChange={(value) =>
          setHeading(value === "paragraph" ? 0 : parseInt(value))
        }
      >
        <SelectTrigger className="w-32">
          <SelectValue placeholder="本文" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="paragraph">本文</SelectItem>
          {[1, 2, 3].map((l) => (
            <SelectItem key={l} value={String(l)}>
              タイトル{l}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* 太字 */}
      <Button
        size="sm"
        className="ml-2"
        variant={editor.isActive("bold") ? "default" : "ghost"}
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!can.toggleBold().run()}
        aria-label="Bold"
        title="太字 (Markdownに保存されます)"
      >
        <BoldIcon className="w-4 h-4" />
      </Button>

      {/* 斜体 */}
      <Button
        size="sm"
        variant={editor.isActive("italic") ? "default" : "ghost"}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!can.toggleItalic().run()}
        aria-label="Italic"
        title="斜体 (Markdownに保存されます)"
      >
        <ItalicIcon className="w-4 h-4" />
      </Button>

      {/* 下線（Markdownでは保持されません） */}
      <Button
        size="sm"
        variant={editor.isActive("underline") ? "default" : "ghost"}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!can.toggleUnderline().run()}
        aria-label="Underline"
        title="下線（※Markdown保存時には保持されません）"
      >
        <UnderlineIcon className="w-4 h-4" />
      </Button>

      <Divider />

      {/* 箇条書き */}
      <Button
        size="sm"
        variant={editor.isActive("bulletList") ? "default" : "ghost"}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        disabled={!can.toggleBulletList().run()}
        aria-label="Bullet List"
        title="箇条書き (Markdownに保存されます)"
      >
        <BulletListIcon className="w-4 h-4" />
      </Button>

      {/* 番号付きリスト */}
      <Button
        size="sm"
        variant={editor.isActive("orderedList") ? "default" : "ghost"}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        disabled={!can.toggleOrderedList().run()}
        aria-label="Ordered List"
        title="番号リスト (Markdownに保存されます)"
      >
        <OrderedListIcon className="w-4 h-4" />
      </Button>

      <Divider />

      {/* URL 挿入 */}
      <Button
        size="sm"
        variant={editor.isActive("link") ? "default" : "ghost"}
        onClick={openLinkModal /* もしくは setLinkViaPrompt */}
        aria-label="Insert Link"
        title="リンクを挿入"
      >
        <LinkIcon className="w-4 h-4" />
      </Button>

      <Button
        size="sm"
        variant="ghost"
        onClick={unlink}
        disabled={!editor.isActive("link")}
        aria-label="Unset Link"
        title="リンクを解除"
      >
        <Link2OffIcon className="w-4 h-4" />
      </Button>

      <LinkModal
        open={open}
        onClose={() => setOpen(false)}
        initialUrl={editor.getAttributes("link").href}
        onSubmit={handleSubmitLink}
      />
    </div>
  );
};
