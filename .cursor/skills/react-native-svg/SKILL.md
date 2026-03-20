---
name: react-native-svg
description: Documents how this repo uses react-native-svg indirectly (Expo prebuild / dependencies such as moti or RN modules) and when developers should add SVG rendering.
---

# Rendering: react-native-svg

## Current status

- `react-native-svg` is included as a dependency.
- The codebase may rely on it transitively via UI libraries.

## When to use directly

- Use `react-native-svg` when building custom vector graphics instead of using static images.

## Concrete references

- `package.json` (dependency presence)
