import { SafeAreaView, Text } from "@/components";
import { IonIcons } from "@/components/icons";
import { NotesList } from "@/components/notes";
import { NoteType, getNotes } from "@/data";
import { styles } from "@/styles";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "tailwindcss/colors";

export default function MenuPage() {
  const todos = getNotes().filter((n) => n.type === NoteType.TODO);
  return (
    <SafeAreaView style={stylesheet.container}>
      <TouchableOpacity
        onPress={() => router.push("/settings")}
        style={stylesheet.button}
      >
        <Text>App Settings</Text>
        <IonIcons name="settings-outline" size={15}></IonIcons>
      </TouchableOpacity>
      <Text style={[styles.mono, stylesheet.title]}>Todos</Text>
      <NotesList
        notes={todos.sort((a, b) => b.time - a.time)}
        fulldates
        nochildren
      ></NotesList>
    </SafeAreaView>
  );
}

const stylesheet = StyleSheet.create({
  container: { gap: 5 },
  button: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.zinc[800],
    borderRadius: 5,
  },
  title: {
    marginTop: 20,
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: colors.zinc[100],
  },
});
