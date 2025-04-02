import { theme, useTheme } from "@/colors";
import { SafeAreaView, Text } from "@/components";
import { IonIcons } from "@/components/icons";
import { NotesList } from "@/components/note-list";
import { NoteType, db, notesT } from "@/db";
import { styles } from "@/styles";
import { eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function MenuPage() {
  const th = useTheme(({ th }) => th);
  const { data: todos } = useLiveQuery(
    db.select().from(notesT).where(eq(notesT.type, NoteType.TODO)),
  );

  return (
    <SafeAreaView style={stylesheet.container}>
      <TouchableOpacity
        onPress={() => router.push("/settings")}
        style={[stylesheet.button, { backgroundColor: theme[th].bg3 }]}
      >
        <Text>App Settings</Text>
        <IonIcons name="settings-outline" size={15}></IonIcons>
      </TouchableOpacity>
      <Text
        style={[
          styles.mono,
          stylesheet.title,
          { borderTopColor: theme[th].text },
        ]}
      >
        Todos
      </Text>
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
    borderRadius: 5,
  },
  title: {
    marginTop: 20,
    marginBottom: 10,
    borderTopWidth: 1,
  },
});
