import { Text } from ".";
import {
  FlatList,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { FAGlyphs, FontAwesome } from "./icons";
import { styles } from "@/styles";
import { getFullMDY, getMDY } from "@/utils";
import { useNoteModal } from "@/components/note-modal";
import { NoteS, db, notesT, toggleTodo } from "@/db";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { eq } from "drizzle-orm";
import { theme, useTheme } from "@/colors";

type NotesList = {
  notes: NoteS[];
  dates?: boolean;
  fulldates?: boolean;
  nochildren?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function NotesList({
  notes,
  dates,
  fulldates,
  nochildren,
  style,
}: NotesList) {
  const th = useTheme(({ th }) => th);
  const { data: notes_ } = useLiveQuery(db.select().from(notesT));

  return (
    <FlatList
      data={notes}
      contentContainerStyle={styles.scroll}
      keyExtractor={(n) => n.id.toString()}
      renderItem={({ item: n }) => {
        const notes = notes_.filter((a) => a.parentID === n.id);
        return (
          <View style={style}>
            <NoteText note={n} date={dates} fulldate={fulldates}></NoteText>
            {!nochildren && !!notes.length && (
              <View style={[styles.row, { marginLeft: 20 }]}>
                {
                  <View
                    style={[
                      stylesheet.line,
                      { backgroundColor: theme[th].text },
                    ]}
                  ></View>
                }
                <NotesList notes={notes}></NotesList>
              </View>
            )}
          </View>
        );
      }}
    ></FlatList>
  );
}

type NoteText = { note: NoteS; date?: boolean; fulldate?: boolean };
function NoteText({ note, date, fulldate }: NoteText) {
  const modal = useNoteModal();
  const { D: day } = getMDY(note.time);
  const { M: fullMon } = getFullMDY(note.time);
  const { data: parent } = useLiveQuery(
    db.query.notesT.findFirst({ where: eq(notesT.id, note.parentID!) }),
  );
  return (
    <TouchableOpacity
      onPress={() => modal.open({ note, parent })}
      onLongPress={() => toggleTodo(note)}
      style={[styles.row, { marginBottom: 5 }]}
    >
      {date && (
        <Text style={styles.mono}>{day.toString().padStart(2, "0")}:</Text>
      )}
      {fulldate && (
        <Text style={styles.mono}>
          {fullMon} {day.toString().padStart(2, "0")}:
        </Text>
      )}
      <FontAwesome
        name={
          (["circle", "circle-thin", "check-circle"] as FAGlyphs[])[note.type]
        }
      ></FontAwesome>
      <Text style={{ width: "90%" }}>{note.text}</Text>
    </TouchableOpacity>
  );
}

const stylesheet = StyleSheet.create({
  line: {
    position: "absolute",
    width: 2,
    height: "100%",
    transform: [{ translateY: -2 }, { translateX: -16 }],
  },
});
