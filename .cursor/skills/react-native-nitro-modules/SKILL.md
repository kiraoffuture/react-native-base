---
name: react-native-nitro-modules
description: Documents the presence and intended usage of react-native-nitro-modules in this Expo app. Use when troubleshooting native module behavior that depends on Nitro.
---

# Native Modules: react-native-nitro-modules

## Current status

- `react-native-nitro-modules` is included as a dependency.
- The repo does not directly import Nitro APIs in the visible screens.

## Practical guidance

- If a runtime issue mentions Nitro modules, verify that the app is using the expected React Native architecture configuration (this repo sets `newArchEnabled: true` in `app.config.ts`).
- Keep changes localized to the module integration layer and avoid broad refactors.

## Concrete references

- `app.config.ts` (architecture flag)
- `package.json` (dependency presence)
