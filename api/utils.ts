import type { AxiosError, AxiosRequestConfig } from "axios";

import { ApiError } from "./api-error";
import type { ApiErrorResponse } from "./api.types";
import { apiClient } from "./client";

export const ApiErrorMessage = {
  DEFAULT: "Something went wrong!",
} as const;

export async function request<TResponse>(
  config: AxiosRequestConfig,
): Promise<TResponse> {
  try {
    const response = await apiClient.request<TResponse>(config);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const statusCode = axiosError.response?.status;
    const message =
      axiosError.response?.data?.message || ApiErrorMessage.DEFAULT;

    throw new ApiError(message, statusCode);
  }
}
