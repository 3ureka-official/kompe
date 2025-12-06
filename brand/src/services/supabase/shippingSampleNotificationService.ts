import { supabase } from "@/lib/supabase";
import {
  ShippingSampleNotification,
  ShippingSampleNotificationCreate,
  ShippingSampleNotificationUpdate,
} from "@/types/ShippingSampleNotification";

/**
 * 発送通知を作成
 */
export const createShippingSampleNotification = async (
  data: ShippingSampleNotificationCreate,
): Promise<ShippingSampleNotification> => {
  const notificationData = {
    ...data,
    status: data.status || "pending",
  };

  const { data: notification, error } = await supabase
    .from("shipping_sample_notifications")
    .insert(notificationData)
    .select()
    .single();

  if (error) {
    throw new Error(`発送通知の作成に失敗しました: ${error.message}`);
  }

  return notification;
};

/**
 * application_idで発送通知を取得
 */
export const getShippingSampleNotificationByApplicationId = async (
  applicationId: string,
): Promise<ShippingSampleNotification | null> => {
  const { data: notification, error } = await supabase
    .from("shipping_sample_notifications")
    .select("*")
    .eq("application_id", applicationId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // レコードが見つからない場合
      return null;
    }
    throw new Error(`発送通知の取得に失敗しました: ${error.message}`);
  }

  return notification;
};

/**
 * contest_idで発送通知一覧を取得
 */
export const getShippingSampleNotificationsByContestId = async (
  contestId: string,
): Promise<ShippingSampleNotification[]> => {
  const { data: notifications, error } = await supabase
    .from("shipping_sample_notifications")
    .select("*")
    .eq("contest_id", contestId);

  if (error) {
    throw new Error(`発送通知の取得に失敗しました: ${error.message}`);
  }

  return notifications || [];
};

/**
 * 発送通知を更新
 */
export const updateShippingSampleNotification = async (
  id: string,
  data: ShippingSampleNotificationUpdate,
): Promise<ShippingSampleNotification> => {
  const { data: notification, error } = await supabase
    .from("shipping_sample_notifications")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`発送通知の更新に失敗しました: ${error.message}`);
  }

  return notification;
};

/**
 * 発送通知を削除
 */
export const deleteShippingSampleNotification = async (
  id: string,
): Promise<void> => {
  const { error } = await supabase
    .from("shipping_sample_notifications")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(`発送通知の削除に失敗しました: ${error.message}`);
  }
};
