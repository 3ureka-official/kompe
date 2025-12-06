"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Application } from "@/types/Application";
import { ShippingSampleNotification } from "@/types/ShippingSampleNotification";
import { useShippingNotificationDialog } from "@/features/contest/detail/hooks/useShippingNotificationDialog";
import { TextField } from "@/components/ui-elements/form/TextField";
import { TextareaField } from "@/components/ui-elements/form/TextareaField";
import { useGetCreatorAddress } from "@/features/contest/detail/hooks/useCreatorAddress";
import { ShippingStatusStepper } from "@/features/contest/detail/components/ui-elements/ShippingStatusStepper";
import { Separator } from "@/components/ui/Separator";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  application: Application | null;
  contestId: string;
  brandId: string;
  shippingNotifications: ShippingSampleNotification[];
};

export function ShippingNotificationDialog({
  open,
  onOpenChange,
  application,
  contestId,
  brandId,
  shippingNotifications,
}: Props) {
  const {
    control,
    handleSubmit,
    existingNotification,
    isPending,
    onSubmit,
    currentStatus,
    handleOpenChange,
  } = useShippingNotificationDialog({
    application,
    contestId,
    brandId,
    shippingNotifications,
    onClose: () => onOpenChange(false),
    open,
  });

  // ダイアログを閉じたときにフォームをリセット
  const { data: creatorAddress, isLoading: isLoadingAddress } =
    useGetCreatorAddress(
      application?.creatorId || (application as Application)?.creator.id,
    );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>試供品の配送状況</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6">
          {/* ステッパー */}
          <div className="py-4">
            <ShippingStatusStepper currentStatus={currentStatus} />
          </div>

          <Separator />

          {/* クリエイター情報 */}
          <div className="flex flex-col gap-2">
            <Label>クリエイター</Label>
            <p className="text-sm text-gray-600">
              {application?.creator.display_name}
            </p>
          </div>

          {/* 配送先住所 */}
          <div className="flex flex-col gap-2">
            <Label>配送先住所</Label>
            {isLoadingAddress ? (
              <p className="text-sm text-gray-500">読み込み中...</p>
            ) : creatorAddress ? (
              <div className="text-sm text-gray-600 space-y-1 bg-gray-50 p-3 rounded-md">
                <p>〒{creatorAddress.postal_code}</p>
                <p>
                  {creatorAddress.prefecture}
                  {creatorAddress.city}
                  {creatorAddress.address_line}
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-500">住所が登録されていません</p>
            )}
          </div>

          <Separator />

          {/* フォームまたはメッセージ */}
          {currentStatus === "pending" ? (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <TextField
                control={control}
                name="carrier"
                label="配送業者"
                placeholder="例: ヤマト運輸、佐川急便"
                required
              />

              <TextField
                control={control}
                name="tracking_number"
                label="追跡番号"
                placeholder="追跡番号を入力"
                required
              />

              <TextareaField
                control={control}
                name="message"
                label="メッセージ"
                placeholder="メッセージを入力"
                required
                rows={3}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOpenChange(false)}
                  disabled={isPending}
                >
                  キャンセル
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "送信中..." : "発送済み通知"}
                </Button>
              </DialogFooter>
            </form>
          ) : (
            <div className="flex flex-col gap-4">
              {/* 配送業者と追跡番号を表示 */}
              {existingNotification && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label>配送業者</Label>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                      {existingNotification.carrier}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>追跡番号</Label>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                      {existingNotification.tracking_number}
                    </p>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOpenChange(false)}
                >
                  閉じる
                </Button>
              </DialogFooter>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
