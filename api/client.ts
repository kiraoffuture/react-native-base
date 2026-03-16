import axios from "axios";

import { attachApiLogger } from "@/api/api-logger";
import ENV from "@/config/env";

export const apiClient = axios.create({
  baseURL: ENV.SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
});

attachApiLogger(apiClient);
