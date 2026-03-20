---
name: expo-fonts
description: Documents any font loading conventions in this Expo app. Use when adding custom fonts or modifying typography loading behavior.
---

# Fonts: expo-font

## Current status

- `expo-font` is included as a dependency.
- The current repo screens use text styles from `constants/theme.ts` and `ThemedText` without custom font loading logic.

## How to integrate (when needed)

- Prefer centralizing font-loading logic in a bootstrap/init area (if the app later adds it).
- Keep font selection consistent with `Fonts` tokens in `constants/theme.ts`.

## Concrete references

- `constants/theme.ts` (`Fonts`)
- `ThemedText` (`components/themed-text.tsx`)
