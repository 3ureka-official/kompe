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
          <TableHead>順位</TableHead>
          <TableHead className="text-right">賞金</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {prizeDistribution?.length &&
          prizeDistribution.map(
            (prize, index) =>
              prize !== 0 && (
                <TableRow key={index}>
                  <TableCell className="font-medium">#{index + 1}</TableCell>
                  <TableCell className="text-right">
                    {formatJpy(prize)}
                  </TableCell>
                </TableRow>
              ),
          )}
      </TableBody>
    </Table>
  );
}
