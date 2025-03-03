import { SafeAreaView, Text, TextInput, View } from "@/components";
import { IonIcons } from "@/components/icons";
import { NotesList } from "@/components/notes";
import { getNotes } from "@/data";
import { styles } from "@/styles";
import { getMDY, groupArr, longDate } from "@/utils";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import colors from "tailwindcss/colors";

export default function ArchivePage() {
  const { M: M_, D: D_, Y: Y_ } = getMDY(new Date().getTime());
  const groupedArr = groupArr(
    getNotes().filter((n) => {
      const { M, D, Y } = getMDY(n.time);
      return (
        new Date(Y_, M_, D_).getTime() - new Date(Y, M, D).getTime() >
        24 * 60 * 60 * 1000
      );
    }),
    ({ time }) => longDate(time),
  );

  return (
    <SafeAreaView>
      <View style={[styles.row, { alignItems: "center", marginBottom: 15 }]}>
        <TextInput
          placeholder="Search"
          style={stylesheet.searchInput}
        ></TextInput>
        <TouchableOpacity style={stylesheet.searchButton}>
          <IonIcons name="search" size={15} color={colors.zinc[950]}></IonIcons>
        </TouchableOpacity>
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
