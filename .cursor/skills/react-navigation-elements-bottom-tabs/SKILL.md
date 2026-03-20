---
name: react-navigation-elements-bottom-tabs
description: Documents how this repo uses @react-navigation/elements and @react-navigation/bottom-tabs types for tab bar button behavior. Use when modifying tab press interactions.
---

# Tabs UX: @react-navigation/elements + bottom-tabs

## Where it’s used

- `components/haptic-tab.tsx` defines `HapticTab`:
  - receives `BottomTabBarButtonProps`
  - renders `PlatformPressable` from `@react-navigation/elements`
  - triggers `expo-haptics` on iOS press-in

## Practical guidance

- Keep tab button behavior encapsulated in `HapticTab`.
- For UI-only changes, update the tab layout in `app/(tabs)/_layout.tsx`.

## Concrete references

- `components/haptic-tab.tsx`
- `app/(tabs)/_layout.tsx`
