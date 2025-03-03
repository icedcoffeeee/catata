import { Text } from "@/components";
import { NotesList } from "@/components/notes";
import { getNotes } from "@/data";
import { styles } from "@/styles";
import { getMDY, longDate } from "@/utils";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ThisDayPage() {
  const { M, D, Y } = getMDY(new Date().getTime());
  return <DayNotes dayTime={new Date(Y, M - 1, D).getTime()}></DayNotes>;
}

export function DayNotes({ dayTime }: { dayTime: number }) {
  const notes = getNotes()
    .filter((a) => Math.abs(a.time - dayTime) < 24 * 60 * 60 * 1000)
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
