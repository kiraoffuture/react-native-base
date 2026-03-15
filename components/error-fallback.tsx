import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export function ErrorFallback() {
  const { t } = useTranslation();
  return (
    <View className="flex-1 items-center justify-center bg-white p-5 dark:bg-black">
      <Text className="text-center text-black dark:text-white">
        {t("error.fallback")}
      </Text>
    </View>
  );
}
