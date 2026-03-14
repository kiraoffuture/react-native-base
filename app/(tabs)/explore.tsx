import React from "react";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function TabTwoScreen() {
  return (
    <ThemedView className="flex-1 items-center justify-center px-5">
      <ThemedText type="title">Explore</ThemedText>
    </ThemedView>
  );
}
