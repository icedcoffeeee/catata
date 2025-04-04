import { LinearGradient } from "expo-linear-gradient";
import { useRef } from "react";
import type { TouchableOpacityProps } from "react-native";
import {
  Modal,
  Pressable,
  StyleSheet,
  TextInput as TextInputRN,
  TouchableOpacity,
  View,
} from "react-native";
import { Text, TextInput } from ".";
import { FGlyphs, Feather, FontAwesome, IonIcons } from "./icons";
import { styles } from "@/styles";
import { longDate } from "@/utils";
import { create } from "zustand";
import type { NoteI } from "@/db";
import { NoteScope, NoteType, addNote, delNote } from "@/db";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { theme, useTheme } from "@/colors";

type NoteModal = {
  shown: boolean;

  note?: NoteI;
  parent?: NoteI;
  time?: number;
  scope?: NoteScope;

  open(param: Partial<NoteModal>): void;
  close(): void;
  clear(): void;
  set(note: NoteI): void;
};

const defaultNote: NoteI = {
  id: undefined,
  text: "",
  time: new Date().getTime(),
  type: NoteType.NOTE,
  scope: NoteScope.DAY,
  parentID: null,
};

const defaultModal = {
  shown: false,
  editDate: false,
  note: undefined,
  parent: undefined,
  time: undefined,
  scope: undefined,
};

export const useNoteModal = create<NoteModal>((set) => ({
  ...defaultModal,

  open: (params) => set({ shown: true, ...params }),
  close: () => set({ ...defaultModal, shown: false }),
  clear: () => set({ ...defaultModal, shown: true }),
  set: (note) => set({ note }),
}));

export function NoteModal() {
  const input = useRef<TextInputRN>(null);
  setTimeout(() => input.current?.focus(), 100);
  // ^^ pull out keyboard

  const th = useTheme(({ th }) => th);

  let { note: selected, parent, time, scope, ...modal } = useNoteModal();
  const note: NoteI = { ...defaultNote, ...selected };
  if (time) note.time = time;
  if (scope) note.scope = scope;

  const typeNote = note.type === NoteType.NOTE;

  return (
    <Modal
      transparent
      animationType="slide"
      visible={modal.shown}
      onRequestClose={modal.close}
    >
      <LinearGradient
        colors={["#00000088", "#00000000"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 0, y: 0 }}
      >
        <Pressable onPress={modal.close} style={styles.modal}></Pressable>
      </LinearGradient>

      <View style={[stylesheet.container, { backgroundColor: theme[th].bg2 }]}>
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <TouchableOpacity
            onPress={() =>
              DateTimePickerAndroid.open({
                mode: "date",
                value: new Date(note.time),
                onChange: ({ type }, date) => {
                  switch (type) {
                    case "set":
                      modal.open({ time: date?.getTime() });
                      break;
                    default:
                      break;
                  }
                },
              })
            }
          >
            <Text
              style={{
                borderBottomWidth: 1,
                borderBottomColor: theme[th].text,
                borderStyle: "dashed",
              }}
            >
              {longDate(note.time)}
            </Text>
          </TouchableOpacity>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => modal.set({ ...note, type: (note.type + 1) % 2 })}
            >
              <Text
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: theme[th].text,
                  borderStyle: "dashed",
                }}
              >
                {typeNote ? "Note" : "Todo"}
              </Text>
            </TouchableOpacity>
            <Text>/</Text>
            <TouchableOpacity
              onPress={() =>
                modal.set({ ...note, scope: (note.scope + 1) % 3 })
              }
            >
              <Text
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: theme[th].text,
                  borderStyle: "dashed",
                }}
              >
                {["Day", "Month", "Year"][note.scope]}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {parent && (
          <View
            style={[
              styles.row,
              { opacity: 0.7, transform: [{ translateY: 8 }] },
            ]}
          >
            <IonIcons name="return-up-forward"></IonIcons>
            <Text>{parent.text}</Text>
          </View>
        )}

        <View style={styles.row}>
          <FontAwesome name={typeNote ? "circle" : "circle-o"}></FontAwesome>
          <TextInput
            ref={input}
            placeholder={`New ${typeNote ? "note" : "todo"}...`}
            defaultValue={note?.text}
            onChangeText={(text) => modal.set({ ...note, text })}
            style={{ width: "95%" }}
            multiline
          ></TextInput>
        </View>

        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <Button
            icon="plus"
            style={{ backgroundColor: theme[th].accent1 }}
            onPress={async () => {
              note.parentID = parent?.id;
              const newParent = await addNote(note);
              modal.clear();
              modal.open({
                parent: newParent,
                time: newParent?.time ?? defaultNote.time,
                scope: newParent?.scope ?? defaultNote.scope,
              });
            }}
            disabled={!note.text}
          >
            Add subnote
          </Button>
          <View style={[styles.row, { justifyContent: "flex-end" }]}>
            <Button
              icon="trash"
              onPress={async () => {
                await delNote(note);
                modal.close();
              }}
              disabled={!note.text}
            >
              Delete
            </Button>
            <Button
              icon="send"
              onPress={async () => {
                note.parentID = parent?.id;
                await addNote(note);
                modal.clear();
                if (parent)
                  modal.open({
                    parent,
                    time: parent?.time ?? defaultNote.time,
                    scope: parent?.scope ?? defaultNote.scope,
                  });
              }}
              disabled={!note.text}
            >
              {selected?.id ? "Update" : "Add"} {typeNote ? "note" : "todo"}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function Button({
  icon,
  children,
  style,
  ...props
}: TouchableOpacityProps & { icon: FGlyphs }) {
  const th = useTheme(({ th }) => th);
  const note = useNoteModal((n) => n.note);
  return (
    <TouchableOpacity
      style={[
        styles.row,
        stylesheet.button,
        { backgroundColor: theme[th].accent2 },
        { opacity: !!note?.text ? 1 : 0.4 },
        style,
      ]}
      {...props}
    >
      <Feather name={icon}></Feather>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
}

const stylesheet = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  button: {
    marginVertical: 4,
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 5,
  },
});
