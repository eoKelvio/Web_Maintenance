import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { Muted } from "./ui/typography";
import { getMaintenances } from "~/lib/api/maintenances"; // Importar função da API
import { getMachines } from "~/lib/api/machines"; // Função para obter máquinas

interface Machine {
  id: number;
  serialNumber: string;
  name: string;
  location: string;
  maintenanceHistory: Maintenance[];
}

interface Maintenance {
  id: number;
  machine_id: number;
  date: string;
  description: string;
  priority: string;
  status: string;
  team_id: number;
}

// Component to display pending maintenance machines
export default function MaintenancePending() {
  const [pendingMachines, setPendingMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingMaintenances = async () => {
      try {
        setLoading(true);

        // Fetch all maintenances and filter those with "Pending" status
        const maintenances = await getMaintenances();
        const pendingMaintenances = maintenances.filter(
          (m: Maintenance) => m.status === "Pending"
        );

        // Fetch machine details
        const machines = await getMachines();

        // Map pending maintenances to machine details
        const machinesWithPendingMaintenances = machines
          .map((machine: Machine) => {
            const machineMaintenances = pendingMaintenances.filter(
              (m: { machine_id: number }) => m.machine_id === machine.id
            );
            if (machineMaintenances.length > 0) {
              return {
                ...machine,
                maintenanceHistory: machineMaintenances,
              };
            }
            return null;
          })
          .filter(Boolean); // Remove null values

        setPendingMachines(machinesWithPendingMaintenances as Machine[]);
      } catch (error) {
        console.error("Erro ao buscar manutenções pendentes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingMaintenances();
  }, []);

  if (loading) {
    return <Text>Carregando manutenções pendentes...</Text>;
  }

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
                  status: machine.maintenanceHistory[0]?.status,
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
        <View className="p-4">
          <Text className="text-center text-primary">
            Sem manutenções pendentes.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
