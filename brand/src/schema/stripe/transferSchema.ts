import * as yup from "yup";

export const transferSchema = yup.object({
  applicationId: yup.string().uuid("applicationId must be UUID").required(),
  creatorId: yup.string().uuid("creatorId must be UUID").required(),
  amountJpy: yup
    .number()
    .typeError("amountJpy must be a number")
    .integer("amountJpy must be integer")
    .positive("amountJpy must be positive")
    .required(),
  description: yup.string().max(255).optional(),
});
