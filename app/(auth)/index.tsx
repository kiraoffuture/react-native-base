import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
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
    <ThemedView className="flex-1 px-5">
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: undefined })}
        className="flex-1 justify-center"
      >
        <View className="mb-4 gap-2">
          <ThemedText type="title" className="leading-9">
            Sign in
          </ThemedText>
          <ThemedText className="text-sm" style={{ color: colors.icon }}>
            Enter your email and password to continue.
          </ThemedText>
        </View>

        <View className="gap-3.5">
          <View className="gap-2">
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
                  className="rounded-xl border px-3.5 py-4"
                  style={{
                    color: colors.text,
                    borderColor: errors.email
                      ? colors.error
                      : colors.tabIconDefault,
                  }}
                />
              )}
            />
            {!!errors.email && (
              <ThemedText
                className="text-xs leading-4"
                style={{ color: colors.error }}
              >
                {errors.email.message}
              </ThemedText>
            )}
          </View>

          <View className="gap-2">
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
                  className="rounded-xl border px-3.5 py-4"
                  style={{
                    color: colors.text,
                    borderColor: errors.password
                      ? colors.error
                      : colors.tabIconDefault,
                  }}
                />
              )}
            />
            {!!errors.password && (
              <ThemedText
                className="text-xs leading-4"
                style={{ color: colors.error }}
              >
                {errors.password.message}
              </ThemedText>
            )}
          </View>

          {!!submitError && (
            <ThemedText
              className="mt-1 text-center text-xs leading-4"
              style={{ color: colors.error }}
            >
              {submitError}
            </ThemedText>
          )}

          <View
            className="mt-2 overflow-hidden rounded-xl"
            style={{
              backgroundColor: colors.tint,
              opacity: !canSubmit ? 0.5 : 1,
            }}
          >
            <Pressable
              accessibilityRole="button"
              onPress={handleSubmit(onSubmit)}
              disabled={!canSubmit}
              className="py-3.5 items-center justify-center"
            >
              <ThemedText
                type="defaultSemiBold"
                className="text-base leading-5 text-white"
                lightColor="white"
                darkColor="white"
              >
                {loginMutation.isPending || isSubmitting
                  ? "Signing in…"
                  : "Sign in"}
              </ThemedText>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}
