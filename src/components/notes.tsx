import { Text } from ".";
import {
  FlatList,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { FAGlyphs, FontAwesome } from "./icons";
import { styles } from "@/styles";
import { getFullMDY, getMDY } from "@/utils";
import { useModal } from "@/store";
import { Note, db, notesT } from "@/db";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";

type NotesList = {
  notes: Note[];
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
  const { data: allNotes } = useLiveQuery(db.select().from(notesT));

  return (
    <FlatList
      data={notes}
      contentContainerStyle={styles.scroll}
      keyExtractor={(n) => n.id.toString()}
      renderItem={({ item: n }) => (
        <View style={style}>
          <NoteText note={n} date={dates} fulldate={fulldates}></NoteText>
          {!nochildren && (
            <NotesList
              notes={allNotes.filter((a) => a.parentID === n.id)}
              style={{ marginLeft: 15 }}
            ></NotesList>
          )}
        </View>
      )}
    ></FlatList>
  );
}

type NoteText = { note: Note; date?: boolean; fulldate?: boolean };
function NoteText({ note, date, fulldate }: NoteText) {
  const { open } = useModal();
  const { D: day } = getMDY(note.time);
  const { M: fullMon } = getFullMDY(note.time);
  return (
    <TouchableOpacity
      onPress={() => open(note)}
      style={[styles.row, { marginBottom: 5 }]}
    >
      {date && <Text style={styles.mono}>{day}:</Text>}
      {fulldate && (
        <Text style={styles.mono}>
          {fullMon} {day}:
        </Text>
      )}
      <FontAwesome
        name={
          ["circle" as FAGlyphs, "circle-thin", "check-circle"][
            note.type
          ] as FAGlyphs
        }
      ></FontAwesome>
      <Text style={{ flexShrink: 1 }}>{note.text}</Text>
    </TouchableOpacity>
  );
}
