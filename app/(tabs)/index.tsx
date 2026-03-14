import { router } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import { useTranslation } from "react-i18next";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuthStore } from "@/stores/auth.store";

export default function HomeScreen() {
  const { clear } = useAuthStore();
  const { t } = useTranslation();

  function onLogout() {
    clear();
    router.replace("/(auth)");
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
    </ThemedView>
  );
}
