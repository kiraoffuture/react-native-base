---
name: react-native-gesture-handler
description: Documents the gesture-handler setup expectations in this Expo React Native app. Use when adding gesture-driven UI or adjusting gesture behavior.
---

# Gestures: react-native-gesture-handler (repo expectations)

## Current status

- The dependency is included (`react-native-gesture-handler`).
- This repo doesn’t directly define custom gesture handlers in the visible screens, but it relies on the overall React Native gesture system and navigator integrations.

## Interaction patterns

- For press interactions (not gestures), the repo uses `Pressable` from React Native or `PlatformPressable` via `@react-navigation/elements`.

## Concrete references

- `package.json` (dependency presence)
