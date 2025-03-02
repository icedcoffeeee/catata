import { SafeAreaView, Text, TextInput, View } from "@/components";
import { IonIcons } from "@/components/icons";
import { styles } from "@/styles";
import { longDate, shortDate } from "@/utils";
import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "tailwindcss/colors";

export default function ArchivePage() {
  const [mon, day, yer] = shortDate(new Date())
    .split("/")
    .map((a) => parseInt(a));
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
      <Text style={[styles.mono, stylesheet.title]}>
        {longDate(new Date(yer, mon - 1, day - 1).getTime())}
      </Text>
      {
        //<NotesList notes={notes}></NotesList>
      }
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
  },
});
