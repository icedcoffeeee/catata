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
  return (
    <TextRN style={[stylesheet.text, style]} {...props}>
      {children}
    </TextRN>
  );
}

export const TextInput = forwardRef(function (
  { style, ...props }: TextInputProps,
  ref: Ref<TextInputRN>,
) {
  return (
    <TextInputRN
      ref={ref}
      placeholderTextColor={colors.zinc[500]}
      style={[stylesheet.text, { paddingVertical: 15 }, style]}
      {...props}
    ></TextInputRN>
  );
});

const stylesheet = StyleSheet.create({
  text: { color: colors.zinc[100], fontFamily: "Karla_400Regular" },
});
