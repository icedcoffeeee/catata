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
import { Feather, FontAwesome } from "./icons";
import { styles } from "@/styles";
import { useModal } from "@/store";

export function Modal() {
  const { modal, close, note, newTime } = useModal();

  const input = useRef<TextInputRN>(null);
  setTimeout(() => input.current?.focus(), 100);
  // ^^ pull out keyboard

  const text = note?.text;
  const time = note?.time ?? newTime ?? new Date().getTime();
  const scope = note?.scope ?? NoteScope.DAY;
  const isNote = note ? note.type === NoteType.NOTE : true;

  return (
    <ModalRN
      transparent
      animationType="slide"
      visible={modal}
      onRequestClose={close}
    >
      <LinearGradient
        colors={["#00000088", "#00000000"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 0, y: 0 }}
      >
        <Pressable onPress={close} style={stylesheet.modal}></Pressable>
      </LinearGradient>
      <View style={stylesheet.container}>
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <TouchableOpacity>
            <Text style={styles.mono}>{longDate(time)}</Text>
          </TouchableOpacity>
          <View style={styles.row}>
            <TouchableOpacity>
              <Text>{isNote ? "Note" : "Todo"}</Text>
            </TouchableOpacity>
            <Feather name="minus"></Feather>
            <TouchableOpacity>
              <Text>{["Day", "Month", "Year"][scope]}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <FontAwesome name={isNote ? "circle" : "circle-o"}></FontAwesome>
          <TextInput
            ref={input}
            placeholder={`New ${isNote ? "note" : "todo"}...`}
            value={note?.text}
            multiline
          ></TextInput>
        </View>
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <TouchableOpacity
            style={[
              styles.row,
              stylesheet.submit,
              { opacity: text ? 1 : 0.4 },
              { backgroundColor: colors.blue[500] },
            ]}
            disabled={!!text}
          >
            <Feather name="plus"></Feather>
            <Text>Add subnote</Text>
          </TouchableOpacity>
          <View style={[styles.row, { justifyContent: "flex-end" }]}>
            <TouchableOpacity
              style={[
                styles.row,
                stylesheet.submit,
                { opacity: text ? 1 : 0.4 },
              ]}
            >
              <Feather name="trash"></Feather>
              <Text>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.row,
                stylesheet.submit,
                { opacity: text ? 1 : 0.4 },
              ]}
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

const stylesheet = StyleSheet.create({
  modal: {
    width: "100%",
    height: "100%",
  },
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
