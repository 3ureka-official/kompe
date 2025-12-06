import * as yup from "yup";

export const briefSchema = yup.object().shape({
  description: yup.string().default("").required("説明を入力してください"),
  requirements: yup
    .string()
    .default("")
    .required("動画の条件を入力してください"),
});
