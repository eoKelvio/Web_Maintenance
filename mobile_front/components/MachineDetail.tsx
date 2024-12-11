import React from "react";
import { View, ScrollView, Image } from "react-native";
import { Text } from "~/components/ui/text";
import { P, Large, H2 } from "~/components/ui/typography";
import { Separator } from "~/components/ui/separator";
import { CardContent } from "~/components/ui/card";
import MaintenanceDialog from "~/components/MaintenanceDialog";
import { Button } from "./ui/button";
import { router } from "expo-router";

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

export default function MachineDetail({
  machineData,
  from,
}: MachineDetailProps) {
  const MACHINE_IMAGE_URI =
    "https://sweetco.com.br/wp-content/uploads/2023/01/CAFE-Aulika-350x350.png";

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

      {/* {from === "maintenance" && machineData.status === "Pendente" && (
        <MaintenanceDialog machineData={machineData} />
      )} */}

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
      {/* <ScrollView showsVerticalScrollIndicator={false} style={{ gap: 6 }}>
        {machineData.maintenanceHistory.map((history, index) => (
          <View key={index}>
            <CardContent className="p-2">
              <Text className="font-bold">{history.date}</Text>
              <Text className="text-muted-foreground">
                Realizado por: {history.performedBy}
              </Text>
              <Text>{history.description}</Text>
              <View className="mt-2">
                <Text className="font-bold">Materiais Usados:</Text>
                {history.materialsUsed.map((material, materialIndex) => (
                  <Text key={materialIndex} className="pl-4">
                    {material.material} - {material.quantity}
                  </Text>
                ))}
              </View>
            </CardContent>
            <Separator
              orientation="horizontal"
              className="bg-secondary-foreground/40"
            />
          </View>
        ))}
      </ScrollView> */}
    </View>
  );
}
