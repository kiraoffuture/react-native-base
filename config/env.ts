import Constants from "expo-constants";

type Env = {
  SERVER_URL?: string;
  APP_ENV?: string;
  APP_NAME?: string;
};

const env: Env | undefined = Constants.expoConfig?.extra;

export default {
  SERVER_URL: env?.SERVER_URL ?? "",
  APP_ENV: env?.APP_ENV ?? "develop",
  APP_NAME: env?.APP_NAME ?? "react-native-base",
};
