---
name: react-native-worklets
description: Documents the presence of react-native-worklets and how worklet-based modules might affect animation/native execution. Use when adding animation or performance-sensitive native code paths.
---

# Execution Model: react-native-worklets

## Current status

- `react-native-worklets` is included as a dependency.
- The app enables the new architecture (`newArchEnabled: true`) in `app.config.ts`.

## Practical guidance

- When adding animation/performance features, follow the existing reanimated setup patterns.
- Keep worklet code isolated and ensure it is compatible with the repo’s Babel/Reanimated configuration if reanimated is involved.

## Concrete references

- `app.config.ts` (`newArchEnabled: true`)
- `babel.config.js` (includes reanimated configuration)
