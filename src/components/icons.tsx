import {
  Ionicons as IoniconsRN,
  FontAwesome as FontAwesomeRN,
} from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";

export function IonIcons({
  color,
  ...props
}: IconProps<keyof typeof IoniconsRN.glyphMap>) {
  return <IoniconsRN color={color ?? "white"} {...props}></IoniconsRN>;
}

export function FontAwesome({
  color,
  ...props
}: IconProps<keyof typeof FontAwesomeRN.glyphMap>) {
  return <FontAwesomeRN color={color ?? "white"} {...props}></FontAwesomeRN>;
}
export type IonGlyphs = keyof typeof IoniconsRN.glyphMap;
export type FAGlyphs = keyof typeof FontAwesomeRN.glyphMap;
