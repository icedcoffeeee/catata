import { theme, useTheme } from "@/colors";
import { Ref, forwardRef } from "react";
import type { TextInputProps, TextProps } from "react-native";
import {
  StyleSheet,
  TextInput as TextInputRN,
  Text as TextRN,
} from "react-native";
import colors from "tailwindcss/colors";

export { View } from "react-native";
export { SafeAreaView } from "react-native-safe-area-context";

export function Text({ children, style, ...props }: TextProps) {
  const th = useTheme(({ th }) => th);
  return (
    <TextRN
      style={[stylesheet.text, { color: theme[th].text }, style]}
      {...props}
    >
      {children}
    </TextRN>
  );
}

export const TextInput = forwardRef(function (
  { style, ...props }: TextInputProps,
  ref: Ref<TextInputRN>,
) {
  const th = useTheme(({ th }) => th);
  return (
    <TextInputRN
      ref={ref}
      placeholderTextColor={colors.zinc[500]}
      style={[
        stylesheet.text,
        { color: theme[th].text, paddingVertical: 15 },
        style,
      ]}
      {...props}
    ></TextInputRN>
  );
});

const stylesheet = StyleSheet.create({
  text: { fontFamily: "Karla_400Regular" },
});
