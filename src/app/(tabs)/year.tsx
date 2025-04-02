import { SafeAreaView, Text, View } from "@/components";
import { NotesList } from "@/components/note-list";
import { NoteScope, db, notesT } from "@/db";
import { styles } from "@/styles";
import { getFullMDY, getMDY } from "@/utils";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { eq } from "drizzle-orm";
import { router } from "expo-router";
import { Feather } from "@/components/icons";
import { theme, useTheme } from "@/colors";

export default function YearPage() {
  const [year, setYear] = useState(new Date().getFullYear());
  const months = Array(12)
    .fill("")
    .map((_, i) => getFullMDY(new Date(1, i + 1).getTime()).M);

  const th = useTheme(({ th }) => th);
  const { data: notes_ } = useLiveQuery(
    db.select().from(notesT).where(eq(notesT.scope, NoteScope.YEAR)),
  );

  return (
    <SafeAreaView>
      <View style={[styles.row, { alignSelf: "center" }]}>
        <TouchableOpacity onPress={() => setYear(year - 1)}>
          <Feather name="chevron-left" size={20}></Feather>
        </TouchableOpacity>
        <Text style={styles.h1}>{year}</Text>
        <TouchableOpacity onPress={() => setYear(year + 1)}>
          <Feather name="chevron-right" size={20}></Feather>
        </TouchableOpacity>
      </View>
      <FlatList
        data={months}
        renderItem={({ item: month, index: mon }) => {
          const notes = notes_.filter((n) => {
            const { M, Y } = getMDY(n.time);
            return M === mon + 1 && Y === year;
          });
          return (
            <View
              style={{
                marginBottom: 15,
                borderTopWidth: 1,
                borderColor: theme[th].text,
              }}
            >
              <TouchableOpacity
                onPress={() => router.push(`${year}-${mon + 1}`)}
              >
                <Text style={[styles.mono, { marginBottom: 5 }]}>{month}</Text>
              </TouchableOpacity>
              <NotesList notes={notes} dates nochildren></NotesList>
            </View>
          );
        }}
      ></FlatList>
    </SafeAreaView>
  );
}
