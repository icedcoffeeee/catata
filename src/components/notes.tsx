import { Note } from "@/data";
import { Text } from ".";
import {
  FlatList,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { FontAwesome } from "./icons";
import { styles } from "@/styles";
import { longDate } from "@/utils";

type NotesListProps = {
  notes: Note[];
  dates?: boolean;
  style?: StyleProp<ViewStyle>;
};
export function NotesList({ notes, dates, style }: NotesListProps) {
  return (
    <FlatList
      data={notes.filter((a) =>
        notes.every((b) => !b.subnoteIDs.includes(a.id)),
      )}
      contentContainerStyle={styles.scroll}
      keyExtractor={(n) => n.id.toString()}
      renderItem={({ item: n }) => (
        <View style={style}>
          <NoteText note={n} dates={dates}></NoteText>
          {n.subnoteIDs.length !== 0 && (
            <View style={{ marginLeft: 20 }}>
              <NotesList
                notes={notes.filter((a) =>
                  notes.some((b) => b.subnoteIDs.includes(a.id)),
                )}
              ></NotesList>
            </View>
          )}
        </View>
      )}
    ></FlatList>
  );
}

function NoteText({ note, dates }: { note: Note; dates?: boolean }) {
  return (
    <TouchableOpacity
      style={{ flexDirection: "row", alignItems: "baseline", gap: 10 }}
    >
      {!dates ? (
        <FontAwesome
          name="minus"
          size={5}
          style={{ transform: [{ translateY: -2 }] }}
        ></FontAwesome>
      ) : (
        <Text>{longDate(note.epoch).replaceAll(",", ":").split(" ")[1]}</Text>
      )}
      <Text>{note.text}</Text>
    </TouchableOpacity>
  );
}
