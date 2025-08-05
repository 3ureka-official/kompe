import { Creator } from "@/types/Creator";
import { CreatorTable } from "./CreatorTable";

type Props = {
  creators: Creator[];
  onCreatorClick: (creator: Creator) => void;
};

export function ContestCreatorSection({ creators, onCreatorClick }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          参加クリエイター
        </h2>
        <div className="text-sm text-gray-500">{creators.length}名が参加中</div>
      </div>
      <CreatorTable creators={creators} onCreatorClick={onCreatorClick} />
    </div>
  );
}
