import { NoteModal } from "@/components/note-modal";
import { db, expo_sqlite } from "@/db";
import migrations from "@/drizzle/migrations";
import { Karla_400Regular } from "@expo-google-fonts/karla";
import { FontAwesome } from "@expo/vector-icons";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useFonts } from "expo-font";
import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";
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
    <LinearGradient {...bg_gradient}>
      <Stack
        screenOptions={{
          headerShown: false,
          headerTitleStyle: {
            fontFamily: "Karla_400Regular",
          },
          headerStyle: { backgroundColor: colors.zinc[900] },
          headerTintColor: colors.zinc[100],
          navigationBarColor: colors.zinc[950],
          contentStyle: { padding: 20, backgroundColor: colors.zinc[950] },
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            navigationBarColor: colors.zinc[900],
            contentStyle: {
              padding: 0,
              backgroundColor: "#00000000",
            },
          }}
        ></Stack.Screen>
        <Stack.Screen name="settings"></Stack.Screen>
        <Stack.Screen
          name="[year-month]"
          options={{ contentStyle: { padding: 0 } }}
        ></Stack.Screen>
      </Stack>
      <StatusBar style="light"></StatusBar>
      <NoteModal></NoteModal>
    </LinearGradient>
  );
}

export const bg_gradient: LinearGradientProps = {
  colors: [colors.zinc[950], colors.zinc[900], colors.zinc[950]],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
  style: { flex: 1 },
};
