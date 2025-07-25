import { useMutation } from '@tanstack/react-query';
import { signUp } from '@/services/userService';

export function useSignUp() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => signUp(email, password),
    // onError でトースト表示したり、画面にメッセージを出したりできます
    onError: (error: Error) => {
      alert(`ログインに失敗しました：${error.message}`);
    },
  });
}
