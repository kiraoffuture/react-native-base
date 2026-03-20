---
name: api-axios-errors
description: Explains how this repo calls APIs (Axios instance + request helper) and how errors are represented (ApiError). Use when implementing new API calls or handling API errors.
---

# API Layer: Axios Client + ApiError

## Axios client

- Shared Axios instance: `api/client.ts` (`apiClient`)
- It uses:
  - `baseURL: ENV.SERVER_URL`
  - default JSON headers
  - timeout
- Request/response logging is attached via `api/api-logger.ts`.

## Unified request helper

- `api/utils.ts` exports `request<TResponse>(config)`.
- It wraps Axios calls and:
  - returns `response.data`
  - converts Axios failures into `ApiError` with a user-facing message and status code.

## Error type

- `ApiError` is the expected exception type thrown by `request(...)`.
- Typical UI pattern:
  - check `mutation.error instanceof ApiError`
  - show `error.message` in the screen.

## Where to look

- `api/client.ts`
- `api/utils.ts`
- `api/api-logger.ts`
- `api/api-error.ts`
- `api/api.types.ts`

## Example shape (auth login)

- API function uses `request(...)` (see `api/auth/auth.api.ts`)
- React Query mutation calls the API and updates the auth store (see `queries/auth.queries.ts`)
