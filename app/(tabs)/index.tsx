import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuthStore } from "@/stores/auth.store";

export default function HomeScreen() {
  const clear = useAuthStore((store) => store.clear);

  function onLogout() {
    clear();
    router.replace("/(auth)");
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Home</ThemedText>
      <Pressable style={styles.logoutButton} onPress={onLogout}>
        <ThemedText type="defaultSemiBold" style={styles.logoutText}>
          Logout
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logoutButton: {
    marginTop: 24,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#ff4d4f",
  },
  logoutText: {
    color: "#fff",
  },
});
