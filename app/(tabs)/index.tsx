import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";
import Toast from "react-native-toast-message";

import { Sentry } from "@/bootstrap/sentry";
import { Image } from "@/components/image";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuthStore } from "@/stores/auth.store";
import { crash, getCrashlytics, log } from "@react-native-firebase/crashlytics";

const LARGE_IMAGE_URL =
  "https://floatingworld.com/wp-content/uploads/2023/02/Sample-jpg-image-30mb-16.jpg";

export default function HomeScreen() {
  const { clearAuth } = useAuthStore();
  const { t } = useTranslation();

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
      <ThemedText type="title">{t("home.title")}</ThemedText>
      <View className="mt-3 h-[180px] w-full overflow-hidden rounded-2xl">
        <Image
          source={{
            uri: LARGE_IMAGE_URL,
          }}
          contentFit="cover"
          transition={300}
          height={180}
        />
      </View>
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
    </ThemedView>
  );
}
