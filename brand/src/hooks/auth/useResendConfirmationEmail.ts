import { useMutation } from "@tanstack/react-query";
import { resendConfirmationEmail } from "@/services/userService";

export function useResendConfirmationEmail() {
  return useMutation({
    mutationFn: (email: string) => resendConfirmationEmail(email),
  });
}
