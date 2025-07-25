import { useMutation } from '@tanstack/react-query';
import { signIn } from '@/services/userService';

export function useSignIn() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => signIn(email, password),
    // onError でトースト表示したり、画面にメッセージを出したりできます
    onError: (error: Error) => {
      alert(`ログインに失敗しました：${error.message}`);
    },
  });
}
