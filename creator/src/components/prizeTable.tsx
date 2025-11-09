import { formatJpy } from "@/utils/format";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

type PrizeTableType = {
  prizeDistribution: number[];
};

export default async function PrizeTable({
  prizeDistribution,
}: PrizeTableType) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-md px-4">順位</TableHead>
          <TableHead className="text-md text-right px-4">賞金</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="border-b border-b-gray">
        {prizeDistribution?.length &&
          prizeDistribution.map(
            (prize, index) =>
              prize !== 0 && (
                <TableRow key={index} className="h-12">
                  <TableCell className="text-md font-medium px-4">
                    {index + 1}位
                  </TableCell>
                  <TableCell className="text-right text-md font-bold px-4">
                    {formatJpy(prize)}
                  </TableCell>
                </TableRow>
              ),
          )}
      </TableBody>
    </Table>
  );
}
