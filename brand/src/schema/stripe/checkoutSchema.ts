import * as yup from "yup";

export const checkoutSchema = yup
  .object({
    amountJpy: yup
      .number()
      .typeError("amountJpy は数値で指定してください")
      .integer("amountJpy は整数で指定してください")
      .positive("amountJpy は正の値で指定してください")
      .required("amountJpy は必須です"),
  })
  .required();

export type CheckoutInput = yup.InferType<typeof checkoutSchema>;
