import * as yup from "yup";

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
