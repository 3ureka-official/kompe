import { formatJpy } from "@/utils/format";
import { ExternalLinkIcon, PlayIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import {
  contests,
  applications,
  creators,
  contest_transfers,
  contest_prizes,
} from "@prisma/client";
import { formatDateTime } from "@/utils/format";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { auth } from "@/auth";

type LeaderBoardType = {
  competition: contests & { contest_prizes?: contest_prizes[] };
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
  const session = await auth();

  return (
    <div>
      {competition.updated_engagement_at && (
        <div className="text-sm text-muted-foreground mb-2 px-4">
          前回の更新: {formatDateTime(competition.updated_engagement_at)}
        </div>
      )}
      <Table>
        <TableBody className="border-y border-y-gray">
          {applications &&
          applications.filter((app) => app.tiktok_url !== null).length > 0 ? (
            applications
              .filter((app) => app.tiktok_url !== null)
              .map((application, index) => (
                <TableRow key={application.id} className="h-12">
                  <TableCell className="font-medium w-6 px-2">
                    <p
                      className={`text-sm font-bold h-6 w-6 rounded-full flex items-center justify-center ${session?.user?.creator_id === application.creator_id ? "bg-primary text-primary-foreground" : ""}`}
                    >
                      {index + 1}
                    </p>
                  </TableCell>
                  <TableCell className="w-12">
                    <Avatar className="size-12">
                      <AvatarImage
                        src={
                          application.creators.avatar_url ||
                          "" /* todo: fallback image */
                        }
                      />
                      <AvatarFallback className="uppercase">
                        {application.creators.display_name?.split("", 2)}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="flex flex-col gap-1 text-left w-full">
                    <p className="text-sm">
                      {application.creators.display_name}
                    </p>
                    <span className="flex items-center gap-1">
                      <PlayIcon className="size-4 stroke-2" />
                      <p className="text-sm">
                        {application.views.toLocaleString()}
                      </p>
                    </span>
                  </TableCell>
                  <TableCell className="w-12">
                    <p className="text-base font-bold">
                      {competition.contest_prizes &&
                      competition.contest_prizes[index]
                        ? formatJpy(
                            Number(competition.contest_prizes[index].amount),
                          )
                        : "¥0"}
                    </p>
                  </TableCell>
                  <TableCell className="text-right w-5 pr-4">
                    <Link
                      href={`https://www.tiktok.com/@${application.creators.username}/video/${application.tiktok_url?.split("/").pop()}`}
                      target="_blank"
                    >
                      <ExternalLinkIcon className="size-4 stroke-2" />
                    </Link>
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
