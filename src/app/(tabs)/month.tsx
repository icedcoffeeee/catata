import { Text } from "@/components";
import { NotesList } from "@/components/notes";
import { NoteScope, getNotes } from "@/data";
import { useModal } from "@/store";
import { styles } from "@/styles";
import { getFullMDY, getMDY } from "@/utils";
import { FlatList, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";

export default function ThisMonthPage() {
  return <MonthPage date={new Date()}></MonthPage>;
}

const weeks = "MTWTFSS";

export function MonthPage({ date }: { date: Date }) {
  const startWeek = new Date(1, date.getMonth(), 0).getDay();
  const dates = Array(new Date(1, date.getMonth() + 1, -1).getDate() + 1)
    .fill(0)
    .map((_, i) => i + 1);
  const { M: pageMon, Y: pageYear } = getMDY(date.getTime());
  const { M: fullMon, Y: fullYear } = getFullMDY(date.getTime());

  const { open } = useModal();

  return (
    <SafeAreaView>
      <Text style={styles.h1}>
        {fullMon} {fullYear}
      </Text>
      <FlatList
        data={dates}
        contentContainerStyle={styles.scroll}
        renderItem={({ item: date, index }) => {
          const notes = getNotes()
            .filter((n) => {
              const { M, D } = getMDY(n.time);
              return (
                n.scope >= NoteScope.MONTH && M === pageMon && D === index + 1
              );
            })
            .sort((a, b) => b.scope - a.scope);
          const weekday = weeks[(startWeek + date) % weeks.length];
          return (
            <View
              style={[
                styles.row,
                { gap: 15 },
                {
                  marginTop: weekday == "M" ? 10 : 0,
                  borderTopWidth: weekday == "M" ? 1 : 0,
                  borderColor: colors.zinc[100],
                },
              ]}
            >
              <TouchableOpacity
                onPress={() =>
                  open(new Date(pageYear, pageMon - 1, date).getTime())
                }
              >
                <Text style={styles.mono}>
                  {date.toString().padStart(2, "0")} {weekday}
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
