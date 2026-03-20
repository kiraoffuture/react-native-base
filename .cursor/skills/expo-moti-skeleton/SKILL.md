---
name: expo-moti-skeleton
description: Adds `moti/skeleton`-style loading skeleton UI in an Expo React Native app. Use when the user asks to add skeletons or loading placeholders for screens.
---

# Expo Moti Skeleton

## Instructions

1. Detect the best place to show skeleton
   - Find the screen with a loading state (e.g. React Query `isPending`, local `loading` boolean, etc.).
   - Use the skeleton only during loading and replace with the real UI when data is ready.
2. Ensure dependencies exist
   - Add `moti`.
   - If your project needs it, add `react-native-svg`.
3. Enable Reanimated if required
   - If the project uses `react-native-reanimated`, ensure `react-native-reanimated/plugin` is present in `babel.config.js`.
4. Create or update a reusable skeleton component
   - Create `components/ui/skeleton.tsx` (or update the existing one).
   - Import the library’s skeleton under a different alias to avoid naming collisions, e.g. `import { Skeleton as MotiSkeleton } from "moti/skeleton"`.
   - Tie skeleton colors to app theme:
     - Move skeleton palette values into `constants/theme.ts` (both light and dark).
     - In the skeleton component, read the active scheme and use theme-derived colors.
5. Update the target screen
   - Replace the existing loading UI with `Skeleton` blocks that match the final layout (heights, radii, and spacing).
6. Verification

- Ensure TypeScript types are valid and the screen renders without runtime errors.

## Examples

When the user says:

- “add moti/skeleton to implement skeleton loading”
  The agent should:
- Install `moti` if missing.
- Create/update `components/ui/skeleton.tsx`.
- Replace the loading view in the relevant screen with skeleton blocks.
