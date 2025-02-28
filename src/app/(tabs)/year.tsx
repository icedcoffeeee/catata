import { Text } from "@/components";
import { NotesList } from "@/components/notes";
import { NoteType, getNotes } from "@/data";
import { styles } from "@/styles";
import { longDate } from "@/utils";
import { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";

export default function YearPage() {
  const [year, setYear] = useState(new Date().getFullYear());
  const months = Array(12)
    .fill("")
    .map((_, i) => longDate(new Date(1, i + 1)).split(" ")[0]);
  return (
    <SafeAreaView>
      <TouchableOpacity>
        <Text style={styles.h1}>{year}</Text>
      </TouchableOpacity>
      <FlatList
        data={months}
        renderItem={({ item: month, index }) => {
          const notes = getNotes().filter(
            (n) =>
              n.type === NoteType.YEAR &&
              new Date(n.epoch).getMonth() === index,
          );
          return (
            <View
              style={{
                marginBottom: 15,
                borderTopWidth: 1,
                borderColor: colors.zinc[100],
              }}
            >
              <TouchableOpacity>
                <Text>{month}</Text>
              </TouchableOpacity>
              <NotesList notes={notes}></NotesList>
            </View>
          );
        }}
      ></FlatList>
    </SafeAreaView>
  );
}
