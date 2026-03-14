import React from "react";
import { useTranslation } from "react-i18next";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function TabTwoScreen() {
  const { t } = useTranslation();
  return (
    <ThemedView className="flex-1 items-center justify-center px-5">
      <ThemedText type="title">{t("explore.title")}</ThemedText>
    </ThemedView>
  );
}
