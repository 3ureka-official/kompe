import { Contest, ContestPrize } from "@/types/Contest";
import { SampleProduct } from "@/types/SampleProduct";
import { Separator } from "@/components/ui/Separator";
import { formatCurrency } from "@/utils/format";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { SectionTitle } from "../ui-elements/SectionTitle";
import { SectionContainer } from "../ui-elements/SectionContainer";
import { LabeledText } from "../ui-elements/LabeledText";

type Props = {
  contest: Contest & {
    contest_prizes?: ContestPrize[];
    sample_products?: SampleProduct[];
  };
};

export function ContestOverview({ contest }: Props) {
  return (
    <div>
      <SectionContainer>
        <SectionTitle>コンテスト概要</SectionTitle>
        <div className="text-sm text-gray-500">{contest.description}</div>
      </SectionContainer>

      <Separator />

      <SectionContainer>
        <SectionTitle>賞金の分配</SectionTitle>
        <div className="text-sm text-gray-500">
          {contest.contest_prizes?.map((prize) => (
            <div className="flex items-center gap-2" key={prize.id}>
              <span className="text-sm text-gray-500">{prize.rank}位:</span>
              <span className="text-sm text-gray-500">
                {formatCurrency(prize.amount)}
              </span>
            </div>
          ))}
        </div>
      </SectionContainer>

      <Separator />

      {/* 試供品セクション */}
      {contest.sample_products && contest.sample_products.length > 0 && (
        <>
          <SectionContainer>
            <SectionTitle className="mb-4">試供品について</SectionTitle>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>商品名</TableHead>
                    <TableHead>貸す/購入</TableHead>
                    <TableHead>1クリエイターあたりの金額</TableHead>
                    <TableHead>郵便番号</TableHead>
                    <TableHead>都道府県</TableHead>
                    <TableHead>市区町村</TableHead>
                    <TableHead>番地・建物名</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contest.sample_products.map((sample) => (
                    <TableRow key={sample.id}>
                      <TableCell>{sample.product_name}</TableCell>
                      <TableCell>
                        {sample.rental_or_purchase === "RENTAL"
                          ? "貸す"
                          : "購入"}
                      </TableCell>
                      <TableCell>
                        {sample.price_per_creator.toLocaleString()}円
                      </TableCell>
                      <TableCell>
                        {sample.rental_or_purchase === "RENTAL"
                          ? sample.return_postal_code || "-"
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {sample.rental_or_purchase === "RENTAL"
                          ? sample.return_prefecture || "-"
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {sample.rental_or_purchase === "RENTAL"
                          ? sample.return_city || "-"
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {sample.rental_or_purchase === "RENTAL"
                          ? sample.return_address_line || "-"
                          : "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </SectionContainer>
          <Separator />
        </>
      )}

      <Separator />

      <SectionContainer>
        <SectionTitle>動画の条件</SectionTitle>
        <div className="text-sm text-gray-500">{contest.requirements}</div>
      </SectionContainer>

      {/* 購入条件セクション */}
      {contest.requires_purchase_proof && (
        <>
          <Separator />
          <SectionContainer>
            <div className="flex items-center gap-2 mb-3">
              <SectionTitle className="mb-0">参加条件</SectionTitle>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                商品購入が必要
              </span>
            </div>
            {contest.purchase_product_name && (
              <LabeledText label="対象商品" className="mb-2">
                {contest.purchase_product_name}
              </LabeledText>
            )}
            {contest.purchase_product_url && (
              <div className="mb-2">
                <a
                  href={contest.purchase_product_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  購入ページを開く
                </a>
              </div>
            )}
            {contest.purchase_description && (
              <LabeledText
                label="ブランドからの説明"
                className="mt-3"
                contentClassName="whitespace-pre-line"
              >
                {contest.purchase_description}
              </LabeledText>
            )}
          </SectionContainer>
        </>
      )}
    </div>
  );
}
