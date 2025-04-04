import { theme, useTheme } from "@/colors";
import { IonIcons, IonGlyphs, Feather } from "@/components/icons";
import { useNoteModal } from "@/components/note-modal";
import { Tabs } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "tailwindcss/colors";

export default function TabsLayout() {
  const modal = useNoteModal();
  const th = useTheme(({ th }) => th);

  return (
    <>
      <Tabs
        screenOptions={{
          sceneStyle: stylesheet.scene,
          headerShown: false,
          tabBarStyle: { ...stylesheet.tabBar, backgroundColor: theme[th].bg2 },
          tabBarItemStyle: { paddingTop: 8 },
          tabBarLabelStyle: { fontFamily: "Karla_400Regular" },
          tabBarActiveTintColor: theme[th].text,
          tabBarInactiveTintColor: colors.zinc[500],
        }}
      >
        {[
          ["year", "Year", "star"],
          ["month", "Month", "moon"],
          ["index", "Today", "sunny"],
          ["archive", "Archive", "archive"],
          ["todos", "Todos", "checkbox"],
        ].map((p) => (
          <Tabs.Screen
            name={p[0]}
            key={p[0]}
            options={{
              title: p[1],
              tabBarIcon: ({ color, size, focused }) => (
                <IonIcons
                  name={(p[2] + (focused ? "-sharp" : "-outline")) as IonGlyphs}
                  color={color}
                  size={0.8 * size}
                ></IonIcons>
              ),
            }}
          ></Tabs.Screen>
        ))}
      </Tabs>
      <TouchableOpacity
        onPress={() => modal.open({})}
        style={[stylesheet.addButton, { backgroundColor: theme[th].accent1 }]}
      >
        <Feather name="plus" size={20}></Feather>
      </TouchableOpacity>
    </>
  );
}

const stylesheet = StyleSheet.create({
  scene: {
    backgroundColor: "#00000000",
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  tabBar: {
    height: 60,
    borderTopWidth: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  addButton: {
    position: "absolute",
    bottom: 75,
    right: 15,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    aspectRatio: 1 / 1,
    borderRadius: 10,
  },
});
