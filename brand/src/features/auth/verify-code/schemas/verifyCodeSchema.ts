import * as yup from "yup";

export type VerifyCodeFormData = {
  code: string;
};

export const verifyCodeSchema = yup.object().shape({
  code: yup
    .string()
    .required("コードを入力してください")
    .length(6, "コードは6桁で入力してください")
    .matches(/^\d{6}$/, "コードは数字6桁で入力してください"),
});

export const verifyCodeFormDefaultValues: VerifyCodeFormData = {
  code: "",
};
