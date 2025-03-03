import { Text } from "@/components";
import { NotesList } from "@/components/notes";
import { db, notesT } from "@/db";
import { styles } from "@/styles";
import { getMDY, longDate } from "@/utils";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ThisDayPage() {
  const { M, D, Y } = getMDY(new Date().getTime());
  return <DayNotes dayTime={new Date(Y, M - 1, D).getTime()}></DayNotes>;
}

export function DayNotes({ dayTime }: { dayTime: number }) {
  const { data: allNotes } = useLiveQuery(db.select().from(notesT));

  const notes = allNotes
    .filter((a) => Math.abs(a.time - dayTime) < 24 * 60 * 60 * 1000)
    .sort((a, b) => a.time - b.time)
    .sort((a, b) => b.scope - a.scope);
  return (
    <SafeAreaView>
      <Text style={[styles.h1, { justifyContent: "space-between" }]}>
        {longDate(dayTime)}
      </Text>
      <NotesList notes={notes.filter((n) => !n.parentID)}></NotesList>
    </SafeAreaView>
  );
}
