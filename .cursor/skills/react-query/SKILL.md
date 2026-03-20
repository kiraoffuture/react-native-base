---
name: react-query
description: Documents how this repo uses TanStack React Query (QueryClientProvider + hooks like useMutation) and where to place new query/mutation hooks. Use when building data fetching logic.
---

# React Query Conventions

## Provider setup

- React Query is initialized in `app/_layout.tsx` via `QueryClientProvider`.

## Hook placement

- Domain-specific hooks live in `queries/`.
  - Example: `queries/auth.queries.ts` exports `useLoginMutation()`.

## Typical mutation pattern

- Use the existing API layer:
  - `queries/auth.queries.ts` calls `useAuthAPI().login(...)`.
- Use `useMutation<LoginResponse, unknown, LoginRequest>(...)`.
- On success, update state through the existing store:
  - Example: `useAuthStore().setToken(...)`.

## Typical UI consumption pattern

- In screens, read the mutation state (`isPending`, `error`, etc.).
- Convert API errors into user-facing messages using `ApiError` checks.

## Concrete references

- `app/_layout.tsx`
- `queries/auth.queries.ts`
- `stores/auth.store.ts`
