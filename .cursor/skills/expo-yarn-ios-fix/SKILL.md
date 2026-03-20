---
name: expo-yarn-ios-fix
description: Helps fix iOS build failures in an Expo project without directly committing generated `ios/`/`android/` changes. Use when the user reports an iOS build failure after Expo prebuild.
---

# Expo iOS Build Fix Helper

## Instructions

1. Provide the iOS build error log
   - Use the full output from the build (especially the first “error”).
2. Classify the failure
   - If you see Xcode code 65 + `-Wnon-modular-include-in-framework-module`:
     - Prefer fixing at the Expo level using config plugins and/or `app.config.ts`.
     - Add `expo-build-properties` to adjust the native build configuration when appropriate.
3. Make persistent changes
   - Do not rely on manual edits inside generated `ios/` or `android/` folders (since `expo prebuild` regenerates them).
   - Use Expo config plugins (e.g. patch Podfile via `withPodfile`) if you must adjust native settings.

## Examples

When the user says:

- “iOS build fails after expo prebuild; fix it”
  The agent should:
- identify the root error from the provided logs,
- apply Expo-level fixes (config plugins / app.config.ts),
- guide the user on retrying after the changes.
