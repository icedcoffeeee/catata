import {
  Modal as ModalRN,
  Pressable,
  StyleSheet,
  TextInput as TextInputRN,
  TouchableOpacity,
} from "react-native";
import { Text, TextInput, View } from ".";
import colors from "tailwindcss/colors";
import { longDate } from "@/utils";
import { LinearGradient } from "expo-linear-gradient";
import { useRef } from "react";
import { NoteScope, NoteType } from "@/data";
import { Feather, FontAwesome, IonIcons } from "./icons";
import { styles } from "@/styles";
import { Note, db, notesT } from "@/db";
import { eq } from "drizzle-orm";
import { create } from "zustand";

type Modal = {
  modal: boolean;

  id?: number;
  text: string;
  time: number;
  scope: NoteScope;
  type: NoteType;
  parentID?: number;
  parent?: Note;

  openNote: (note?: Partial<Omit<Note, "parentID">>) => void;
  openEmpty: (note?: Pick<Note, "time" | "scope">) => void;
  closeNote: () => void;
  setNote: (
    note: Partial<Omit<Note, "parentID"> & { parentID: number; parent: Note }>,
  ) => void;
  resetNote: () => void;
};

const initial = {
  modal: false,

  id: undefined,
  text: "",
  time: new Date().getTime(),
  scope: NoteScope.DAY,
  type: NoteType.NOTE,

  parentID: undefined,
  parent: undefined,
};

export const useModal = create<Modal>((set, get) => ({
  ...initial,

  openNote: (note) => set({ modal: true, ...note }),
  openEmpty: (note) => {
    get().resetNote();
    get().openNote(note);
  },
  closeNote: () => set({ modal: false }),
  setNote: (note) => set({ ...note }),
  resetNote: () => set({ ...initial }),
}));

export function Modal() {
  const { modal, openEmpty, closeNote, setNote, resetNote, ...note } =
    useModal();

  const input = useRef<TextInputRN>(null);
  setTimeout(() => input.current?.focus(), 100);
  // ^^ pull out keyboard

  const text = note?.text ?? "";
  const time = note?.time ?? new Date().getTime();
  const scope = note?.scope ?? NoteScope.DAY;
  const isNote = note ? note.type === NoteType.NOTE : true;

  return (
    <ModalRN
      transparent
      animationType="slide"
      visible={modal}
      onRequestClose={closeNote}
    >
      <LinearGradient
        colors={["#00000088", "#00000000"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 0, y: 0 }}
      >
        <Pressable onPress={closeNote} style={styles.modal}></Pressable>
      </LinearGradient>
      <View style={stylesheet.container}>
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <TouchableOpacity>
            <Text style={styles.mono}>{longDate(time)}</Text>
          </TouchableOpacity>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => setNote({ type: (note.type + 1) % 2 })}
            >
              <Text>{isNote ? "Note" : "Todo"}</Text>
            </TouchableOpacity>
            <Feather name="minus"></Feather>
            <TouchableOpacity
              onPress={() => setNote({ scope: (note.scope + 1) % 3 })}
            >
              <Text>{["Day", "Month", "Year"][scope]}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {note.parent && (
          <View style={[styles.row, { opacity: 0.7 }]}>
            <IonIcons
              name="return-up-forward"
              style={{ transform: [{ translateY: 2 }] }}
            ></IonIcons>
            <Text>{note.parent.text}</Text>
          </View>
        )}
        <View style={styles.row}>
          <FontAwesome name={isNote ? "circle" : "circle-o"}></FontAwesome>
          <TextInput
            ref={input}
            placeholder={`New ${isNote ? "note" : "todo"}...`}
            value={note?.text}
            onChangeText={(text) => setNote({ text })}
            multiline
          ></TextInput>
        </View>
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <TouchableOpacity
            style={[
              styles.row,
              stylesheet.submit,
              { opacity: !!text ? 1 : 0.4 },
              { backgroundColor: colors.blue[500] },
            ]}
            onPress={async () =>
              await addNote(note).then(async ({ id: parentID }) => {
                openEmpty();
                let parent = await db.query.notesT.findFirst({
                  where: eq(notesT.id, parentID),
                });
                setNote({ parentID, parent });
              })
            }
            disabled={!text}
          >
            <Feather name="plus"></Feather>
            <Text>Add subnote</Text>
          </TouchableOpacity>
          <View style={[styles.row, { justifyContent: "flex-end" }]}>
            <TouchableOpacity
              style={[
                styles.row,
                stylesheet.submit,
                { opacity: !!text ? 1 : 0.4 },
              ]}
              onPress={() => {
                delNote(note);
                resetNote();
              }}
              disabled={!text}
            >
              <Feather name="trash"></Feather>
              <Text>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.row,
                stylesheet.submit,
                { opacity: !!text ? 1 : 0.4 },
              ]}
              onPress={() => {
                addNote(note);
                openEmpty();
              }}
              disabled={!text}
            >
              <Feather name="send"></Feather>
              <Text>Add {isNote ? "note" : "todo"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ModalRN>
  );
}

async function addNote(note: Partial<Note>) {
  let note_ = {
    text: note.text!,
    time: note.time!,
    type: note.type!,
    scope: note.scope!,
    parentID: note.parentID!,
  };
  if (!note.id) return (await db.insert(notesT).values(note_).returning())[0];
  else
    return (
      await db
        .update(notesT)
        .set(note_)
        .where(eq(notesT.id, note.id))
        .returning()
    )[0];
}

async function delNote(note: Partial<Note>) {
  if (!note.id) return;
  else await db.delete(notesT).where(eq(notesT.id, note.id));
}

const stylesheet = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.zinc[900],
    elevation: 5,
  },
  submit: {
    marginVertical: 4,
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 5,
    backgroundColor: colors.red[700],
  },
});
