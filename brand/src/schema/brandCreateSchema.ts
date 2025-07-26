import * as yup from 'yup';

export const brandCreateSchema = yup.object().shape({
  email: yup
    .string()
    .email('正しいメールアドレスを入力してください')
    .required('ブランドメールアドレスを入力してください'),
  
  name: yup
    .string()
    .required('ブランド名を入力してください'),
  
  phonenumber: yup
    .string()
    .matches(/^[+]?[0-9\s\-\(\)]+$/, '正しい電話番号を入力してください')
    .required('電話番号を入力してください'),
  
  website: yup
    .string()
    .url('正しいURLを入力してください')
    .required('ブランドウェブサイトを入力してください'),
  
  description: yup
    .string()
    .max(240, 'ブランド紹介は240文字以内で入力してください')
    .required('ブランド紹介を入力してください'),
  
  tiktok_username: yup
    .string()
    .default(''), // デフォルト値を設定
  
  instagram_url: yup
    .string()
    .default('') // デフォルト値を設定
    .test('url-optional', '正しいURLを入力してください', function(value) {
      if (!value || value.length === 0) {
        return true; // 空の場合はOK
      }
      return yup.string().url().isValidSync(value);
    }),
});