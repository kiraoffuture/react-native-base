import { useMutation } from "@tanstack/react-query";

import { useAuthAPI } from "@/api/auth/auth.api";
import type { LoginRequest, LoginResponse } from "@/api/auth/auth.types";
import { useAuthStore } from "@/stores/auth.store";

export function useLoginMutation() {
  const { login } = useAuthAPI();
  const { setToken } = useAuthStore();

  return useMutation<LoginResponse, unknown, LoginRequest>({
    mutationFn: login,
    onSuccess: (data) => {
      setToken(data.data);
    },
  });
}
