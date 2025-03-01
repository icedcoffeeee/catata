import { Text } from "@/components";
import { NotesList } from "@/components/notes";
import { getNotes } from "@/data";
import { styles } from "@/styles";
import { longDate, shortDate } from "@/utils";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ThisDayPage() {
  const [mon, day, yer] = shortDate(new Date())
    .split("/")
    .map((a) => parseInt(a));
  return <DayNotes dayEpoch={new Date(yer, mon - 1, day).getTime()}></DayNotes>;
}

export function DayNotes({ dayEpoch }: { dayEpoch: number }) {
  const notes = getNotes()
    .filter((a) => a.epoch - dayEpoch < 24 * 60 * 60 * 1000)
    .sort((a, b) => b.scope - a.scope);
  return (
    <SafeAreaView>
      <Text style={[styles.h1, { justifyContent: "space-between" }]}>
        {longDate(dayEpoch)}
      </Text>
      <NotesList notes={notes}></NotesList>
    </SafeAreaView>
  );
}
