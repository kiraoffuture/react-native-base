---
name: react-native-toast
description: Documents how toast notifications are configured and used in this repo. Use when adding user feedback messages.
---

# Toast Messaging: react-native-toast-message

## Configuration

- Toast UI is mounted in `app/_layout.tsx` using:
  - `<Toast topOffset={insets.top} />`

## Usage

- Screens call:
  - `Toast.show({ type, text1, ... })`
- The toast component is configured at the root, so screens only need to call `Toast.show`.

## Examples in this repo

- `app/(tabs)/index.tsx` shows success/info toasts for Sentry/Crashlytics buttons.

## Concrete references

- `app/_layout.tsx`
- `app/(tabs)/index.tsx`
