// components/RichTextToolbar.tsx
"use client";

import { FC } from "react";
import { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/Button";
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  Strikethrough as StrikethroughIcon,
  List as BulletListIcon,
  ListOrdered as OrderedListIcon,
  AlignLeft as AlignLeftIcon,
  AlignCenter as AlignCenterIcon,
  AlignRight as AlignRightIcon,
  LinkIcon,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

interface RichTextToolbarProps {
  editor: Editor | null;
}

const Divider = () => <div className="h-5 border-l border-gray-300 mx-1" />;

export const RichTextToolbar: FC<RichTextToolbarProps> = ({ editor }) => {
  if (!editor) return null;

  const setHeading = (level: number) => {
    if (level === 0) {
      editor.chain().focus().setParagraph().run();
    } else {
      editor
        .chain()
        .focus()
        .toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 })
        .run();
    }
  };

  const getCurrentHeading = () => {
    for (let i = 1; i <= 6; i++) {
      if (editor.isActive("heading", { level: i })) return String(i);
    }
    return "paragraph";
  };

  const applyAlign = (alignment: "left" | "center" | "right") => {
    editor
      .chain()
      .focus()
      .setTextAlign(alignment as "left" | "center" | "right")
      .run();
  };

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
          <SelectValue placeholder="Paragraph" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="paragraph">Paragraph</SelectItem>
          {[1, 2, 3, 4, 5, 6].map((l) => (
            <SelectItem key={l} value={String(l)}>
              Heading {l}
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
        aria-label="Bold"
      >
        <BoldIcon className="w-4 h-4" />
      </Button>

      {/* 斜体 */}
      <Button
        size="sm"
        variant={editor.isActive("italic") ? "default" : "ghost"}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        aria-label="Italic"
      >
        <ItalicIcon className="w-4 h-4" />
      </Button>

      {/* 下線 */}
      <Button
        size="sm"
        variant={editor.isActive("underline") ? "default" : "ghost"}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        aria-label="Underline"
      >
        <UnderlineIcon className="w-4 h-4" />
      </Button>

      {/* 打ち消し線 */}
      <Button
        size="sm"
        variant={editor.isActive("strike") ? "default" : "ghost"}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        aria-label="Strike"
      >
        <StrikethroughIcon className="w-4 h-4" />
      </Button>

      <Divider />

      {/* 箇条書き */}
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        aria-label="Bullet List"
      >
        <BulletListIcon className="w-4 h-4" />
      </Button>

      {/* 番号付きリスト */}
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        aria-label="Ordered List"
      >
        <OrderedListIcon className="w-4 h-4" />
      </Button>

      <Divider />

      {/* 寄せ方向 */}
      <Button
        size="sm"
        variant="ghost"
        onClick={() => applyAlign("left")}
        aria-label="Align Left"
      >
        <AlignLeftIcon className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => applyAlign("center")}
        aria-label="Align Center"
      >
        <AlignCenterIcon className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => applyAlign("right")}
        aria-label="Align Right"
      >
        <AlignRightIcon className="w-4 h-4" />
      </Button>

      <Divider />

      {/* URL 挿入 */}
      <Button
        size="sm"
        variant="ghost"
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleLink({ href: "https://example.com" })
            .run()
        }
        aria-label="Insert Link"
      >
        <LinkIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};
