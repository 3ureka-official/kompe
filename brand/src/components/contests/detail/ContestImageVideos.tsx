import { Contest, AssetItem } from "@/types/Contest";

type Props = {
  contest: Contest;
};

export function ContestImageVideos({ contest }: Props) {
  if (!contest.assets || contest.assets.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">イメージ動画</h2>
      <div className="space-y-3">
        {contest.assets.map((video: string | AssetItem, index: number) => (
          <div key={index} className="flex items-start">
            {/* <div className="flex-shrink-0 w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2"></div>
            <a href={video} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
              {video}
            </a> */}
          </div>
        ))}
      </div>
    </div>
  );
}
