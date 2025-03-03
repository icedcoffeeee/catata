import { Text, View } from "@/components";
import { FontAwesome } from "@/components/icons";
import { styles } from "@/styles";
import { TouchableOpacity } from "react-native";
import type { TouchableOpacityProps } from "react-native";

export default function SettingsPage() {
  return (
    <View style={{ padding: 20, gap: 20 }}>
      <Option title="Light Mode" options={["off", "on "]}></Option>
      <Option title="Week Start" options={["mon", "sun"]}></Option>
      <Option title="Year Start" options={["jan", "sep"]}></Option>
    </View>
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
