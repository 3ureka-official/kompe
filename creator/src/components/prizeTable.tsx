import { formatJpy } from "@/utils/format";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

type ContestPrize = {
  id: string;
  contest_id: string;
  rank: bigint;
  amount: bigint;
  created_at: string | Date;
};

type PrizeTableType = {
  contestPrizes: ContestPrize[];
};

export default async function PrizeTable({ contestPrizes }: PrizeTableType) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-md px-4">順位</TableHead>
          <TableHead className="text-md text-right px-4">賞金</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="border-b border-b-gray">
        {contestPrizes?.length > 0 &&
          contestPrizes.map((prize) => (
            <TableRow key={prize.id} className="h-12">
              <TableCell className="text-md font-medium px-4">
                {prize.rank}位
              </TableCell>
              <TableCell className="text-right text-md font-bold px-4">
                {formatJpy(Number(prize.amount))}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
