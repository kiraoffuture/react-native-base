---
name: react-native-firebase-import-refactor
description: Refactors react-native-firebase imports between dynamic imports (`await import(...)`) and static imports for correctness and platform safety in React Native/Expo. Use when the user asks to move imports, remove dynamic imports, or address issues caused by import timing.
---

# react-native-firebase Import Refactor

## Instructions

1. Locate the import pattern
   - Search for `await import("@react-native-firebase/...")` and identify the surrounding function scope.
2. Choose the target pattern
   - If moving to static imports: import required symbols at the top-level.
   - If moving to dynamic imports: keep them inside the async function and use `await import(...)`.
3. Remove/adjust platform guards only if requested
   - If the user explicitly says “remove web checks” then remove guard conditions and try-catch behavior accordingly.
4. Ensure TypeScript correctness
   - Update function signatures (async vs non-async) after changing import style.
5. Verification
   - Ensure TypeScript types are correct and the code compiles in principle (no obvious runtime import issues).

## Examples

When the user says:

- “revert everything back to normal static imports”
  The agent should:
- replace dynamic `await import(...)` with static imports,
- update the code so it compiles (e.g. remove unnecessary async/await),
- keep behavior consistent with the new import style.
