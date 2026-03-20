---
name: react-navigation-native-theme
description: Explains how this repo uses @react-navigation/native for theming (ThemeProvider) and how it impacts screen-level UI. Use when modifying theme behavior.
---

# Theming: @react-navigation/native ThemeProvider

## Where theming is set

- `app/_layout.tsx` imports `DarkTheme` / `DefaultTheme` from `@react-navigation/native`.
- It chooses a theme based on `useColorScheme()`:
  - `ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}`

## Why this matters

- Themed primitives (`ThemedView`, `ThemedText`) rely on the repo’s `useThemeColor` hook and `constants/theme.ts` tokens, not directly on react-navigation theme objects.
- However, the root ThemeProvider and `userInterfaceStyle` interact with overall dark mode behavior.

## Concrete references

- `app/_layout.tsx`
- `constants/theme.ts`
- `hooks/use-color-scheme.ts`
- `hooks/use-theme-color.ts`
