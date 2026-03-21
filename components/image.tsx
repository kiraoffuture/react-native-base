import {
  Image as ExpoImage,
  type ImageErrorEventData,
  type ImageLoadEventData,
  type ImageProps,
} from "expo-image";
import React, { useEffect, useState } from "react";
import { ImageStyle, StyleSheet, View, type StyleProp } from "react-native";

import { Skeleton } from "./ui/skeleton";

type ImageBaseProps = Omit<
  ImageProps,
  "source" | "style" | "onLoad" | "onError"
> & {
  source: ImageProps["source"];
  style?: StyleProp<ImageStyle>;
  height?: ImageStyle["height"];
  className?: string;
  onLoad?: ImageProps["onLoad"];
  onError?: ImageProps["onError"];
};

export function Image({
  source,
  style,
  className,
  height,
  onLoad,
  onError,
  ...rest
}: ImageBaseProps) {
  const [isLoading, setIsLoading] = useState(true);
  const heightStyle = height != null ? { height } : undefined;

  useEffect(() => {
    setIsLoading(true);
  }, [source]);

  return (
    <View
      className={["relative", className].filter(Boolean).join(" ")}
      style={heightStyle}
    >
      {isLoading ? (
        <Skeleton
          style={StyleSheet.absoluteFillObject}
          height={typeof height === "number" ? height : undefined}
        />
      ) : null}

      <ExpoImage
        {...rest}
        source={source}
        className={className}
        style={[style, heightStyle]}
        onLoad={(e: ImageLoadEventData) => {
          setIsLoading(false);
          onLoad?.(e);
        }}
        onError={(e: ImageErrorEventData) => {
          setIsLoading(false);
          onError?.(e);
        }}
      />
    </View>
  );
}
