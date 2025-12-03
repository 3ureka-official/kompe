import * as yup from "yup";

export type SignupFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const createUserSchema = yup.object().shape({
  email: yup
    .string()
    .email("メールアドレスの形式が正しくありません")
    .required("メールアドレスを入力してください"),
  password: yup
    .string()
    .min(6, "パスワードは6文字以上で入力してください")
    .required("パスワードを入力してください"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "パスワードが一致しません")
    .required("パスワードを再入力してください"),
});

export const signupFormDefaultValues: SignupFormData = {
  email: "",
  password: "",
  confirmPassword: "",
};
