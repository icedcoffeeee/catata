import { SafeAreaView, Text, View } from "@/components";
import { Feather, FontAwesome } from "@/components/icons";
import { styles } from "@/styles";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import type { TouchableOpacityProps } from "react-native";

export default function SettingsPage() {
  return (
    <SafeAreaView>
      <View style={[styles.row, { marginBottom: 10 }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="chevron-left" size={20}></Feather>
        </TouchableOpacity>
        <Text style={styles.h1}>Settings</Text>
      </View>
      <View style={{ gap: 20 }}>
        <Option title="Light Mode" options={["off", "on "]}></Option>
        <Option title="Week Start" options={["mon", "sun"]}></Option>
        <Option title="Year Start" options={["jan", "sep"]}></Option>
      </View>
    </SafeAreaView>
  );
}

function Option({
  title,
  options,
}: TouchableOpacityProps & { title: string; options: [string, string] }) {
  return (
    <TouchableOpacity style={[styles.row, { justifyContent: "space-between" }]}>
      <Text style={{ fontSize: 15 }}>{title}</Text>
      <View style={styles.row}>
        <Text style={styles.mono}>{options[0]}</Text>
        <FontAwesome name="toggle-off" size={15}></FontAwesome>
        <Text style={styles.mono}>{options[1]}</Text>
      </View>
    </TouchableOpacity>
  );
}
