import { formatJpy } from "@/utils/format";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  contests,
  applications,
  creators,
  contest_transfers,
} from "@prisma/client";
import { formatDate } from "@/utils/format";

type LeaderBoardType = {
  competition: contests;
  applications:
    | (applications & { creators: creators } & {
        contest_transfers: contest_transfers | null;
      })[]
    | null;
};

export default async function LeaderBoard({
  competition,
  applications,
}: LeaderBoardType) {
  return (
    <div>
      <div className="text-sm text-muted-foreground mb-2">
        前回の更新: {formatDate(competition.updated_engagement_at)}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>順位</TableHead>
            <TableHead>クリエイター</TableHead>
            <TableHead className="text-right">再生数</TableHead>
            <TableHead className="text-right">賞金</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications && applications.length > 0 ? (
            applications?.map((application, index) => (
              <TableRow key={application.id}>
                <TableCell className="font-medium">#{index + 1}</TableCell>
                <TableCell>{application.creators.display_name}</TableCell>
                <TableCell className="text-right">
                  {application.views.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  {formatJpy(competition.prize_distribution[index])}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                参加者がいません
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
