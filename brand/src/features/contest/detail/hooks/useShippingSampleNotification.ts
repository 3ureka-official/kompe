import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createShippingSampleNotification,
  getShippingSampleNotificationByApplicationId,
  getShippingSampleNotificationsByContestId,
  updateShippingSampleNotification,
} from "@/services/supabase/shippingSampleNotificationService";
import {
  ShippingSampleNotificationCreate,
  ShippingSampleNotificationUpdate,
} from "@/types/ShippingSampleNotification";

/**
 * contest_idで発送通知一覧を取得するフック
 */
export function useGetShippingNotifications(contestId: string) {
  return useQuery({
    queryKey: ["shippingNotifications", contestId],
    queryFn: () => getShippingSampleNotificationsByContestId(contestId),
    enabled: !!contestId,
  });
}

/**
 * application_idで発送通知を取得するフック
 */
export function useGetShippingNotification(applicationId: string) {
  return useQuery({
    queryKey: ["shippingNotification", applicationId],
    queryFn: () => getShippingSampleNotificationByApplicationId(applicationId),
    enabled: !!applicationId,
  });
}

/**
 * 発送通知を作成するフック
 */
export function useCreateShippingNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ShippingSampleNotificationCreate) =>
      createShippingSampleNotification(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["shippingNotifications", variables.contest_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["shippingNotification", variables.application_id],
      });
    },
  });
}

/**
 * 発送通知を更新するフック
 */
export function useUpdateShippingNotification(
  contestId: string,
  applicationId: string,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: ShippingSampleNotificationUpdate;
    }) => updateShippingSampleNotification(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shippingNotifications", contestId],
      });
      queryClient.invalidateQueries({
        queryKey: ["shippingNotification", applicationId],
      });
    },
  });
}
