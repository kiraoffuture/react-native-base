import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";
import Toast from "react-native-toast-message";

import { Sentry } from "@/bootstrap/sentry";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/stores/auth.store";
import { crash, getCrashlytics, log } from "@react-native-firebase/crashlytics";

export default function HomeScreen() {
  const { clearAuth } = useAuthStore();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(id);
  }, []);

  function onLogout() {
    clearAuth();
    router.replace("/(auth)");
  }

  function onTestSentry() {
    Sentry.captureException(new Error("First error"));
    Toast.show({
      type: "success",
      text1: t("home.testSentryToast"),
    });
  }

  function onTestCrashlytics() {
    const crashlytics = getCrashlytics();
    log(crashlytics, "Test crash from home screen button");
    crash(crashlytics);
    Toast.show({
      type: "success",
      text1: t("home.testCrashlyticsToast"),
    });
  }

  return (
    <ThemedView className="flex-1 items-center justify-center px-5">
      {loading ? (
        <View className="w-full max-w-md gap-3">
          <Skeleton height={24} radius={12} />
          <Skeleton height={14} width="75%" />
          <Skeleton height={14} width="90%" />
          <Skeleton height={14} width="60%" />
        </View>
      ) : (
        <>
          <ThemedText type="title">{t("home.title")}</ThemedText>
          <Pressable
            className="mt-6 rounded-xl bg-red-500 px-5 py-2.5"
            onPress={onLogout}
          >
            <ThemedText type="defaultSemiBold" className="text-white">
              {t("home.logout")}
            </ThemedText>
          </Pressable>
          <Pressable
            className="mt-6 rounded-xl bg-red-500 px-5 py-2.5"
            onPress={onTestSentry}
          >
            <ThemedText type="defaultSemiBold" className="text-white">
              {t("home.testSentry")}
            </ThemedText>
          </Pressable>
          <Pressable
            className="mt-6 rounded-xl bg-red-500 px-5 py-2.5"
            onPress={onTestCrashlytics}
          >
            <ThemedText type="defaultSemiBold" className="text-white">
              {t("home.testCrashlytics")}
            </ThemedText>
          </Pressable>
        </>
      )}
    </ThemedView>
  );
}
