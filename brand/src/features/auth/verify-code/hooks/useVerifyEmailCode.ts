import { useMutation } from "@tanstack/react-query";
import { verifyEmailCode } from "@/services/supabase/userService";

export function useVerifyEmailCode() {
  return useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      verifyEmailCode(email, code),
  });
}
