---
name: expo-constants-env
description: Explains how this repo reads environment configuration from expo-constants. Use when modifying env variables like SERVER_URL or APP_ENV.
---

# Environment Config: expo-constants + app.config.ts

## Where env is defined

- `app.config.ts` loads `.env.${APP_ENV}` using `dotenv` and populates:
  - `extra.SERVER_URL`
  - `extra.APP_ENV`
  - `extra.APP_NAME`

## Where env is read

- `config/env.ts` reads from `Constants.expoConfig?.extra` and exports:
  - `SERVER_URL`
  - `APP_ENV`
  - `APP_NAME`

## How changes affect runtime

- `api/client.ts` uses `ENV.SERVER_URL` as the Axios `baseURL`.
- API logging uses `ENV.APP_ENV` to decide logging behavior.

## Concrete references

- `app.config.ts`
- `.env.*` files (repo-local)
- `config/env.ts`
- `api/client.ts`
- `api/api-logger.ts`
