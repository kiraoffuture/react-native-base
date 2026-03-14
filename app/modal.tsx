import { Link, Stack } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function ModalScreen() {
  const { t } = useTranslation();
  return (
    <ThemedView className="flex-1 items-center justify-center px-5">
      <Stack.Screen options={{ title: t("modal.headerTitle") }} />
      <ThemedText type="title">{t("modal.title")}</ThemedText>
      <Link href="/" dismissTo className="mt-4 py-4">
        <ThemedText type="link">{t("modal.goHome")}</ThemedText>
      </Link>
    </ThemedView>
  );
}
