import { createMMKV } from "react-native-mmkv";

const storage = createMMKV();

export const zustandStorage = {
  setItem: (name: string, value: string) => {
    storage.set(name, value);
  },
  getItem: (name: string) => {
    return storage.getString(name) ?? null;
  },
  removeItem: (name: string) => {
    storage.remove(name);
  },
};
