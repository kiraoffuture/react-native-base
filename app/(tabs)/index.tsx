import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable } from "react-native";
import Toast from "react-native-toast-message";

import { Sentry } from "@/bootstrap/sentry";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuthStore } from "@/stores/auth.store";

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

  return (
    <ThemedView className="flex-1 items-center justify-center px-5">
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
    </ThemedView>
  );
}
