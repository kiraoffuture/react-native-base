import { Skeleton as MotiSkeleton } from "moti/skeleton";
import React from "react";
import { DimensionValue, View, type ViewProps } from "react-native";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

type SkeletonProps = {
  width?: DimensionValue;
  height?: number;
  radius?: number;
} & Omit<ViewProps, "style"> & { style?: ViewProps["style"] };

export function Skeleton({
  width = "100%",
  height = 12,
  radius = 10,
  style,
  ...rest
}: SkeletonProps) {
  const scheme = useColorScheme() ?? "light";
  const colors = Colors[scheme];

  const colorMode = scheme === "dark" ? "dark" : "light";

  return (
    <View style={[{ width }, style]} {...rest}>
      <MotiSkeleton
        colorMode={colorMode}
        radius={radius}
        height={height}
        width={width}
        colors={[
          colors.skeleton.base,
          colors.skeleton.highlight,
          colors.skeleton.base,
        ]}
        backgroundColor={colors.background}
      />
    </View>
  );
}
