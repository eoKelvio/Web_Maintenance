import { View, Text } from "react-native";
import DashCards from "~/components/DashCards";
import MaintenanceChart from "~/components/DashChart";
import { Separator } from "~/components/ui/separator";

export default function Home() {
  return (
    <View className="h-full bg-secondary/30">
      <DashCards />
      <Separator
        orientation="horizontal"
        className="bg-secondary-foreground/40"
      />
      <MaintenanceChart />
    </View>
  );
}
