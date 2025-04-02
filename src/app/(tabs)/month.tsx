import { SafeAreaView, Text, View } from "@/components";
import { useNoteModal } from "@/components/note-modal";
import { NotesList } from "@/components/note-list";
import { NoteScope, db, notesT } from "@/db";
import { styles } from "@/styles";
import { getFullMDY, getMDY } from "@/utils";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { FlatList, TouchableOpacity } from "react-native";
import { eq, or } from "drizzle-orm";
import { Feather } from "@/components/icons";
import { router } from "expo-router";
import { theme, useTheme } from "@/colors";

export default function ThisMonthPage() {
  return <MonthPage date={new Date()}></MonthPage>;
}

const weeks = "MTWTFSS";

export function MonthPage({ date, back }: { date: Date; back?: boolean }) {
  const th = useTheme(({ th }) => th);
  const startWeek = new Date(1, date.getMonth(), 0).getDay();
  const dates = Array(new Date(1, date.getMonth() + 1, -1).getDate() + 1)
    .fill(0)
    .map((_, i) => i + 1);

  const { M: pageMon, Y: pageYear } = getMDY(date.getTime());
  const { M: fullMon, Y: fullYear } = getFullMDY(date.getTime());

  const { data: notes_ } = useLiveQuery(
    db
      .select()
      .from(notesT)
      .where(
        or(eq(notesT.scope, NoteScope.MONTH), eq(notesT.scope, NoteScope.YEAR)),
      ),
  );

  const modal = useNoteModal();

  return (
    <SafeAreaView>
      <View style={styles.row}>
        {back && (
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="chevron-left" size={20}></Feather>
          </TouchableOpacity>
        )}
        <Text style={styles.h1}>
          {fullMon} {fullYear}
        </Text>
      </View>
      <FlatList
        data={dates}
        contentContainerStyle={styles.scroll}
        renderItem={({ item: date }) => {
          const notes = notes_
            .filter((n) => {
              const { M, D, Y } = getMDY(n.time);
              return Y === pageYear && M === pageMon && D === date;
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
                  borderColor: theme[th].text,
                },
              ]}
            >
              <TouchableOpacity
                onPress={() =>
                  modal.open({
                    time: new Date(pageYear, pageMon - 1, date).getTime(),
                    scope: !back ? NoteScope.MONTH : NoteScope.YEAR,
                  })
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
