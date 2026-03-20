---
name: expo-linking-schemes
description: Documents how deep linking schemes are configured in this Expo app. Use when changing URL schemes or Android intent filters.
---

# Deep Linking: expo-linking + Android scheme plugin

## Scheme configuration source

- `app.config.ts` includes a custom plugin `./plugins/withAndroidScheme`.

## What the plugin does

- `plugins/withAndroidScheme.js` modifies the Android manifest:
  - It finds the `.MainActivity` VIEW intent-filter.
  - It removes existing scheme data.
  - It adds the app scheme and optional Expo scheme.

## Where the scheme values come from

- `app.config.ts` builds scheme strings using `envName`:
  - `reactnativebase-${envName}`
  - `exp+reactnativebase-${envName}`

## Concrete references

- `app.config.ts`
- `plugins/withAndroidScheme.js`
