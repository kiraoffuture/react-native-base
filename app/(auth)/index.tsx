import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import { ApiError } from "@/api/api-error";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useLoginMutation } from "@/queries/auth.queries";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty("Please enter your email")
    .email("Invalid email address"),
  password: z
    .string()
    .nonempty("Please enter your password")
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  const passwordInputRef = useRef<TextInput | null>(null);
  const loginMutation = useLoginMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitError =
    loginMutation.error instanceof ApiError ? loginMutation.error.message : "";

  const canSubmit = !loginMutation.isPending && !isSubmitting && isValid;

  function onSubmit(values: LoginFormValues) {
    loginMutation.mutate(
      { email: values.email.trim(), password: values.password },
      {
        onSuccess: () => {
          router.replace("/(tabs)");
        },
      },
    );
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
            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="you@example.com"
                  placeholderTextColor={colors.icon}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                  style={[
                    styles.input,
                    {
                      color: colors.text,
                      borderColor: errors.email
                        ? colors.error
                        : colors.tabIconDefault,
                    },
                  ]}
                />
              )}
            />
            {!!errors.email && (
              <ThemedText style={[styles.error, { color: colors.error }]}>
                {errors.email.message}
              </ThemedText>
            )}
          </View>

          <View style={styles.field}>
            <ThemedText type="defaultSemiBold">Password</ThemedText>
            <Controller
              control={control}
              name="password"
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  ref={passwordInputRef}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="••••••"
                  placeholderTextColor={colors.icon}
                  secureTextEntry
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit(onSubmit)}
                  style={[
                    styles.input,
                    {
                      color: colors.text,
                      borderColor: errors.password
                        ? colors.error
                        : colors.tabIconDefault,
                    },
                  ]}
                />
              )}
            />
            {!!errors.password && (
              <ThemedText style={[styles.error, { color: colors.error }]}>
                {errors.password.message}
              </ThemedText>
            )}
          </View>

          {!!submitError && (
            <ThemedText
              style={[
                styles.error,
                styles.submitError,
                { color: colors.error },
              ]}
            >
              {submitError}
            </ThemedText>
          )}

          <Pressable
            accessibilityRole="button"
            onPress={handleSubmit(onSubmit)}
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
              {loginMutation.isPending || isSubmitting
                ? "Signing in…"
                : "Sign in"}
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
  submitError: {
    marginTop: 4,
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
