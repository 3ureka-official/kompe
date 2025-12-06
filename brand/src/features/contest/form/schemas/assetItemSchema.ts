import * as yup from "yup";

export const assetItemSchema = yup.object().shape({
  id: yup.string().default(""),
  url: yup
    .string()
    .url("URL 形式で入力してください")
    .default("")
    .required("URL を入力してください"),
  description: yup.string().default("").required("説明を入力してください"),
});

export type AssetItemFormData = yup.InferType<typeof assetItemSchema>;
