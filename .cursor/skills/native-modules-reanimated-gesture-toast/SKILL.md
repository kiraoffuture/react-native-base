---
name: native-modules-reanimated-gesture-toast
description: Captures conventions for native modules that must be set up at runtime: reanimated import, gesture/haptics UI patterns, and toast messaging. Use when changing interactive UI, haptics, or notification UX.
---

# Native Modules: Reanimated, Gestures, Haptics, Toast

## Reanimated setup

- `app/_layout.tsx` imports `react-native-reanimated` to ensure reanimated is initialized.
- If additional reanimated usage is added, it should follow this repo’s pattern and build setup.

## Haptics / tab interactions

- `components/haptic-tab.tsx` provides a `HapticTab` that triggers `expo-haptics` on iOS (using `PlatformPressable`).
- Tabs use this as `tabBarButton`.

## Toast messaging

- Toast UI is configured in `app/_layout.tsx` using `react-native-toast-message`.
- Screens call `Toast.show({ type, text1, ... })` to display messages.

## Modals and presentation

- Modals are declared as separate routes (see `app/modal.tsx`).
- Presentation is configured in the root stack (`app/_layout.tsx`) with `presentation: "modal"`.

## Concrete references

- `app/_layout.tsx`
- `components/haptic-tab.tsx`
- `app/modal.tsx`
- `app/(tabs)/index.tsx` (toast usage examples)
