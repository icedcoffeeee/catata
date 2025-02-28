import type { TextInputProps, TextProps } from "react-native";
import { TextInput as TextInputRN, Text as TextRN } from "react-native";
import colors from "tailwindcss/colors";

export { View } from "react-native";
export { SafeAreaView } from "react-native-safe-area-context";

export function Text({ children, style, ...props }: TextProps) {
  return (
    <TextRN
      style={[{ color: colors.zinc[100], fontFamily: "SpaceMono" }, style]}
      {...props}
    >
      {children}
    </TextRN>
  );
}

export function TextInput({ style, ...props }: TextInputProps) {
  return (
    <TextInputRN
      placeholderTextColor={colors.zinc[100]}
      style={[{ color: colors.zinc[100], fontFamily: "SpaceMono" }, style]}
      {...props}
    ></TextInputRN>
  );
}
