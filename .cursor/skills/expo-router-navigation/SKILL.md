---
name: expo-router-navigation
description: Documents Expo Router navigation structure and screen patterns used in this repo. Use when modifying routes, layouts, tabs, modals, or navigation actions.
---

# Expo Router Navigation Conventions

## Where routing is defined

- Root stack/provider: `app/_layout.tsx`
- Auth flow:
  - Layout: `app/(auth)/_layout.tsx`
  - Screen: `app/(auth)/index.tsx`
- Tabs:
  - Layout: `app/(tabs)/_layout.tsx`
  - Home: `app/(tabs)/index.tsx`
  - Explore: `app/(tabs)/explore.tsx`
- Modal route:
  - Screen: `app/modal.tsx`

## Root providers

- `app/_layout.tsx` sets up:
  - React Query: `QueryClientProvider`
  - Theme: `ThemeProvider` from `@react-navigation/native`
  - Sentry error boundary: `Sentry.ErrorBoundary`
  - Toast: `react-native-toast-message` with `topOffset` from safe-area insets

## Navigation patterns

- Use `router.replace(...)` for auth transitions (to avoid keeping the old screen in history).
- Use `Redirect` inside conditional routing (see `app/(auth)/index.tsx`).
- When linking, prefer `expo-router` `Link` with `dismissTo` if the route should close/dismiss appropriately (see `app/modal.tsx`).

## Tabs configuration

- Tabs use `Tabs` from `expo-router` with `screenOptions`.
- Tab icons use the repo’s `IconSymbol` and `Colors` tokens for active tint.
- Haptics on tab press is handled by `components/haptic-tab.tsx`.

## Concrete references

- `app/_layout.tsx`
- `app/(tabs)/_layout.tsx`
- `app/(auth)/index.tsx`
- `app/modal.tsx`
- `components/haptic-tab.tsx`
