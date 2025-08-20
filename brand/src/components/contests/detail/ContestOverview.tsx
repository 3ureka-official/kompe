import { Contest } from "@/types/Contest";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  contest: Contest;
};

export function ContestOverview({ contest }: Props) {
  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          コンテスト概要
        </h2>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {contest.description}
        </ReactMarkdown>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">ルール</h2>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {contest.requirements}
        </ReactMarkdown>
      </div>
    </div>
  );
}
