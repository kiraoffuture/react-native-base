import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { zustandStorage } from "./persist.storage";

interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      clear: () => set({ token: null }),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({ token: state.token }),
    },
  ),
);
