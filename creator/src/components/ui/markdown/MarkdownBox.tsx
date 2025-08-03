import Markdown from "react-markdown";
import { MarkdownComponents } from "./MarkdownComponents";
import remarkGfm from "remark-gfm";

interface MarkdownBoxProps {
  content: string;
}

export const MarkdownBox = ({ content }: MarkdownBoxProps) => {
  return (
    <Markdown remarkPlugins={[remarkGfm]} components={MarkdownComponents}>
      {content}
    </Markdown>
  );
};
