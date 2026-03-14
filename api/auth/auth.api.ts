import { useMemo } from "react";

import type { LoginRequest, LoginResponse } from "@/api/auth/auth.types";
import { request } from "@/api/utils";

export function useAuthAPI() {
  return useMemo(
    () => ({
      login: (input: LoginRequest) =>
        request<LoginResponse>({
          url: "/auth/login",
          method: "POST",
          data: input,
        }),
    }),
    [],
  );
}
