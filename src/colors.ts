import colors from "tailwindcss/colors";

/** color = rrggbb, opacity = 0 -- 1 */
export const rgba_a = (color: string, opacity: number) =>
  color + Math.floor(opacity * 255).toString(16);

export const theme = {
  dark: {
    bg1: colors.zinc[900],
    bg2: colors.zinc[800],
    text: colors.zinc[100],
    accent1: colors.blue[500],
    accent2: colors.red[700],
  },
  light: {
    bg1: colors.zinc[100],
    bg2: colors.zinc[200],
    text: colors.zinc[900],
    accent1: colors.blue[500],
    accent2: colors.red[300],
  },
};
