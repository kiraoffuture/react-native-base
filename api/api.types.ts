export interface ApiErrorResponse {
  message?: string;
}

export interface ApiResponse<T> {
  data: T;
}
