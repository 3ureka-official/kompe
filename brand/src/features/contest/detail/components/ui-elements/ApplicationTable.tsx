"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { Application } from "@/types/Application";
import { ShippingSampleNotification } from "@/types/ShippingSampleNotification";
import { formatDateTime } from "@/utils/format";
import { Send, CheckCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  applications: Application[];
  shippingNotifications?: ShippingSampleNotification[];
  onShippingNotify?: (application: Application) => void;
};

/**
 * 応募期間・動画制作期間用のテーブル
 * クリエイター名、応募日、発送通知ボタンを表示
 */
export function ApplicationTable({
  applications,
  shippingNotifications = [],
  onShippingNotify,
}: Props) {
  // application_idで発送通知を検索
  const getNotification = (applicationId: string) =>
    shippingNotifications.find((n) => n.application_id === applicationId);

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead
                scope="col"
                className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                クリエイター
              </TableHead>
              <TableHead
                scope="col"
                className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                応募日
              </TableHead>
              <TableHead
                scope="col"
                className="py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                発送状況
              </TableHead>
              <TableHead
                scope="col"
                className="py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                操作
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {applications.length > 0 ? (
              applications.map((application) => {
                const notification = getNotification(application.id);
                const isShipped = !!notification;

                return (
                  <TableRow
                    key={application.id}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() =>
                      window.open(
                        `https://www.tiktok.com/@${application.creator.username}`,
                        "_blank",
                        "noopener,noreferrer",
                      )
                    }
                  >
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
                      {formatDateTime(new Date(application.created_at))}
                    </TableCell>
                    <TableCell className="py-4 whitespace-nowrap text-center">
                      {isShipped ? (
                        <span className="inline-flex items-center gap-1 text-sm text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          発送済み
                        </span>
                      ) : (
                        <span className="text-sm text-red-500 font-medium">
                          未発送
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="py-4 whitespace-nowrap text-center">
                      <div className="relative inline-block">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onShippingNotify?.(application);
                          }}
                          className="gap-1"
                        >
                          <Send className="w-4 h-4" />
                          {isShipped ? "詳細" : "発送通知"}
                        </Button>
                        {!isShipped && (
                          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
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
