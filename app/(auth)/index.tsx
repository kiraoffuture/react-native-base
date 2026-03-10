import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

interface TouchedFields {
  email: boolean;
  password: boolean;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function LoginScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState<TouchedFields>({
    email: false,
    password: false,
  });
  const [submitting, setSubmitting] = useState(false);

  const emailError = useMemo(() => {
    if (!touched.email) return "";
    if (!email.trim()) return "Please enter your email";
    if (!isValidEmail(email)) return "Invalid email address";
    return "";
  }, [email, touched.email]);

  const passwordError = useMemo(() => {
    if (!touched.password) return "";
    if (!password) return "Please enter your password";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  }, [password, touched.password]);

  const canSubmit =
    !emailError &&
    !passwordError &&
    email.trim() &&
    password.length >= 6 &&
    !submitting;

  async function onSubmit() {
    setTouched({ email: true, password: true });
    if (!canSubmit) return;

    setSubmitting(true);
    try {
      // Demo: simulate an API call
      await new Promise((r) => setTimeout(r, 600));
      router.replace("/(tabs)");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ThemedView style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: undefined })}
        style={styles.keyboard}
      >
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            Sign in
          </ThemedText>
          <ThemedText style={{ color: colors.icon }}>
            Enter your email and password to continue.
          </ThemedText>
        </View>

        <View style={styles.form}>
          <View style={styles.field}>
            <ThemedText type="defaultSemiBold">Email</ThemedText>
            <TextInput
              value={email}
              onChangeText={setEmail}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              placeholder="you@example.com"
              placeholderTextColor={colors.icon}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              style={[
                styles.input,
                {
                  color: colors.text,
                  borderColor: emailError ? "#ff4d4f" : colors.tabIconDefault,
                },
              ]}
            />
            {!!emailError && (
              <ThemedText style={[styles.error, { color: "#ff4d4f" }]}>
                {emailError}
              </ThemedText>
            )}
          </View>

          <View style={styles.field}>
            <ThemedText type="defaultSemiBold">Password</ThemedText>
            <TextInput
              value={password}
              onChangeText={setPassword}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
              placeholder="••••••"
              placeholderTextColor={colors.icon}
              secureTextEntry
              returnKeyType="done"
              onSubmitEditing={onSubmit}
              style={[
                styles.input,
                {
                  color: colors.text,
                  borderColor: passwordError
                    ? "#ff4d4f"
                    : colors.tabIconDefault,
                },
              ]}
            />
            {!!passwordError && (
              <ThemedText style={[styles.error, { color: "#ff4d4f" }]}>
                {passwordError}
              </ThemedText>
            )}
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={onSubmit}
            disabled={!canSubmit}
            style={({ pressed }) => [
              styles.button,
              {
                backgroundColor: colors.tint,
                opacity: !canSubmit ? 0.5 : pressed ? 0.8 : 1,
              },
            ]}
          >
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>
              {submitting ? "Signing in…" : "Sign in"}
            </ThemedText>
          </Pressable>

          <Pressable onPress={() => router.back()} style={styles.secondary}>
            <ThemedText type="link">Back</ThemedText>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  keyboard: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    gap: 10,
    marginBottom: 18,
  },
  title: {
    lineHeight: 36,
  },
  form: {
    gap: 14,
  },
  field: {
    gap: 8,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  error: {
    fontSize: 13,
    lineHeight: 18,
  },
  button: {
    marginTop: 8,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 20,
  },
  secondary: {
    paddingVertical: 10,
    alignItems: "center",
  },
});
