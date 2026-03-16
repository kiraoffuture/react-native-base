import axios from "axios";

import ENV from "@/config/env";

export const apiClient = axios.create({
  baseURL: ENV.SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
});
