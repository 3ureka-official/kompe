import { Contest, ContestPrize } from "@/types/Contest";
import { SectionTitle } from "../ui-elements/SectionTitle";
import { SectionContainer } from "../ui-elements/SectionContainer";
import { Separator } from "@/components/ui/Separator";
import Image from "next/image";

type Props = {
  contest: Contest & {
    contest_prizes?: ContestPrize[];
  };
};

export function ContestSample({ contest }: Props) {
  return (
    <div>
      <SectionContainer>
        <div className="flex items-start justify-between gap-4">
          <div className="w-full flex flex-col gap-6">
            <div>
              <SectionTitle>試供品について</SectionTitle>
              <p>{contest.sample_product_name}</p>
            </div>
            <div>
              <SectionTitle>レンタル/提供</SectionTitle>
              <p>
                {contest.sample_provide_type === "RENTAL" ? "レンタル" : "提供"}
              </p>
            </div>
          </div>

          <div className="w-full flex items-center justify-start">
            <Image
              src={contest.sample_image_url ?? ""}
              alt={contest.sample_product_name ?? ""}
              width={100}
              height={100}
              className="w-60 object-cover rounded-lg"
            />
          </div>
        </div>
      </SectionContainer>

      {contest.sample_provide_type === "RENTAL" && (
        <>
          <Separator />
          <SectionContainer>
            <SectionTitle>返却住所</SectionTitle>
            <div className="flex flex-col gap-2">
              <p className="text-base">
                郵便番号：{contest.sample_return_postal_code || "-"}
              </p>
              <p className="text-base">
                都道府県：{contest.sample_return_prefecture || "-"}
              </p>
              <p className="text-base">
                市区町村：{contest.sample_return_city || "-"}
              </p>
              <p className="text-base">
                番地・建物名：{contest.sample_return_address_line || "-"}
              </p>
            </div>
          </SectionContainer>
        </>
      )}
    </div>
  );
}
