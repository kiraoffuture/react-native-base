---
name: expo-linear-gradient
description: Documents how this repo can use expo-linear-gradient for backgrounds and gradients. Use when adding gradient UI elements.
---

# UI Gradients: expo-linear-gradient

## Current status in this repo

- `expo-linear-gradient` is included in dependencies.
- There are no direct gradient components in the current screens, so new gradient UI should follow the existing styling/themed conventions.

## Styling conventions

- Prefer `ThemedView` wrappers when gradients sit on top of theme-dependent backgrounds.
- Use Nativewind `className` for layout, and keep gradient colors explicit at the component level unless the design requires theme tokens.

## Concrete references

- `package.json` (dependency presence)
