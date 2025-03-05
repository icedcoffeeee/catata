import { rgba_a, theme } from "./src/colors";

const reactdtp = "@react-native-community/datetimepicker";
const datetimepicker = { android: { datePicker: {} } };

function color(key: keyof typeof theme.dark, opacity?: number) {
  return {
    light: rgba_a(theme["light"][key], opacity ?? 1, true),
    dark: rgba_a(theme["dark"][key], opacity ?? 1, true),
  };
}

datetimepicker.android.datePicker = {
  colorAccent: color("accent1"),
  colorControlActivated: color("accent1"),
  colorControlHighlight: color("bg2"),
  selectableItemBackgroundBorderless: color("bg1"),
  textColor: color("text"),
  textColorPrimary: color("text"),
  textColorPrimaryInverse: color("text"),
  textColorSecondary: color("text", 0.5),
  textColorSecondaryInverse: color("text", 0.5),
  windowBackground: color("bg1"),
};

console.log(JSON.stringify([reactdtp, datetimepicker], undefined, 2));
