---
name: react-dom-web
description: Documents how this repo supports web rendering using React DOM and expo-web-browser. Use when changing web behavior or ensuring web build compatibility.
---

# Web Rendering: React DOM / Expo Web

## Current status

- `react-dom` and `react-native-web` are included as dependencies.
- `app.config.ts` sets `web.output: "static"`.

## Practical guidance

- If a feature is native-only, keep it behind platform checks to avoid importing unsupported modules in web bundles.
- Prefer wrapper components that provide a safe fallback UI for web.

## Concrete references

- `app.config.ts` (web output)
- `package.json` (web dependencies)
