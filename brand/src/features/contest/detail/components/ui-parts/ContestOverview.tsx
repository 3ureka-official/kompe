import { Contest, ContestPrize } from "@/types/Contest";
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

type Props = {
  contest: Contest & {
    contest_prizes?: ContestPrize[];
  };
};

export function ContestOverview({ contest }: Props) {
  return (
    <div>
      <SectionContainer>
        <SectionTitle>コンテスト概要</SectionTitle>
        <p className="text-base">{contest.description}</p>
      </SectionContainer>

      <Separator />

      <SectionContainer>
        <SectionTitle>動画の条件</SectionTitle>
        <p className="text-base">{contest.requirements}</p>
      </SectionContainer>

      <Separator />

      <SectionContainer>
        <SectionTitle className="mb-4">賞金の分配</SectionTitle>
        <Table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
          <TableHeader className="bg-gray-50 border-b border-gray-200">
            <TableRow>
              <TableHead
                scope="col"
                className="py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                順位
              </TableHead>
              <TableHead
                scope="col"
                className="py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                賞金
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contest.contest_prizes?.map((prize) => (
              <TableRow key={prize.id}>
                <TableCell>{prize.rank}位</TableCell>
                <TableCell>{formatCurrency(prize.amount)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionContainer>
    </div>
  );
}
