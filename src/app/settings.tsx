import { useTheme } from "@/colors";
import { SafeAreaView, Text, View } from "@/components";
import { Feather, FontAwesome } from "@/components/icons";
import { styles } from "@/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import type { TouchableOpacityProps } from "react-native";

export default function SettingsPage() {
  const { th, setTheme } = useTheme();
  const [week, _setWeek] = useState(false);
  const [year, _setYear] = useState(false);

  return (
    <SafeAreaView>
      <View style={[styles.row, { marginBottom: 10 }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="chevron-left" size={20}></Feather>
        </TouchableOpacity>
        <Text style={styles.h1}>Settings</Text>
      </View>
      <View style={{ gap: 20 }}>
        <Option
          title="Light Mode"
          on={th === "light"}
          options={["off", "on "]}
          onPress={async () => {
            const th_ = th === "light" ? "dark" : "light";
            setTheme(th_);
            await AsyncStorage.setItem("theme", th_);
          }}
        ></Option>
        <Option title="Week Start" on={week} options={["mon", "sun"]}></Option>
        <Option title="Year Start" on={year} options={["jan", "sep"]}></Option>
      </View>
    </SafeAreaView>
  );
}

function Option({
  title,
  options,
  on,
  ...props
}: TouchableOpacityProps & {
  title: string;
  options: [string, string];
  on: boolean;
}) {
  return (
    <TouchableOpacity
      style={[styles.row, { justifyContent: "space-between" }]}
      {...props}
    >
      <Text style={{ fontSize: 15 }}>{title}</Text>
      <View style={styles.row}>
        <Text style={styles.mono}>{options[0]}</Text>
        <FontAwesome
          name={on ? "toggle-on" : "toggle-off"}
          size={15}
        ></FontAwesome>
        <Text style={styles.mono}>{options[1]}</Text>
      </View>
    </TouchableOpacity>
  );
}
