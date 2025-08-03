import Markdown from "react-markdown";
import { legalComponents } from "./LegalMarkdownComponents";

type MarkdownProps = {
  children: string;
};

export const MarkdownBox = (props: MarkdownProps) => {
  return (
    <article className="px-4 sm:px-6 lg:px-12 xl:px-20">
      <Markdown components={legalComponents}>{props.children}</Markdown>
    </article>
  );
};
