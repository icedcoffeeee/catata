import { Text } from "@/components";
import { IonIcons, IonGlyphs } from "@/components/icons";
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
          tabBarLabelStyle: { fontFamily: "SpaceMono" },
          tabBarActiveTintColor: colors.zinc[100],
          tabBarInactiveTintColor: colors.zinc[500],
        }}
      >
        {[
          ["year", "Year", "star-sharp"],
          ["month", "Month", "moon-sharp"],
          ["index", "Today", "sunny-sharp"],
          ["search", "Search", "search-sharp"],
          ["settings", "Settings", "settings-sharp"],
        ].map((p) => (
          <Tabs.Screen
            name={p[0]}
            key={p[0]}
            options={{
              title: p[1],
              tabBarIcon: ({ color, size }) => (
                <IonIcons
                  name={p[2] as IonGlyphs}
                  color={color}
                  size={0.8 * size}
                ></IonIcons>
              ),
            }}
          ></Tabs.Screen>
        ))}
      </Tabs>
      <TouchableOpacity style={styles.addButton}>
        <Text style={{ fontSize: 20 }}>+</Text>
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
    borderTopWidth: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.zinc[900],
  },
  addButton: {
    position: "absolute",
    bottom: 65,
    right: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    aspectRatio: 1 / 1,
    borderRadius: 10,
    backgroundColor: colors.zinc[500],
  },
});
