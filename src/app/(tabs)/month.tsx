import { Text } from "@/components";
import { NotesList } from "@/components/notes";
import { NoteScope, getNotes } from "@/data";
import { styles } from "@/styles";
import { longDate } from "@/utils";
import { FlatList, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ThisMonthPage() {
  return <MonthPage date={new Date()}></MonthPage>;
}

const weeks = "MTWTFSS";

export function MonthPage({ date }: { date: Date }) {
  const startWeek = new Date(1, date.getMonth(), 0).getDay();
  const dates = Array(new Date(1, date.getMonth() + 1, -1).getDate() + 1)
    .fill(0)
    .map((_, i) => i + 1);
  return (
    <SafeAreaView>
      <Text style={styles.h1}>
        {longDate(date).split(" ")[0]} {longDate(date).split(" ")[2]}
      </Text>
      <FlatList
        data={dates}
        contentContainerStyle={styles.scroll}
        renderItem={({ item: date }) => {
          const notes = getNotes()
            .filter(
              (n) =>
                n.scope >= NoteScope.MONTH &&
                new Date(n.epoch).getDate() === date,
            )
            .sort((a, b) => b.scope - a.scope);
          return (
            <View
              style={{ flexDirection: "row", alignItems: "baseline", gap: 15 }}
            >
              <TouchableOpacity>
                <Text style={styles.mono}>
                  {date.toString().padStart(2, "0")}{" "}
                  {weeks[(startWeek + date) % weeks.length]}
                </Text>
              </TouchableOpacity>
              <NotesList notes={notes}></NotesList>
            </View>
          );
        }}
      ></FlatList>
    </SafeAreaView>
  );
}
