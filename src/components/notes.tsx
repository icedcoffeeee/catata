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

type NotesListProps = { notes: Note[]; style?: StyleProp<ViewStyle> };
export function NotesList({ notes, style }: NotesListProps) {
  return (
    <FlatList
      data={notes.filter((a) =>
        notes.every((b) => !b.subnoteIDs.includes(a.id)),
      )}
      contentContainerStyle={styles.scroll}
      keyExtractor={(n) => n.id.toString()}
      renderItem={({ item: n }) => (
        <View style={style}>
          <NoteText note={n}></NoteText>
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

function NoteText({ note }: { note: Note }) {
  return (
    <TouchableOpacity
      style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
    >
      <FontAwesome name="circle" size={5}></FontAwesome>
      <Text>{note.text}</Text>
    </TouchableOpacity>
  );
}
