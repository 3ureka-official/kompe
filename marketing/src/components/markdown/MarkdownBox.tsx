import Markdown from "react-markdown";
import { legalComponents } from "./LegalMarkdownComponents";
import remarkGfm from "remark-gfm";

type MarkdownProps = {
  children: string;
};

export const MarkdownBox = (props: MarkdownProps) => {
  return (
    <article className="px-4 sm:px-6 lg:px-12 xl:px-20">
      <Markdown remarkPlugins={[remarkGfm]} components={legalComponents}>
        {props.children}
      </Markdown>
    </article>
  );
};
