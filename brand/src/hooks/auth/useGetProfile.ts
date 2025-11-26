import { useMutation } from "@tanstack/react-query";
import { getProfile } from "@/services/userService";

export function useGetProfile() {
  return useMutation({
    mutationFn: (userId: string) => getProfile(userId),
  });
}
