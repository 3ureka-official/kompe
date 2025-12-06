"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Application } from "@/types/Application";
import { ContestPrize } from "@/types/Contest";
import { formatNumber } from "@/utils/format";
import { useContestCreatorSection } from "@/features/contest/detail/hooks/useContestCreatorSection";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type Props = {
  applications: Application[];
  contestPrizes?: ContestPrize[];
};

/**
 * 開催期間・終了後用のランキングテーブル
 * 順位、クリエイター名、再生数、いいね数、コメント数、シェア数、賞金を表示
 */
export function RankingTable({ applications, contestPrizes }: Props) {
  const { renderRankColor } = useContestCreatorSection();

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead
                scope="col"
                className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              ></TableHead>
              <TableHead
                scope="col"
                className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              ></TableHead>
              <TableHead
                scope="col"
                className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                再生数
              </TableHead>
              <TableHead
                scope="col"
                className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                いいね数
              </TableHead>
              <TableHead
                scope="col"
                className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                コメント数
              </TableHead>
              <TableHead
                scope="col"
                className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                シェア数
              </TableHead>
              <TableHead
                scope="col"
                className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                賞金
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {applications.length > 0 ? (
              applications.map((application, index) => (
                <TableRow
                  key={application.id}
                  className="hover:bg-gray-50 cursor-pointer transition-colors mx-6"
                  onClick={() =>
                    window.open(
                      `https://www.tiktok.com/@${application.creator.username}`,
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }
                >
                  <TableCell
                    className={`py-4 whitespace-nowrap text-sm text-gray-900 flex items-center justify-center`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${renderRankColor(index, contestPrizes)}`}
                    >
                      {index + 1}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Avatar>
                        <AvatarImage
                          src={application.creator.avatar_url}
                          alt={application.creator.display_name}
                        />
                        <AvatarFallback>
                          {application.creator.display_name
                            .split("")
                            .slice(0, 2)
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-4 text-sm font-medium text-gray-900">
                        {application.creator.display_name}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatNumber(application.views)}
                  </TableCell>
                  <TableCell className="py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatNumber(application.likes)}
                  </TableCell>
                  <TableCell className="py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatNumber(application.comments)}
                  </TableCell>
                  <TableCell className="py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatNumber(application.shares)}
                  </TableCell>
                  <TableCell className="py-4 whitespace-nowrap text-sm text-gray-900">
                    {contestPrizes && contestPrizes[index]
                      ? `${formatNumber(contestPrizes[index].amount)}円`
                      : "0円"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  まだ参加者がいません
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
