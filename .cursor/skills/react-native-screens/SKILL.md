---
name: react-native-screens
description: Documents the role of react-native-screens in this Expo app. Use when changing navigation performance or screen rendering behavior.
---

# Navigation Performance: react-native-screens

## Current status

- `react-native-screens` is included as a dependency.
- The repo’s visible screens rely on Expo Router navigation and React Navigation under the hood.

## Practical guidance

- If you introduce complex nested navigators, ensure the screen container behavior still matches Expo Router expectations.
- Avoid custom screen lifecycles unless there’s a known performance issue to address.

## Concrete references

- `package.json` (dependency presence)
- `app/_layout.tsx` (navigation root is configured there)
