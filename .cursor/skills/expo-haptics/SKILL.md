---
name: expo-haptics
description: Documents how this repo uses expo-haptics for tactile feedback. Use when changing tap/press interactions that should include haptics.
---

# Expo Haptics Conventions

## Usage in this repo

- `components/haptic-tab.tsx` defines `HapticTab`, which triggers haptic feedback on `onPressIn`.
- Haptics are only fired under iOS via the `process.env.EXPO_OS === "ios"` check.

## How to extend

- Prefer keeping haptics logic in a small component wrapper (like `HapticTab`) rather than sprinkling `impactAsync` across screens.
- Use consistent haptic styles (repo currently uses `Haptics.ImpactFeedbackStyle.Light`).

## Concrete references

- `components/haptic-tab.tsx`
