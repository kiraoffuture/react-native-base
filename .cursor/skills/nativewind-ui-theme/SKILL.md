---
name: nativewind-ui-theme
description: Explains this repo’s styling and theming conventions using Nativewind className plus ThemedView/ThemedText. Use when working on UI components, colors, typography, or theme-aware styles.
---

# Nativewind UI + Theme Conventions

## What to follow

1. Styling is done with `className` (Nativewind).
2. Theme-aware styling should use the repo’s themed primitives:
   - `components/themed-view.tsx` (`ThemedView`)
   - `components/themed-text.tsx` (`ThemedText`)
3. Central color tokens live in `constants/theme.ts` under `Colors.light` and `Colors.dark`.
4. Skeleton/loading UI should use `components/ui/skeleton.tsx` (and skeleton colors should come from the theme).

## Themed primitives

- `ThemedView` selects `background` via `useThemeColor`.
- `ThemedText` selects `text` via `useThemeColor` and supports `type`:
  - `title`, `default`, `defaultSemiBold`, `subtitle`, `link`

## Color scheme handling

- The repo uses `hooks/use-color-scheme.ts` and `hooks/use-theme-color.ts`.
- When you need theme-dependent colors, prefer reading from `Colors` using the active scheme from `useColorScheme()`.

## Fonts

- Typography is defined in `constants/theme.ts` as `Fonts`.
- Use existing font tokens only if the repo already does so in your target component.

## Naming and collisions

- Avoid naming collisions with third-party components (example pattern: alias library `Skeleton` as something else when your local component is also named `Skeleton`).

## Concrete references

- Theme tokens: `constants/theme.ts`
- Theme hooks: `hooks/use-color-scheme.ts`, `hooks/use-theme-color.ts`
- Themed components: `components/themed-view.tsx`, `components/themed-text.tsx`
- Skeleton component: `components/ui/skeleton.tsx`
