import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import { ActivityIndicator, View } from "react-native";

type LoadingProps = {
  fullScreen?: boolean;
  size?: "small" | "large";
  color?: string;
  className?: string;
  testID?: string;
  accessibilityLabel?: string;
};

export function Loading({
  size = "large",
  color,
  fullScreen = false,
  className,
  testID,
  accessibilityLabel,
}: LoadingProps) {
  const tintColor = useThemeColor({ light: color, dark: color }, "tint");
  const resolvedColor =
    color ?? (typeof tintColor === "string" ? tintColor : undefined);

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      className={[
        fullScreen
          ? "flex-1 items-center justify-center"
          : "items-center justify-center",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <ActivityIndicator size={size} color={resolvedColor} />
    </View>
  );
}
