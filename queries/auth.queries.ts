import { useMutation } from "@tanstack/react-query";

import { login } from "@/api/auth/auth.api";
import type { LoginRequest, LoginResponse } from "@/api/auth/auth.types";
import { useAuthStore } from "@/stores/auth.store";

export function useLoginMutation() {
  const setToken = useAuthStore((s) => s.setToken);

  return useMutation<LoginResponse, unknown, LoginRequest>({
    mutationFn: login,
    onSuccess: (data) => {
      setToken(data.data);
    },
  });
}
