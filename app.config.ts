/* eslint-env node */
/* eslint-disable @typescript-eslint/no-require-imports */
import type { ExpoConfig } from "expo/config";

const path = require("path") as typeof import("path");
const fs = require("fs") as typeof import("fs");
const loadEnv = require("dotenv").config as (options: { path: string }) => void;

const envName = process.env.APP_ENV || "develop";
const envPath = path.resolve(__dirname, `.env.${envName}`);

if (!fs.existsSync(envPath)) {
  console.warn(
    `[app.config] Missing env file: ${envPath} — create from .env.example`,
  );
} else {
  loadEnv({ path: envPath });
}

const appName = process.env.APP_NAME || "react-native-base";
const appId = process.env.APP_ID || "com.kira.reactnativebase";
const serverUrl = process.env.SERVER_URL ?? "";
const serverDomain = process.env.SERVER_DOMAIN ?? "";
const appVersion = process.env.APP_VERSION || "1.0.0";
const buildNumber = process.env.APP_BUILD_NUMBER || "1";

const config: ExpoConfig = {
  name: "react-native-base",
  slug: `reactnativebase-${envName}`,
  version: appVersion,
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: `reactnativebase-${envName}`,
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: appId,
    buildNumber,
    googleServicesFile: `./config/firebase/${envName}/GoogleService-Info.plist`,
    infoPlist: {
      CFBundleDisplayName: appName,
    },
  },
  android: {
    package: appId,
    versionCode: parseInt(buildNumber, 10),
    googleServicesFile: `./config/firebase/${envName}/google-services.json`,
    adaptiveIcon: {
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
  },
  web: {
    output: "static",
    favicon: "./assets/images/favicon.png",
    bundler: "metro",
  },
  plugins: [
    "expo-router",
    "@react-native-firebase/app",
    "@react-native-firebase/crashlytics",
    [
      "expo-build-properties",
      {
        ios: {
          useFrameworks: "static",
          forceStaticLinking: ["RNFBApp", "RNFBCrashlytics", "RNFBAnalytics"],
        },
      },
    ],
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
        dark: {
          backgroundColor: "#000000",
        },
      },
    ],
    [
      "@sentry/react-native/expo",
      {
        url: "https://sentry.io/",
        project: "react-native-base",
        organization: "kiraoffuture",
      },
    ],
    [
      "./plugins/withAndroidScheme",
      {
        scheme: `reactnativebase-${envName}`,
        expoScheme: `exp+reactnativebase-${envName}`,
      },
    ],
    [
      "./plugins/withAndroidAppName",
      {
        appName,
      },
    ],
    [
      "./plugins/withAndroidNetworkSecurity",
      {
        domain: serverDomain,
        certResourceName: "gandicert",
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    SERVER_URL: serverUrl,
    APP_ENV: envName,
    APP_NAME: appName,
  },
};

module.exports = config;
