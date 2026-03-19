import {
  getAnalytics,
  setAnalyticsCollectionEnabled,
} from "@react-native-firebase/analytics";
import {
  getCrashlytics,
  setCrashlyticsCollectionEnabled,
} from "@react-native-firebase/crashlytics";

export async function initFirebase() {
  try {
    const analytics = getAnalytics();
    const crashlytics = getCrashlytics();
    await setAnalyticsCollectionEnabled(analytics, true);
    await setCrashlyticsCollectionEnabled(crashlytics, true);
  } catch (e) {
    if (__DEV__) {
      console.warn("[Firebase] Failed to initialize Analytics/Crashlytics.", e);
    }
  }
}
