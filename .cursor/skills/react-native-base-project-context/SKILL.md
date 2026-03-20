---
name: react-native-base-project-context
description: Teaches the agent this repository’s conventions and the key files to consult first. Use when the agent needs to understand the project structure quickly or make changes that must follow existing patterns (theme/UI components, API/React Query, stores, auth, navigation, i18n, and error handling).
---

# React Native Base - Project Context

## Goal

When the agent starts work in this repo, it should quickly align with the existing architecture:

- Expo Router navigation + root layout providers
- Themed UI primitives (`ThemedView`, `ThemedText`)
- Centralized colors (`constants/theme.ts`) and color-scheme hook usage
- API layer (Axios client + `api/utils.request` with `ApiError`)
- Data fetching patterns (React Query)
- Auth/state layer (Zustand persisted store)
- i18n initialization and locale usage
- Error boundary fallback

## Context Checklist (read these first)

1. App providers / navigation
   - `app/_layout.tsx`
   - `app/(tabs)/_layout.tsx`
2. Themed primitives
   - `components/themed-view.tsx`
   - `components/themed-text.tsx`
3. Theme + color-scheme
   - `constants/theme.ts`
   - `hooks/use-theme-color.ts`
   - `hooks/use-color-scheme.ts` (and the web variant if relevant)
4. API + errors + logging
   - `api/client.ts`
   - `api/utils.ts`
   - `api/api-logger.ts`
   - `config/env.ts` (how `APP_ENV` / `SERVER_URL` are sourced)
5. Auth + state
   - `stores/auth.store.ts`
   - `queries/auth.queries.ts`
6. i18n
   - `i18n/index.ts`
   - `i18n/locales/*.json`
7. Error handling
   - `components/error-fallback.tsx`
   - (root usage is in) `app/_layout.tsx`
8. Common UI helpers (if relevant)
   - `components/ui/skeleton.tsx` (project skeleton component)

## Repo Conventions (how to work)

### Styling & Components

- Prefer `ThemedView` / `ThemedText` over raw `View` / `Text` when background/text colors depend on theme.
- Use `className` for styling when using Nativewind (the repo is configured for it).
- For skeleton/loading placeholders, use the repo’s `components/ui/skeleton.tsx` and keep skeleton colors in `constants/theme.ts` (not hardcoded).

### Navigation & Screens

- Navigation is Expo Router.
- Route entry patterns:
  - Tabs are under `app/(tabs)/...`
  - Auth flow under `app/(auth)/...`
- Use `router.replace(...)` for navigation actions that should not keep the previous screen in history.

### Data Fetching

- Use React Query (`@tanstack/react-query`) via existing `useMutation` / `useQuery` hooks.
- API calls should typically go through:
  - `api/client.ts` (Axios instance)
  - `api/utils.ts` `request(...)` which throws `ApiError`

### Auth / State

- Auth token is stored in `useAuthStore` (`stores/auth.store.ts`), persisted using MMKV (`stores/persist.storage.ts`).
- Mutations like login should update the store in the existing pattern (see `queries/auth.queries.ts`).

### i18n

- Use `useTranslation()` from `react-i18next`.
- Keep translation keys consistent with existing locale JSON files.

### Error Handling

- The app uses a root-level Sentry error boundary with `ErrorFallback`.
- Use `ApiError` messages for user-facing errors where applicable.

## Import & Naming Rules

- Use the `@/` alias for imports (configured in `tsconfig.json`).
- Follow existing component naming style (`ThemedText`, `ThemedView`, etc.).
- Avoid introducing naming collisions with third-party exports (if a local component name matches a library name, alias the library import).

## Verification (when making changes)

1. Confirm TypeScript has no obvious type errors.
2. Ensure changes follow the project’s existing conventions and do not touch generated native folders (`ios/`, `android/`) unless the task explicitly requires it (prefer Expo config/plugins for native adjustments).
