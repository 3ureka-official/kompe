import * as yup from "yup";

export const brandFormSchema = yup.object().shape({
  name: yup.string().required("ブランド名を入力してください"),

  website: yup.string().url("正しいURLを入力してください").default(""),

  description: yup
    .string()
    .max(240, "ブランド紹介は240文字以内で入力してください")
    .default(""),

  tiktok_username: yup.string().default(""),

  instagram_url: yup.string().default("").url("正しいURLを入力してください"),
});

export type BrandFormType = yup.InferType<typeof brandFormSchema>;
