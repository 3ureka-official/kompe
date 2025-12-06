import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Application } from "@/types/Application";
import { ShippingSampleNotification } from "@/types/ShippingSampleNotification";
import {
  useCreateShippingNotification,
  useUpdateShippingNotification,
} from "@/features/contest/detail/hooks/useShippingSampleNotification";
import {
  shippingNotificationSchema,
  ShippingNotificationFormData,
} from "@/features/contest/detail/schemas/shippingNotificationSchema";

type UseShippingNotificationDialogProps = {
  application: Application | null;
  contestId: string;
  brandId: string;
  shippingNotifications: ShippingSampleNotification[];
  onClose: () => void;
  open: boolean;
};

export function useShippingNotificationDialog({
  application,
  contestId,
  brandId,
  shippingNotifications,
  onClose,
  open,
}: UseShippingNotificationDialogProps) {
  // 既存の通知を検索（APIを呼ばずにメモリ上で検索）
  const existingNotification = useMemo(() => {
    if (!application) return null;
    return (
      shippingNotifications.find((n) => n.application_id === application.id) ||
      null
    );
  }, [application, shippingNotifications]);

  // 現在のステータスを計算（既存の通知があればそのステータス、なければ"pending"）
  const currentStatus = useMemo<"pending" | "shipped" | "delivered">(() => {
    if (existingNotification) {
      return existingNotification.status || "shipped";
    }
    return "pending";
  }, [existingNotification]);

  const createMutation = useCreateShippingNotification();
  const updateMutation = useUpdateShippingNotification(
    contestId,
    application?.id || "",
  );

  const { control, handleSubmit, reset } =
    useForm<ShippingNotificationFormData>({
      resolver: yupResolver(shippingNotificationSchema),
      defaultValues: shippingNotificationSchema.cast({}),
    });

  // 既存の通知がある場合はフォームに反映
  useEffect(() => {
    if (existingNotification) {
      reset({
        tracking_number: existingNotification.tracking_number,
        carrier: existingNotification.carrier,
        message: existingNotification.message,
      });
    }
  }, [existingNotification, reset, open]);

  const onSubmit = async (data: ShippingNotificationFormData) => {
    if (!application) return;

    const notificationData = {
      tracking_number: data.tracking_number,
      carrier: data.carrier,
      message: data.message,
      status: "shipped" as const,
    };

    if (existingNotification) {
      await updateMutation.mutateAsync({
        id: existingNotification.id,
        data: notificationData,
      });
    } else {
      await createMutation.mutateAsync({
        ...notificationData,
        application_id: application.id,
        contest_id: contestId,
        brand_id: brandId,
      });
    }

    // 送信後にフォームをリセット
    reset(shippingNotificationSchema.cast({}));
    onClose();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // スキーマのデフォルト値にリセット
      reset(shippingNotificationSchema.cast({}));
    }
    onClose();
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return {
    control,
    handleSubmit,
    existingNotification,
    isPending,
    onSubmit,
    currentStatus,
    handleOpenChange,
  };
}
