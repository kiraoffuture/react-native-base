---
name: expo-config-plugins
description: Documents this repo’s Expo configuration plugins and how to change native/build-related behavior safely in an Expo prebuild workflow. Use when editing `app.config.ts` or adding/updating config plugins.
---

# Expo Config Plugins + app.config.ts Conventions

## Where configuration lives

- Main Expo config: `app.config.ts`
- Expo prebuild is used (`expo prebuild --clean` in scripts).
- Custom plugins live in `plugins/` (e.g. Android scheme and network security).

## How environment is selected

- `app.config.ts` reads `process.env.APP_ENV` (default: `"develop"`)
- It loads `.env.${envName}` using `dotenv` and uses values like:
  - `APP_ID`
  - `SERVER_URL`
  - `SERVER_DOMAIN`

## Plugins used in this repo

1. Core plugins
   - `"expo-router"`
   - `"@react-native-firebase/app"`
   - `"@react-native-firebase/crashlytics"`
2. Build properties
   - `"expo-build-properties"` config is used for iOS frameworks/linking decisions.
3. Splash screen
   - `"expo-splash-screen"` points to `assets/images/splash-icon.png`
4. Sentry
   - `"@sentry/react-native/expo"` config includes `organization`, `project`, and `url`.
5. Custom Android plugins
   - `./plugins/withAndroidScheme`
   - `./plugins/withAndroidAppName`
   - `./plugins/withAndroidNetworkSecurity`

## Custom plugin responsibilities

- Android scheme plugin: adds intent-filter scheme(s) for deep links (see `plugins/withAndroidScheme.js`).
- Android app name plugin: injects application label (see `plugins/withAndroidAppName.js`).
- Android network security plugin:
  - updates AndroidManifest application attribute `android:networkSecurityConfig`
  - writes `res/xml/network_security_config.xml`
  - copies certificate into `res/raw/` so it survives prebuild (see `plugins/withAndroidNetworkSecurity.js`).

## Safe editing rules

- Avoid direct edits inside generated `ios/`/`android/` folders for long-term changes.
- Implement persistent changes via:
  - `app.config.ts` plugin config
  - custom config plugins in `plugins/`

## Concrete references

- `app.config.ts`
- `plugins/withAndroidScheme.js`
- `plugins/withAndroidAppName.js`
- `plugins/withAndroidNetworkSecurity.js`
