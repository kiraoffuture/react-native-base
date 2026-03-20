---
name: icon-symbol-expo-symbols
description: Documents how this repo renders SF Symbols on iOS and Material Icons on Android/web using expo-symbols and @expo/vector-icons. Use when adding or changing tab icons.
---

# Icons: expo-symbols + @expo/vector-icons (IconSymbol)

## Why this abstraction exists

- iOS uses SF Symbols for a native look.
- Android/web uses Material Icons for consistent rendering.
- `components/ui/icon-symbol.tsx` maps SF Symbol names to Material Icon names.

## Platform-specific implementation

- `components/ui/icon-symbol.ios.tsx` uses `expo-symbols` `SymbolView`.
- `components/ui/icon-symbol.tsx` uses `@expo/vector-icons` `MaterialIcons`.

## Naming + mapping

- The `name` prop is an SF Symbol name (typed by `SymbolViewProps['name']`).
- On non-iOS platforms, `MAPPING` translates SF symbol names into Material Icons names.

## Concrete references

- `components/ui/icon-symbol.tsx`
- `components/ui/icon-symbol.ios.tsx`
- `app/(tabs)/_layout.tsx` (where tab icons are set)
