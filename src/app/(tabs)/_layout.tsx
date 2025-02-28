import { IonIcons, IonGlyphs, MaterialIcons } from "@/components/icons";
import { Tabs } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "tailwindcss/colors";

export default function TabsLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          sceneStyle: styles.scene,
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarItemStyle: { transform: [{ translateY: 8 }] },
          tabBarLabelStyle: { fontFamily: "SpaceMono" },
          tabBarActiveTintColor: colors.zinc[100],
          tabBarInactiveTintColor: colors.zinc[500],
        }}
      >
        {[
          ["year", "Year", "star"],
          ["month", "Month", "moon"],
          ["index", "Today", "sunny"],
          ["archive", "Archive", "archive"],
          ["menu", "Menu", "menu"],
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
      <TouchableOpacity style={styles.addButton}>
        <MaterialIcons name="add" size={20}></MaterialIcons>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  scene: {
    backgroundColor: "rgba(0 0 0 / 0)",
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  tabBar: {
    height: 60,
    borderTopWidth: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.zinc[900],
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
    backgroundColor: colors.zinc[500],
  },
});
