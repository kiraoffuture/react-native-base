import * as Sentry from "@sentry/react-native";

const SENTRY_DSN = process.env.EXPO_PUBLIC_SENTRY_DSN;

export function initSentry() {
  if (!SENTRY_DSN) {
    if (__DEV__) {
      console.warn(
        "[Sentry] EXPO_PUBLIC_SENTRY_DSN is not set. Skipping Sentry initialization.",
      );
    }
    return;
  }

  Sentry.init({
    dsn: SENTRY_DSN,
    enableAutoSessionTracking: true,
    sessionTrackingIntervalMillis: 30000,
    environment: __DEV__ ? "development" : "production",
    tracesSampleRate: __DEV__ ? 0 : 0.2,
    attachStacktrace: true,
    maxBreadcrumbs: 50,
  });
}

export { Sentry };
