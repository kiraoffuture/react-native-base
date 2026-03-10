import type { ApiResponse } from "@/api/api.types";

export interface LoginRequest {
  email: string;
  password: string;
}

export type LoginResponse = ApiResponse<string>;
