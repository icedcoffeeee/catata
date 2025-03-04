import { Text } from "@/components";
import { useModal } from "@/components/modal";
import { NotesList } from "@/components/notes";
import { NoteScope, db, notesT } from "@/db";
import { styles } from "@/styles";
import { getFullMDY, getMDY } from "@/utils";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";

export default function YearPage() {
  const [year, _setYear] = useState(new Date().getFullYear());
  const months = Array(12)
    .fill("")
    .map((_, i) => getFullMDY(new Date(1, i + 1).getTime()).M);

  const { data: allNotes } = useLiveQuery(db.select().from(notesT));

  const { openEmpty } = useModal();

  return (
    <SafeAreaView>
      <TouchableOpacity>
        <Text style={styles.h1}>{year}</Text>
      </TouchableOpacity>
      <FlatList
        data={months}
        renderItem={({ item: month, index: mon }) => {
          const notes = allNotes.filter((n) => {
            const { M, Y } = getMDY(n.time);
            return n.scope === NoteScope.YEAR && M === mon + 1 && Y === year;
          });
          return (
            <View
              style={{
                marginBottom: 15,
                borderTopWidth: 1,
                borderColor: colors.zinc[100],
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  openEmpty({
                    time: new Date(year, mon, 1).getTime(),
                    scope: NoteScope.YEAR,
                  })
                }
              >
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
