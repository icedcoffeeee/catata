import { SafeAreaView, Text } from "@/components";
import { NotesList } from "@/components/note-list";
import { db, notesT } from "@/db";
import { styles } from "@/styles";
import { getMDY, longDate } from "@/utils";
import { and, gte, isNull, lt } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";

export default function ThisDayPage() {
  const { M, D, Y } = getMDY(new Date().getTime());
  return <DayNotes dayTime={new Date(Y, M - 1, D).getTime()}></DayNotes>;
}

const _24h = 24 * 60 * 60 * 1000;

export function DayNotes({ dayTime }: { dayTime: number }) {
  const { data: notes_ } = useLiveQuery(
    db
      .select()
      .from(notesT)
      .where(
        and(
          isNull(notesT.parentID),
          lt(notesT.time, dayTime + _24h),
          gte(notesT.time, dayTime),
        ),
      ),
  );

  const notes = notes_
    .sort((a, b) => a.time - b.time)
    .sort((a, b) => b.scope - a.scope);
  return (
    <SafeAreaView>
      <Text style={[styles.h1, { justifyContent: "space-between" }]}>
        {longDate(dayTime)}
      </Text>
      <NotesList notes={notes}></NotesList>
    </SafeAreaView>
  );
}
