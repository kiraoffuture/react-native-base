import { useMutation } from "@tanstack/react-query";

import { login } from "@/api/auth/auth.api";
import type { LoginRequest, LoginResponse } from "@/api/auth/auth.types";

export function useLoginMutation() {
  return useMutation<LoginResponse, unknown, LoginRequest>({
    mutationFn: login,
  });
}
