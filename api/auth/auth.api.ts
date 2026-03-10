import { LoginRequest, LoginResponse } from "@/api/auth/auth.types";

import { request } from "../utils";

export async function login(input: LoginRequest) {
  return request<LoginResponse>({
    url: "/auth/login",
    method: "POST",
    data: input,
  });
}
