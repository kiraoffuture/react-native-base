---
name: ui-skeleton-image
description: Documents how this repo renders image skeletons and loading placeholders using moti/skeleton and expo-image. Use when working with loading states or image placeholders.
---

# UI Loading: Skeleton + Image

## Skeleton component

- `components/ui/skeleton.tsx` exports a local `Skeleton` component.
- It is implemented with `moti/skeleton` and aliases the library import to avoid naming collisions.
- Skeleton colors are derived from the active scheme via `useColorScheme()` and theme tokens in `constants/theme.ts` under `Colors.light.skeleton` and `Colors.dark.skeleton`.

## Image loading skeleton wrapper

- `components/image.tsx` wraps `expo-image`’s `Image`.
- It manages an internal `isLoading` state and, when `skeleton` is true, renders `components/ui/skeleton.tsx` instead of the image until `onLoad` / `onError`.

## Typical usage

- Screens can show skeleton blocks during `loading` state:
  - Example: `app/(tabs)/index.tsx`
- For consistent image placeholders, prefer `BaseImage` instead of using `expo-image` directly.

## Concrete references

- `components/ui/skeleton.tsx`
- `components/image.tsx`
- `constants/theme.ts`
- `app/(tabs)/index.tsx` (example usage)
