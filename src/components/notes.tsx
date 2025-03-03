import { Note } from "@/data";
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

type NotesList = {
  notes: Note[];
  dates?: boolean;
  fulldates?: boolean;
  style?: StyleProp<ViewStyle>;
};
export function NotesList({ notes, dates, fulldates, style }: NotesList) {
  return (
    <FlatList
      data={notes.filter((a) =>
        notes.every((b) => !b.subnoteIDs.includes(a.id)),
      )}
      contentContainerStyle={styles.scroll}
      keyExtractor={(n) => n.id.toString()}
      renderItem={({ item: n }) => (
        <View style={style}>
          <NoteText note={n} date={dates} fulldate={fulldates}></NoteText>
          {n.subnoteIDs.length !== 0 && (
            <NotesList
              notes={notes.filter((a) =>
                notes.some((b) => b.subnoteIDs.includes(a.id)),
              )}
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
  const { D: fullday } = getFullMDY(note.time);
  return (
    <TouchableOpacity
      onPress={() => open(note)}
      style={[styles.row, { marginBottom: 5 }]}
    >
      {date && <Text style={styles.mono}>{day}:</Text>}
      {fulldate && (
        <Text style={styles.mono}>
          {fullday} {day}:
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
