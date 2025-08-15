// components/RichTextEditor.tsx
"use client";

import { useEffect } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Markdown } from "tiptap-markdown";
import { RichTextToolbar } from "./RichTextToolbar";

function getMarkdown(editor: Editor): string {
  // 型は存在しないので any で安全に叩く
  return (editor.storage as any)?.markdown?.getMarkdown?.() ?? "";
}

interface RichTextEditorProps {
  value: string; // Markdown
  onChange: (md: string) => void; // Markdownで返す
  placeholder?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "ここにテキストを入力",
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline, // ※ Markdown保存では落ちます
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }), // ※ Markdown保存では落ちます
      LinkExtension.configure({
        openOnClick: true,
        linkOnPaste: true,
        HTMLAttributes: {
          class: "text-blue-600 underline",
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: "is-editor-empty",
      }),
      Markdown, // ← 重要
    ],
    content: value, // 初期Markdown
    onCreate: ({ editor }) => {
      onChange(getMarkdown(editor)); // 初期同期
    },
    onUpdate: ({ editor }) => {
      onChange(getMarkdown(editor)); // 変更ごとにMarkdown返す
    },
    editorProps: {
      attributes: {
        class:
          "outline-none focus:outline-none prose prose-sm prose-ul:list-disc prose-ul:pl-5 prose-ol:list-decimal prose-ol:pl-5",
      },
    },
  });

  // 外部から value(Markdown) が変わったら反映
  useEffect(() => {
    if (!editor) return;
    const current = getMarkdown(editor);
    if (current !== value) {
      editor.commands.setContent(value); // Markdownをそのままセット
    }
  }, [editor, value]);

  return (
    <div className="border rounded-lg">
      <RichTextToolbar editor={editor} />
      <EditorContent
        editor={editor}
        className="
          bg-gray-100
          min-h-[135px] p-2 rounded-b-lg
          outline-none focus:outline-none ring-0
          [&_ul]:list-disc [&_ul]:pl-5
          [&_ol]:list-decimal [&_ol]:pl-5
          [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:my-2
          [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:my-2
          [&_h3]:text-xl [&_h3]:font-medium [&_h3]:my-2
          [&_h4]:text-lg [&_h4]:font-medium [&_h4]:my-1
          [&_h5]:text-base [&_h5]:font-medium [&_h5]:my-1
          [&_h6]:text-sm [&_h6]:font-medium [&_h6]:my-1
          [&_u]:underline [&_u]:decoration-black [&_u]:decoration-2
          [&_a]:underline [&_a]:decoration-blue-500 [&_a]:text-blue-600 [&_a:hover]:decoration-blue-700 [&_a:hover]:text-blue-700
        "
        style={{ padding: "10px" }}
      />
    </div>
  );
}
