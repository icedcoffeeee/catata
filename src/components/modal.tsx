import {
  Modal as ModalRN,
  Pressable,
  StyleSheet,
  TextInput as TextInputRN,
  TouchableOpacity,
  View,
} from "react-native";
import { Text, TextInput } from ".";
import colors from "tailwindcss/colors";
import { UseState, longDate } from "@/utils";
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import { Note, NoteScope } from "@/data";
import { Feather, FontAwesome } from "./icons";
import { styles } from "@/styles";

type Modal = {
  state: UseState<boolean>;
  note?: Note;
};
export function Modal({ state, note }: Modal) {
  const [modal, setModal] = state;
  const close = () => setModal(false);

  const input = useRef<TextInputRN>(null);
  setTimeout(() => input.current?.focus(), 100);
  // ^^ pull out keyboard

  const [text, setText] = useState(note?.text);
  const [epoch, setEpoch] = useState(note?.epoch ?? new Date().getTime());
  const [scope, setScope] = useState(note?.scope ?? NoteScope.DAY);
  const [isNote, setIsNote] = useState(true);

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
            <Text style={styles.mono}>{longDate(epoch)}</Text>
          </TouchableOpacity>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => setIsNote(!isNote)}>
              <Text>{isNote ? "Note" : "Todo"}</Text>
            </TouchableOpacity>
            <Feather name="minus"></Feather>
            <TouchableOpacity onPress={() => setScope((scope + 1) % 3)}>
              <Text>{["Day", "Month", "Year"][scope]}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <FontAwesome name={isNote ? "circle" : "circle-o"}></FontAwesome>
          <TextInput
            ref={input}
            placeholder={`New ${isNote ? "note" : "todo"}...`}
            value={text}
            onChangeText={(text) => setText(text)}
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
