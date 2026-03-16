import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

import ENV from "@/config/env";

function shouldLog() {
  return __DEV__ || ENV.APP_ENV !== "product";
}

function nowMs() {
  return Date.now();
}

function formatUrl(config: AxiosRequestConfig) {
  const baseURL = config.baseURL ?? "";
  const url = config.url ?? "";
  if (!baseURL) return url;
  if (!url) return baseURL;
  return `${String(baseURL).replace(/\/$/, "")}/${String(url).replace(/^\//, "")}`;
}

function uppercaseMethod(method?: string) {
  return (method ?? "GET").toUpperCase();
}

function metaStart(config: AxiosRequestConfig) {
  (config as any).metadata = { startTimeMs: nowMs() };
}

function metaDurationMs(config: AxiosRequestConfig) {
  const startTimeMs = (config as any)?.metadata?.startTimeMs as
    | number
    | undefined;
  return startTimeMs ? nowMs() - startTimeMs : undefined;
}

function logRequest(prefix: string, config: AxiosRequestConfig) {
  const method = uppercaseMethod(config.method);
  const fullUrl = formatUrl(config);

  const message = `${prefix} → ${method} ${fullUrl}`;
  const details = {
    headers: config.headers,
    params: config.params,
    data: config.data,
  };

  console.groupCollapsed?.(message);
  console.log(details);
  console.groupEnd?.();
}

function logResponse(prefix: string, response: AxiosResponse) {
  const config = response.config ?? ({} as AxiosRequestConfig);
  const method = uppercaseMethod(config.method);
  const fullUrl = formatUrl(config);
  const durationMs = metaDurationMs(config);

  const message = `${prefix} ← ${response.status} ${method} ${fullUrl}${
    durationMs != null ? ` (${durationMs}ms)` : ""
  }`;

  const details = {
    headers: response.headers,
    data: response.data,
  };

  console.groupCollapsed?.(message);
  console.log(details);
  console.groupEnd?.();
}

function logError(prefix: string, error: AxiosError) {
  const config = error.config ?? ({} as AxiosRequestConfig);
  const method = uppercaseMethod(config.method);
  const fullUrl = formatUrl(config);
  const durationMs = metaDurationMs(config);
  const status = error.response?.status;

  const message = `${prefix} ← ${status ?? "ERR"} ${method} ${fullUrl}${
    durationMs != null ? ` (${durationMs}ms)` : ""
  }`;

  const details = {
    message: error.message,
    responseHeaders: error.response?.headers,
    responseData: error.response?.data,
  };

  console.groupCollapsed?.(message);
  console.log(details);
  console.groupEnd?.();
}

export function attachApiLogger(client: AxiosInstance) {
  if (!shouldLog()) return;

  const prefix = `[Api][${ENV.APP_ENV}]`;

  client.interceptors.request.use(
    (config) => {
      metaStart(config);
      logRequest(prefix, config);
      return config;
    },
    (error: AxiosError) => {
      logError(prefix, error);
      return Promise.reject(error);
    },
  );

  client.interceptors.response.use(
    (response) => {
      logResponse(prefix, response);
      return response;
    },
    (error: AxiosError) => {
      logError(prefix, error);
      return Promise.reject(error);
    },
  );
}
