import { Karla_400Regular } from "@expo-google-fonts/karla";
import { FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import colors from "tailwindcss/colors";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const SpaceMono = require("@assets/fonts/SpaceMono-Regular.ttf");
  const [fontloaded, fonterror] = useFonts({
    SpaceMono,
    Karla_400Regular,
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (fonterror) throw fonterror;
  }, [fonterror]);

  useEffect(() => {
    if (fontloaded) SplashScreen.hideAsync();
  }, [fontloaded]);

  if (!fontloaded) return null;

  return (
    <LinearGradient
      colors={[colors.zinc[950], colors.zinc[900], colors.zinc[950]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <Stack
        screenOptions={{
          navigationBarColor: colors.zinc[900],
          contentStyle: { backgroundColor: "rgba(0 0 0 / 0)" },
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack>
      <StatusBar style="light"></StatusBar>
    </LinearGradient>
  );
}
