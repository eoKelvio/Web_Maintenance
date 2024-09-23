import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { View, Text, Image, ScrollView } from "react-native";
import { maintenances } from "~/data/mock_maintenances";
import { machines } from "~/data/mock_machines";
import { Separator } from "./ui/separator";

// Component to display the maintenance history
export default function MaintenanceHistory() {
  // URI for the machine image
  const MACHINE_IMAGE_URI =
    "https://sweetco.com.br/wp-content/uploads/2023/01/CAFE-Aulika-350x350.png";

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {maintenances.map((maintenance) => (
        <View key={maintenance.id}>
          <View className="flex flex-row">
            <View className="w-2/3">
              <CardHeader>
                <CardTitle>
                  {machines[maintenance.machineId - 1].serialNumber}
                </CardTitle>
                <CardDescription>
                  {machines[maintenance.machineId - 1].name}
                </CardDescription>
                <CardDescription>{maintenance.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <View className="flex-row justify-between">
                  <Text className="font-bold text-primary">Data: </Text>
                  <Text className="text-primary">{maintenance.date}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="font-bold text-primary">
                    Realizado por:{" "}
                  </Text>
                  <Text className="text-primary">
                    {maintenance.performedBy}
                  </Text>
                </View>
                <Text className="mt-2 font-bold text-primary">
                  Materiais usados:
                </Text>
                {maintenance.materialsUsed.map((material, index) => (
                  <Text key={index} className="ml-4 text-primary">
                    • {material.itemName}: {material.quantity}
                  </Text>
                ))}
              </CardContent>
            </View>
            <Image
              className="self-center flex-1 h-32"
              source={{
                uri: MACHINE_IMAGE_URI,
              }}
            />
          </View>
          <Separator orientation="horizontal" />
        </View>
      ))}
    </ScrollView>
  );
}
