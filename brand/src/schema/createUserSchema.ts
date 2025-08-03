import * as yup from "yup";

export const createUserSchema = yup.object().shape({
  first_name: yup.string().required("苗字を入力してください"),
  last_name: yup.string().required("名前を入力してください"),
  email: yup.string().email().required("メールアドレスを入力してください"),
  password: yup
    .string()
    .min(6, "パスワードは6文字以上で入力してください")
    .required("パスワードを入力してください"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "パスワードが一致しません")
    .required("パスワードを再入力してください"),
});
