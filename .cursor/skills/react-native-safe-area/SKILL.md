---
name: react-native-safe-area
description: Documents how this repo uses safe-area insets from react-native-safe-area-context. Use when adjusting layout offsets (e.g., toast positioning).
---

# Safe Area Insets: react-native-safe-area-context

## Where it’s used

- `app/_layout.tsx` calls `useSafeAreaInsets()` to compute:
  - `Toast topOffset={insets.top}`

## Practical effect

- Toast notifications avoid the system status area and notch.

## Concrete references

- `app/_layout.tsx`
