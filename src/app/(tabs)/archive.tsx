import { SafeAreaView, Text, TextInput, View } from "@/components";
import { IonIcons } from "@/components/icons";
import { longDate, shortDate } from "@/utils";
import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "tailwindcss/colors";

export default function ArchivePage() {
  const [mon, day, yer] = shortDate(new Date())
    .split("/")
    .map((a) => parseInt(a));
  return (
    <SafeAreaView>
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 15 }}>
        <TextInput placeholder="Search" style={style.searchInput}></TextInput>
        <TouchableOpacity style={style.searchButton}>
          <IonIcons name="search" size={15} color={colors.zinc[950]}></IonIcons>
        </TouchableOpacity>
      </View>
      <Text style={{ borderTopWidth: 1, borderTopColor: colors.zinc[100] }}>
        {longDate(new Date(yer, mon - 1, day - 1).getTime())}
      </Text>
      {
        //<NotesList notes={notes}></NotesList>
      }
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
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
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: colors.zinc[100],
  },
});
