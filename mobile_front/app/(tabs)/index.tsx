import { View, Text } from "react-native";
import DashCards from "~/components/DashCards";
import MaintenanceChart from "~/components/DashChart";
import { Separator } from "~/components/ui/separator";

export default function Home() {
  return (
    <View className="h-screen bg-secondary/30">
      <Text className="self-center text-2xl font-bold text-primary py-5 pt-20">
        RECARO
      </Text>
      <DashCards />
      <Separator
        orientation="horizontal"
        className="bg-secondary-foreground/40"
      />
      <MaintenanceChart />
    </View>
  );
}
