import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://demo5771170.mockable.io",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
});
