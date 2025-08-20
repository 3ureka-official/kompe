import { Contest } from "@/types/Contest";
import { useGetAssets } from "@/hooks/contest/asset/useGetAssets";
import { useGetInspirations } from "@/hooks/contest/inspiration/useGetInspirations";
import { AssetItem, InspirationItem } from "@/types/Contest";
import Image from "next/image";

type Props = {
  contest: Contest;
};

export function ContestAssets({ contest }: Props) {
  const { getAssetsQuery } = useGetAssets(contest.id);
  const { data: assets } = getAssetsQuery;

  const { getInspirationsQuery } = useGetInspirations(contest.id);
  const { data: inspirations } = getInspirationsQuery;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
      <div className="mb-6">
        <h2 className="mb-1">素材</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {assets?.map((asset: AssetItem, index: number) => (
            <div
              key={index}
              className="flex flex-col justify-between border rounded-lg p-4 bg-gray-50"
            >
              {/* ファイルプレビュー */}
              {asset.file_url && (
                <Image
                  src={asset.file_url}
                  alt={`asset - ${index + 1}`}
                  width={100}
                  height={100}
                  className="w-32 h-20 object-cover rounded border"
                />
              )}

              {/* URL */}
              {asset.url && (
                <a
                  href={asset.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  {asset.url}
                </a>
              )}

              {/* 説明 */}
              {asset.description && (
                <div className="text-sm p-2 rounded">{asset.description}</div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <h2 className="mb-1">イメージ動画</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {inspirations?.map((inspiration: InspirationItem, index: number) => (
            <div
              key={index}
              className="flex flex-col justify-between border rounded-lg p-4 bg-gray-50"
            >
              {inspiration.url && (
                <a
                  href={inspiration.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  {inspiration.url}
                </a>
              )}

              <p className="text-gray-500">{inspiration.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
