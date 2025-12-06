import { Contest } from "@/types/Contest";
import { useGetAssets } from "@/features/contest/common/hooks/asset/useGetAssets";
import { useGetInspirations } from "@/features/contest/common/hooks/inspiration/useGetInspirations";
import { AssetItem, InspirationItem } from "@/types/Contest";
import { Separator } from "@/components/ui/Separator";
import { SectionTitle } from "../ui-elements/SectionTitle";
import { SectionContainer } from "../ui-elements/SectionContainer";
import { LinkCard } from "../ui-elements/LinkCard";
import { EmptyState } from "../ui-elements/EmptyState";

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
      <SectionContainer>
        <SectionTitle className="mb-2">動画素材</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {assets?.length === 0 && (
            <EmptyState message="動画素材がありません" />
          )}
          {assets?.map((asset: AssetItem, index: number) => (
            <LinkCard
              key={index}
              url={asset.url || ""}
              description={asset.description}
            />
          ))}
        </div>
      </SectionContainer>

      <Separator />

      <SectionContainer>
        <SectionTitle className="mb-2">イメージ動画</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {inspirations?.length === 0 && (
            <EmptyState message="イメージ動画がありません" />
          )}
          {inspirations?.map((inspiration: InspirationItem, index: number) => (
            <LinkCard
              key={index}
              url={inspiration.url || ""}
              description={inspiration.description}
            />
          ))}
        </div>
      </SectionContainer>
    </div>
  );
}
