import { rgba_a, theme } from "./src/colors";

const reactdtp = "@react-native-community/datetimepicker";
const datetimepicker = { android: { datePicker: {} } };

function color(key: keyof typeof theme.dark, swap?: boolean, opacity?: number) {
  return {
    light: rgba_a(theme[!swap ? "light" : "dark"][key], opacity ?? 1, true),
    dark: rgba_a(theme[!swap ? "dark" : "light"][key], opacity ?? 1, true),
  };
}

datetimepicker.android.datePicker = {
  colorAccent: color("accent1"),
  colorControlActivated: color("accent1"),
  colorControlHighlight: color("bg2"),
  selectableItemBackgroundBorderless: color("bg2"),
  textColor: color("text"),
  textColorPrimary: color("text"),
  textColorPrimaryInverse: color("text", true),
  textColorSecondary: color("text", false, 0.8),
  textColorSecondaryInverse: color("text", true, 0.8),
  windowBackground: color("bg1"),
};

console.log(JSON.stringify([reactdtp, datetimepicker], undefined, 2));
