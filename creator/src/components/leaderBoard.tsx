import { formatJpy } from "@/utils/format";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "./ui/table";
import {
  contests,
  applications,
  creators,
  contest_transfers,
} from "@prisma/client";
import { getTikTokMetrics } from "@/services/videoService";

type LeaderBoardType = {
  competition: contests;
  applications:
    | (applications & { creators: creators } & {
        contest_transfers: contest_transfers | null;
      })[]
    | null;
};

export const revalidate = 20;

export default async function LeaderBoard({
  competition,
  applications,
}: LeaderBoardType) {
  const date = new Date();
  const { metrics } = await getTikTokMetrics(competition.id);

  return (
    <Table>
      <TableCaption>{date.toLocaleString()}</TableCaption>
      <TableCaption>{competition.description}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>順位</TableHead>
          <TableHead>クリエイター</TableHead>
          <TableHead className="text-right">再生数</TableHead>
          <TableHead className="text-right">賞金</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications?.map((application, index) => (
          <TableRow key={application.id}>
            <TableCell className="font-medium">#{index + 1}</TableCell>
            <TableCell>{application.creators.display_name}</TableCell>
            <TableCell className="text-right">
              {metrics
                .find((m) => m.applicationId === application.id)
                ?.metrics?.viewCount.toLocaleString()}
            </TableCell>
            <TableCell className="text-right">
              {formatJpy(competition.prize_distribution[index])}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
