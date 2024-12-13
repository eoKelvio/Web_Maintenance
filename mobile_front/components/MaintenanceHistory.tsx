import React, { useEffect, useState } from "react";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { View, Text, Image, ScrollView } from "react-native";
import { Separator } from "./ui/separator";
import { getMaintenances } from "~/lib/api/maintenances";
import { getParts } from "~/lib/api/used_parts";
import { getTeamById } from "~/lib/api/teams";
import { getMachineById } from "~/lib/api/machines";

// Types for maintenance, parts, team, and machine
interface MaintenanceHistory {
  id: number;
  machine_id: number;
  date: string;
  description: string;
  priority: string;
  status: string;
  team_id: number;
}

interface Part {
  id: number;
  name: string;
  quantity: number;
}

interface Team {
  id: number;
  name: string;
}

interface Machine {
  id: number;
  name: string;
  serial_number: string;
}

// Component to display the maintenance history
export default function MaintenanceHistory() {
  const MACHINE_IMAGE_URI =
    "https://sweetco.com.br/wp-content/uploads/2023/01/CAFE-Aulika-350x350.png";

  const [maintenances, setMaintenances] = useState<MaintenanceHistory[]>([]);
  const [partsByMaintenance, setPartsByMaintenance] = useState<
    Record<number, Part[]>
  >({});
  const [teamsByMaintenance, setTeamsByMaintenance] = useState<
    Record<number, string>
  >({});
  const [machinesByMaintenance, setMachinesByMaintenance] = useState<
    Record<number, { name: string; serial_number: string }>
  >({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaintenanceData = async () => {
      try {
        const maintenancesData = await getMaintenances();
        setMaintenances(maintenancesData);

        const partsData: Record<number, Part[]> = {};
        const teamsData: Record<number, string> = {};
        const machinesData: Record<
          number,
          { name: string; serial_number: string }
        > = {};

        for (const maintenance of maintenancesData) {
          // Fetch parts
          const parts = await getParts(maintenance.id);
          partsData[maintenance.id] = parts;

          // Fetch team name
          const team = await getTeamById(maintenance.team_id);
          teamsData[maintenance.id] = team.name;

          // Fetch machine details
          const machine = await getMachineById(maintenance.machine_id);
          machinesData[maintenance.id] = {
            name: machine.name,
            serial_number: machine.serial_number,
          };
        }

        setPartsByMaintenance(partsData);
        setTeamsByMaintenance(teamsData);
        setMachinesByMaintenance(machinesData);
      } catch (error) {
        console.error(
          "Erro ao buscar dados de manutenção, peças, equipes e máquinas:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMaintenanceData();
  }, []);

  if (loading) {
    return <Text>Carregando histórico de manutenção...</Text>;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {maintenances.map((maintenance) => (
        <View key={maintenance.id}>
          <View className="flex flex-row">
            <View className="w-2/3">
              <CardHeader>
                <CardTitle>
                  {machinesByMaintenance[maintenance.id]?.serial_number ||
                    "Número de série desconhecido"}
                </CardTitle>
                <CardDescription>
                  {machinesByMaintenance[maintenance.id]?.name ||
                    "Nome da máquina desconhecido"}
                </CardDescription>
                <CardDescription>{maintenance.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <View className="flex-row justify-between">
                  <Text className="font-bold text-primary">Data: </Text>
                  <Text className="text-primary">{maintenance.date}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="font-bold text-primary">Realizado por:</Text>
                  <Text className="text-primary">
                    {teamsByMaintenance[maintenance.id] ||
                      "Equipe desconhecida"}
                  </Text>
                </View>
                <Text className="mt-2 font-bold text-primary">
                  Materiais usados:
                </Text>
                {partsByMaintenance[maintenance.id]?.length > 0 ? (
                  partsByMaintenance[maintenance.id].map((part) => (
                    <Text key={part.id} className="ml-4 text-primary">
                      • {part.id}: {part.quantity}
                    </Text>
                  ))
                ) : (
                  <Text className="ml-4 text-primary">
                    Nenhum material usado registrado.
                  </Text>
                )}
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
