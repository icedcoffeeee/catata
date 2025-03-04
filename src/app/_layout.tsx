import { Modal } from "@/components/modal";
import { db, expo_sqlite } from "@/db";
import migrations from "@/drizzle/migrations";
import { Karla_400Regular } from "@expo-google-fonts/karla";
import { FontAwesome } from "@expo/vector-icons";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
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

  const { success: DBsuccess, error: DBerror } = useMigrations(db, migrations);
  useDrizzleStudio(expo_sqlite);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (fonterror) throw fonterror;
    if (DBerror) throw DBerror;
  }, [fonterror, DBerror]);

  useEffect(() => {
    if (fontloaded && DBsuccess) SplashScreen.hideAsync();
  }, [fontloaded, DBsuccess]);

  if (!fontloaded && !DBsuccess) return null;

  return (
    <LinearGradient
      colors={[colors.zinc[950], colors.zinc[900], colors.zinc[950]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
          headerTitleStyle: {
            fontFamily: "Karla_400Regular",
          },
          navigationBarColor: colors.zinc[900],
          contentStyle: { backgroundColor: "#00000000" },
        }}
      >
        <Stack.Screen name="(tabs)"></Stack.Screen>
        <Stack.Screen
          name="settings"
          options={{
            title: "Settings",
            headerShown: true,
            headerStyle: { backgroundColor: colors.zinc[900] },
            headerTintColor: colors.zinc[100],
            navigationBarColor: colors.zinc[950],
            contentStyle: { backgroundColor: colors.zinc[950] },
          }}
        ></Stack.Screen>
      </Stack>
      <StatusBar style="light"></StatusBar>
      <Modal></Modal>
    </LinearGradient>
  );
}
