import { Contest } from "@/types/Contest";
import { useGetAssets } from "@/hooks/contest/asset/useGetAssets";
import { useGetInspirations } from "@/hooks/contest/inspiration/useGetInspirations";
import { AssetItem, InspirationItem } from "@/types/Contest";
import { Link } from "lucide-react";

type Props = {
  contest: Contest;
};

export function ContestAssets({ contest }: Props) {
  const { getAssetsQuery } = useGetAssets(contest.id);
  const { data: assets } = getAssetsQuery;

  const { getInspirationsQuery } = useGetInspirations(contest.id);
  const { data: inspirations } = getInspirationsQuery;

  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
        <h2 className="mb-1">動画素材</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {assets?.map((asset: AssetItem, index: number) => (
            <div
              key={index}
              className="flex flex-col justify-between border rounded-lg p-4 bg-gray-50"
            >
              {asset.url && (
                <div className="text-sm rounded flex items-center justify-center gap-2">
                  <a
                    href={asset.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-30 w-30 flex items-center justify-center bg-gray-100 border border-gray-200"
                  >
                    <Link className="w-10 h-10 flex-shrink-0" />
                  </a>
                </div>
              )}

              {asset.description && (
                <div className="text-sm p-2 rounded min-h-[5rem]">
                  {asset.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h2 className="mb-1">イメージ動画</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {inspirations?.map((inspiration: InspirationItem, index: number) => (
            <div
              key={index}
              className="flex flex-col justify-between border rounded-lg p-4 bg-gray-50"
            >
              {inspiration.url && (
                <div className="text-sm rounded flex items-center justify-center gap-2">
                  <a
                    href={inspiration.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-30 w-30 flex items-center justify-center bg-gray-100 border border-gray-200"
                  >
                    <Link className="w-10 h-10 flex-shrink-0" />
                  </a>
                </div>
              )}

              {inspiration.description && (
                <div className="text-sm p-2 rounded min-h-[5rem]">
                  {inspiration.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
