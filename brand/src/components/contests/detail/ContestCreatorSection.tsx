import { Contest } from "@/types/Contest";
import { useGetApplication } from "@/hooks/application/useGetApplication";
import { formatNumber } from "@/utils/format";
import { Button } from "@/components/ui/Button";
import {
  LinkIcon,
  CreditCardIcon,
  CheckIcon,
  CircleAlertIcon,
} from "lucide-react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { useState } from "react";
import TransactionModal from "./TransactionModal";
import { Application } from "@/types/Application";
import { ContestPayment } from "@/types/ContestPayment";
import { Badge } from "@/components/ui/Badge";

type Props = {
  contest: Contest;
  contestPayment: ContestPayment;
};

export function ContestCreatorSection({ contest, contestPayment }: Props) {
  const [showTransactionModal, setShowTransactionModal] = useState<{
    isOpen: boolean;
    application: Application | null;
    amount: number;
  }>({
    isOpen: false,
    application: null,
    amount: 0,
  });
  const { getApplicationQuery } = useGetApplication(contest.id);
  const { data: applications, isPending } = getApplicationQuery;

  const renderRankColor = (rank: number) => {
    if (rank === 0 && formatNumber(contest.prize_distribution[rank]) != "0")
      return "bg-yellow-500 text-white";
    if (rank === 1 && formatNumber(contest.prize_distribution[rank]) != "0")
      return "bg-gray-500 text-white";
    if (rank === 2 && formatNumber(contest.prize_distribution[rank]) != "0")
      return "bg-orange-700 text-white";
    if (formatNumber(contest.prize_distribution[rank]) != "0")
      return "bg-blue-500 text-white";
    return "";
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  const handleOpenTransactionModal = (
    event: React.MouseEvent<HTMLButtonElement>,
    application: Application,
    amount: number,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setShowTransactionModal({ isOpen: true, application, amount });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          参加クリエイター
        </h2>
        <div className="text-sm text-gray-500">
          {applications?.length}名が参加中
        </div>
      </div>
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
                <TableHead scope="col" className="relative py-3"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-200">
              {applications?.map((application, index) => (
                <TableRow
                  key={application.id}
                  className="hover:bg-gray-50 cursor-pointer transition-colors mx-6"
                  onClick={() =>
                    window.open(
                      application.tiktok_url,
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }
                >
                  <TableCell
                    className={`py-4 whitespace-nowrap text-sm text-gray-900 flex items-center justify-center`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${renderRankColor(index)}`}
                    >
                      {index + 1}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <Image
                          className="h-10 w-10 rounded-full border border-gray-200"
                          src={application.creator.avatar_url}
                          alt={application.creator.display_name}
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {application.creator.display_name}
                        </div>
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
                    {formatNumber(contest.prize_distribution[index])}円
                  </TableCell>
                  <TableCell className="py-4 whitespace-nowrap text-sm font-medium text-center">
                    <div className="flex items-center justify-end gap-2 pr-4">
                      {new Date(contest.contest_end_date) < new Date() &&
                        contestPayment.status === "succeeded" &&
                        Number(contest.prize_distribution[index]) > 0 && (
                          <Button
                            className="relative"
                            variant="outline"
                            size="sm"
                            onClick={(event) =>
                              handleOpenTransactionModal(
                                event,
                                application,
                                contest.prize_distribution[index],
                              )
                            }
                          >
                            <CreditCardIcon className="w-4 h-4" />
                            {application.contest_transfer ? (
                              <Badge
                                variant="outline"
                                className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-5 h-5 text-xs"
                              >
                                <CheckIcon className="w-4 h-4" />
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                              >
                                <CircleAlertIcon className="w-4 h-4" />
                              </Badge>
                            )}
                          </Button>
                        )}
                      <Button variant="outline" size="sm">
                        <LinkIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {showTransactionModal.isOpen && (
        <TransactionModal
          isOpen={showTransactionModal.isOpen}
          onClose={() =>
            setShowTransactionModal({
              isOpen: false,
              application: null,
              amount: 0,
            })
          }
          contest={contest}
          application={showTransactionModal.application!}
          amount={showTransactionModal.amount}
        />
      )}
    </div>
  );
}
