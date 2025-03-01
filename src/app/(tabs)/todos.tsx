import { SafeAreaView, Text } from "@/components";
import { IonIcons } from "@/components/icons";
import { NotesList } from "@/components/notes";
import { NoteType, getNotes } from "@/data";
import { styles } from "@/styles";
import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "tailwindcss/colors";

export default function MenuPage() {
  const todos = getNotes().filter((n) => n.type === NoteType.TODO);
  return (
    <SafeAreaView style={stylesheet.container}>
      <TouchableOpacity style={stylesheet.button}>
        <Text>Settings</Text>
        <IonIcons name="settings-outline" size={15}></IonIcons>
      </TouchableOpacity>
      <Text style={[styles.mono, stylesheet.title]}>Todos</Text>
      <NotesList notes={todos} fulldates></NotesList>
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
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: colors.zinc[100],
  },
});
