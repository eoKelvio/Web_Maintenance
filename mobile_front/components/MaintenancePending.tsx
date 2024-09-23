import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { ScrollView, Text } from "react-native";
import { machines } from "~/data/mock_machines";
import { router } from "expo-router";
import { Muted } from "./ui/typography";

export default function MaintenancePending() {
  const pendingMachines = machines.filter((m) => m.status === "Pendente");
  return (
    <ScrollView
      contentContainerClassName="gap-2"
      showsVerticalScrollIndicator={false}
    >
      {pendingMachines.length > 0 ? (
        pendingMachines.map((machine) => (
          <Card
            key={machine.serialNumber}
            onTouchEndCapture={() =>
              router.push({
                pathname: "/machine_detail",
                params: {
                  machine: JSON.stringify(machine),
                  title: machine.name,
                  status: machine.status,
                  from: "maintenance",
                },
              })
            }
          >
            <CardHeader>
              <CardTitle>{machine.serialNumber}</CardTitle>
              <CardDescription>{machine.name}</CardDescription>
              <CardDescription>{machine.location}</CardDescription>
              <CardContent className="p-0 flex-row justify-between">
                <Text className="text-primary">
                  {machine.maintenanceHistory[0]?.description ||
                    "Sem manutenções"}
                </Text>
                <Muted>Detalhes</Muted>
              </CardContent>
            </CardHeader>
          </Card>
        ))
      ) : (
        <Text>Sem manutenções pendentes.</Text>
      )}
    </ScrollView>
  );
}
