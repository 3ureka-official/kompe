import { useMutation } from "@tanstack/react-query";
import { getProfile } from "@/services/supabase/userService";
import { User } from "@/types/User";

export function useGetProfile() {
  return useMutation({
    mutationFn: (userId: string): Promise<User | null> => getProfile(userId),
  });
}
