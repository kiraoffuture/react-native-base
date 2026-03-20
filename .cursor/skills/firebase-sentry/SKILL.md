---
name: firebase-sentry
description: Explains how this repo initializes and uses Firebase (analytics/crashlytics) and Sentry, including the Sentry error boundary. Use when modifying telemetry or error reporting behavior.
---

# Telemetry: Firebase + Sentry

## Initialization entry point

- `bootstrap/index.ts` calls:
  - `initFirebase()` from `bootstrap/firebase.ts`
  - `initSentry()` from `bootstrap/sentry.ts`

## Sentry

- Root error boundary is configured in `app/_layout.tsx` via:
  - `Sentry.ErrorBoundary` with `fallback={<ErrorFallback />}`
- Sentry init is in `bootstrap/sentry.ts` and depends on:
  - `process.env.EXPO_PUBLIC_SENTRY_DSN`

## Firebase

- Analytics + Crashlytics enablement is in `bootstrap/firebase.ts`.
- Failures are handled with a try/catch and only warn in development.

## Where Firebase/Craslytics are used manually (example)

- `app/(tabs)/index.tsx` has a button that triggers a Crashlytics test.

## Concrete references

- `bootstrap/index.ts`
- `bootstrap/firebase.ts`
- `bootstrap/sentry.ts`
- `app/_layout.tsx`
- `app/(tabs)/index.tsx`
