---
name: i18n-react-i18next
description: Documents i18next initialization and translation usage patterns in this repo. Use when adding new user-facing text, translation keys, or locale-dependent UI.
---

# i18n: i18next + react-i18next

## Initialization

- Setup is in `i18n/index.ts`.
- It uses:
  - `expo-localization` to choose initial language
  - `initReactI18next`
  - `resources` with locale JSON files

## Locale files

- `i18n/locales/en.json`
- `i18n/locales/vi.json`

## Usage in components

- Import `useTranslation()` from `react-i18next`.
- Use `t("some.key")` for text strings.

## Key consistency rules

- Translation keys should be added in both `en.json` and `vi.json` when the UI is expected to support both languages.
- Avoid runtime missing keys by keeping key names consistent.

## Concrete references

- `i18n/index.ts`
- `i18n/locales/*.json`
