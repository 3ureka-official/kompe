/**
 * サンプル発送通知の型定義
 */
export type ShippingSampleNotification = {
  id: string;
  application_id: string;
  contest_id: string;
  brand_id: string;
  tracking_number: string;
  carrier: string;
  message: string;
  status: "pending" | "shipped" | "delivered";
  created_at: string | Date;
};

export type ShippingSampleNotificationCreate = Omit<
  ShippingSampleNotification,
  "id" | "created_at"
> & {
  status?: "pending" | "shipped" | "delivered";
};

export type ShippingSampleNotificationUpdate = Partial<
  Omit<
    ShippingSampleNotification,
    "id" | "created_at" | "application_id" | "contest_id" | "brand_id"
  >
>;
