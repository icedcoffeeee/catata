import { theme, useTheme } from "@/colors";
import {
  Ionicons as IoniconsRN,
  FontAwesome as FontAwesomeRN,
  Feather as FeatherRN,
} from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";

export function IonIcons({
  color,
  ...props
}: IconProps<keyof typeof IoniconsRN.glyphMap>) {
  const th = useTheme(({ th }) => th);
  return <IoniconsRN color={color ?? theme[th].text} {...props}></IoniconsRN>;
}

export function FontAwesome({
  color,
  ...props
}: IconProps<keyof typeof FontAwesomeRN.glyphMap>) {
  const th = useTheme(({ th }) => th);
  return (
    <FontAwesomeRN color={color ?? theme[th].text} {...props}></FontAwesomeRN>
  );
}

export function Feather({
  color,
  ...props
}: IconProps<keyof typeof FeatherRN.glyphMap>) {
  const th = useTheme(({ th }) => th);
  return <FeatherRN color={color ?? theme[th].text} {...props}></FeatherRN>;
}

export type IonGlyphs = keyof typeof IoniconsRN.glyphMap;
export type FAGlyphs = keyof typeof FontAwesomeRN.glyphMap;
export type FGlyphs = keyof typeof FeatherRN.glyphMap;
