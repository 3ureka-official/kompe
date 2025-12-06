import * as yup from "yup";

export const shippingNotificationSchema = yup.object().shape({
  tracking_number: yup.string().default("").required("追跡番号は必須です"),
  carrier: yup.string().default("").required("配送業者は必須です"),
  message: yup
    .string()
    .default(
      "応募いただきありがとうございます。\nサンプルを発送いたしました。\nどうぞよろしくお確認します。",
    )
    .required("備考は必須です"),
});

export type ShippingNotificationFormData = yup.InferType<
  typeof shippingNotificationSchema
>;
