import { Text } from "@/components";
import { NotesList } from "@/components/notes";
import { NoteScope, getNotes } from "@/data";
import { styles } from "@/styles";
import { longDate, shortDate } from "@/utils";
import { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";

export default function YearPage() {
  const [year, _setYear] = useState(new Date().getFullYear());
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
        renderItem={({ item: month, index: mon }) => {
          const notes = getNotes().filter((n) => {
            const [mon_, _day, year_] = shortDate(n.epoch)
              .split("/")
              .map((a) => parseInt(a));
            return (
              n.scope === NoteScope.YEAR && mon_ === mon + 1 && year_ === year
            );
          });
          return (
            <View
              style={{
                marginBottom: 15,
                borderTopWidth: 1,
                borderColor: colors.zinc[100],
              }}
            >
              <TouchableOpacity>
                <Text style={[styles.mono, { marginBottom: 5 }]}>{month}</Text>
              </TouchableOpacity>
              <NotesList notes={notes} dates></NotesList>
            </View>
          );
        }}
      ></FlatList>
    </SafeAreaView>
  );
}
