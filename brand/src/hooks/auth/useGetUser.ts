import { useMutation } from "@tanstack/react-query";
import { getAuthUser } from "@/services/userService";

export function useGetUser() {
  return useMutation({
    mutationFn: () => getAuthUser(),
  });
}
