import { useLocalSearchParams } from "expo-router";
import { MonthPage } from "./(tabs)/month";
import { LinearGradient } from "expo-linear-gradient";
import { bg_gradient } from "./_layout";

export default function AnyMonthPage() {
  const search = useLocalSearchParams<{ "year-month": string }>();
  const [year, month] = search["year-month"].split("-").map((a) => parseInt(a));

  return (
    <LinearGradient {...bg_gradient} style={{ padding: 20 }}>
      <MonthPage date={new Date(year, month - 1)} back></MonthPage>
    </LinearGradient>
  );
}
