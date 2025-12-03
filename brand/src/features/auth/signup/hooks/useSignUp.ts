import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/services/supabase/userService";

export function useSignUp() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signUp(email, password),
  });
}
