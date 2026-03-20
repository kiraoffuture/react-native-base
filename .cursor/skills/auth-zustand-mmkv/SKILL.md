---
name: auth-zustand-mmkv
description: Explains the authentication state model in this repo using Zustand with MMKV persistence, including hydration checks. Use when modifying auth flows or token state.
---

# Auth State: Zustand + MMKV

## Store location

- `stores/auth.store.ts`:
  - `token: string | null`
  - `setToken(token)`
  - `clearAuth()`

## Persistence

- The store uses Zustand `persist` middleware.
- Storage implementation is in `stores/persist.storage.ts` using MMKV (`createMMKV()`).

## Hydration handling

- During app entry, `app/index.tsx` prevents routing before persistence hydration completes:
  - It uses `useAuthStore.persist.hasHydrated()`
  - It listens with `useAuthStore.persist.onFinishHydration(...)`
- Screens should avoid assuming `token` is ready until hydration is done.

## Auth mutation integration

- `queries/auth.queries.ts` uses `useAuthStore().setToken(data.data)` on login success.
- After successful login, navigation uses `router.replace("/(tabs)")`.

## Concrete references

- `stores/auth.store.ts`
- `stores/persist.storage.ts`
- `app/index.tsx`
- `queries/auth.queries.ts`
