import { SafeAreaView, Text, TextInput, View } from "@/components";
import { NotesList } from "@/components/note-list";
import { db, notesT } from "@/db";
import { styles } from "@/styles";
import { getMDY, groupArr, longDate } from "@/utils";
import { useFuzzySearchList } from "@nozbe/microfuzz/react";
import { and, isNull, lt } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import colors from "tailwindcss/colors";

export default function ArchivePage() {
  const { M, D, Y } = getMDY(new Date().getTime());
  const [searched, setSearched] = useState<string>("");

  const { data: notes_ } = useLiveQuery(
    db
      .select()
      .from(notesT)
      .where(
        and(
          isNull(notesT.parentID),
          lt(notesT.time, new Date(Y, M - 1, D).getTime()),
        ),
      ),
  );

  const fuzzy = useFuzzySearchList({
    list: notes_,
    queryText: searched,
    getText: (item) => [longDate(item.time), item.text],
    mapResultItem: ({ item }) => ({ ...item }),
  });

  const groupedArr = groupArr(
    fuzzy.sort((a, b) => b.time - a.time),
    ({ time }) => longDate(time),
  );

  return (
    <SafeAreaView>
      <View style={[styles.row, { alignItems: "center", marginBottom: 15 }]}>
        <TextInput
          placeholder="Search"
          style={stylesheet.searchInput}
          onChangeText={setSearched}
        ></TextInput>
      </View>
      <FlatList
        data={Object.entries(groupedArr)}
        renderItem={({ item: [date, notes] }) => {
          return (
            <>
              <Text style={[styles.mono, stylesheet.title]}>{date}</Text>
              <NotesList notes={notes}></NotesList>
            </>
          );
        }}
      ></FlatList>
    </SafeAreaView>
  );
}

const stylesheet = StyleSheet.create({
  searchInput: {
    flex: 1,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: colors.zinc[800],
    elevation: 5,
  },
  searchButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: colors.zinc[100],
  },
  title: {
    borderTopWidth: 1,
    borderTopColor: colors.zinc[100],
    marginTop: 10,
    marginBottom: 10,
  },
});
