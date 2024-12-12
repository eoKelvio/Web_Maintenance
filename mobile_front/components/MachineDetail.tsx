import React, { useEffect, useState } from "react";
import { View, ScrollView, Image } from "react-native";
import { Text } from "~/components/ui/text";
import { P, Large, H2 } from "~/components/ui/typography";
import { Separator } from "~/components/ui/separator";
import { CardContent } from "~/components/ui/card";
import MaintenanceDialog from "~/components/MaintenanceDialog";
import { Button } from "./ui/button";
import { router } from "expo-router";
import { getMaintenances } from "~/lib/api/maintenances";
import { getParts } from "~/lib/api/parts";

interface MachineDetailProps {
  machineData: {
    id: number;
    name: string;
    type: string;
    local: string;
    serial_number: string;
    fabrication_date: string;
    status: string;
  };
  from: string;
}

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
  cost: number;
}

export default function MachineDetail({
  machineData,
  from,
}: MachineDetailProps) {
  const MACHINE_IMAGE_URI =
    "https://sweetco.com.br/wp-content/uploads/2023/01/CAFE-Aulika-350x350.png";

  const [maintenanceHistory, setMaintenanceHistory] = useState<
    MaintenanceHistory[]
  >([]);
  const [partsByMaintenance, setPartsByMaintenance] = useState<
    Record<number, Part[]>
  >({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaintenanceData = async () => {
      try {
        const maintenances = await getMaintenances();
        const machineMaintenances = maintenances.filter(
          (maintenance: MaintenanceHistory) =>
            maintenance.machine_id === machineData.id
        );
        setMaintenanceHistory(machineMaintenances);

        // Fetch parts for each maintenance
        const partsData: Record<number, Part[]> = {};
        for (const maintenance of machineMaintenances) {
          const parts = await getParts(maintenance.id);
          partsData[maintenance.id] = parts;
        }
        setPartsByMaintenance(partsData);
      } catch (error) {
        console.error("Erro ao buscar dados de manutenção e peças:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaintenanceData();
  }, [machineData.id]);

  return (
    <View className="py-2 px-4 h-full w-full gap-4 bg-secondary/30">
      <View className="flex-row justify-between">
        <View>
          {from === "pending" && <H2>{machineData.name}</H2>}
          <P className="font-semibold">
            Modelo: <P className="font-normal">{machineData.type}</P>
          </P>
          <P className="font-semibold">
            Localização: <P className="font-normal">{machineData.local}</P>
          </P>
          <P className="font-semibold">
            Série: <P className="font-normal">{machineData.serial_number}</P>
          </P>
          <P className="font-semibold">
            Fabricação:{" "}
            <P className="font-normal">{machineData.fabrication_date}</P>
          </P>
        </View>
        <Image
          className="h-full w-28 self-center"
          source={{ uri: MACHINE_IMAGE_URI }}
        />
      </View>

      {from === "pending" && (
        <Button
          onPress={() => {
            router.push({
              pathname: "/close_maintenance",
              params: { machine: JSON.stringify(machineData) },
            });
          }}
        >
          <Text>Encerrar Manutenção</Text>
        </Button>
      )}

      <Large>Histórico de Manutenção:</Large>
      {loading ? (
        <Text>Carregando histórico...</Text>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={{ gap: 6 }}>
          {maintenanceHistory.map((history) => (
            <View key={history.id}>
              <CardContent className="p-2">
                <Text className="font-bold">{history.date}</Text>
                <Text className="text-muted-foreground">
                  Realizado por: {history.team_id}
                </Text>
                <Text>{history.description}</Text>
                <View className="mt-2">
                  <Text className="font-bold">Materiais Usados:</Text>
                  {partsByMaintenance[history.id]?.map((part) => (
                    <Text key={part.id} className="pl-4">
                      {part.id} - {part.quantity}
                    </Text>
                  )) || <Text>Nenhum material usado registrado.</Text>}
                </View>
              </CardContent>
              <Separator
                orientation="horizontal"
                className="bg-secondary-foreground/40"
              />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
