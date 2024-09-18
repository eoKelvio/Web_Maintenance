import React from "react";
import { View, ScrollView, Image } from "react-native";
import { Text } from "~/components/ui/text";
import { H2, P, Large } from "~/components/ui/typography";
import { Separator } from "~/components/ui/separator";
import { useLocalSearchParams } from "expo-router";
import { CardContent } from "~/components/ui/card";
import { useColorScheme } from "~/lib/useColorScheme";

export default function DetailScreen() {
  const { machine } = useLocalSearchParams();
  const machineData = machine ? JSON.parse(machine as string) : null;
  const colorScheme = useColorScheme();
  const MACHINE_URI =
    "https://sweetco.com.br/wp-content/uploads/2023/01/CAFE-Aulika-350x350.png";

  const getStatusColor = (status: string) => {
    if (status === "Rodando") {
      return colorScheme.isDarkColorScheme ? "lightgreen" : "green";
    } else if (status === "Parado") {
      return colorScheme.isDarkColorScheme ? "lightcoral" : "red";
    } else if (status === "Pendente") {
      return colorScheme.isDarkColorScheme ? "yellow" : "orange";
    } else {
      return colorScheme.isDarkColorScheme ? "lightblue" : "blue";
    }
  };

  if (!machineData) {
    return <Text>Erro: Máquina não encontrada!</Text>;
  }

  return (
    <View className="pt-16 pb-2 px-4 h-full w-full gap-4 bg-secondary/30">
      <View>
        <H2 className="mb-4">{machineData.name}</H2>
        <Text
          style={{
            color: getStatusColor(machineData.status),
            position: "absolute",
            right: 5,
          }}
        >
          {machineData.status}
        </Text>
        <View className="flex-row justify-between">
          <View>
            <P className="font-semibold">
              Modelo: <P className="font-normal">{machineData.model}</P>
            </P>
            <P className="font-semibold">
              Localização: <P className="font-normal">{machineData.location}</P>
            </P>
            <P className="font-semibold">
              Série: <P className="font-normal">{machineData.serialNumber}</P>
            </P>
            <P className="font-semibold">
              Fabricação:{" "}
              <P className="font-normal">{machineData.fabricationDate}</P>
            </P>
          </View>
          <Image
            className="h-full w-28 self-center"
            source={{
              uri: MACHINE_URI,
            }}
          />
        </View>
      </View>
      <Large>Histórico de Manutenção:</Large>
      <ScrollView>
        {machineData.maintenanceHistory.map(
          (
            history: {
              date: string;
              performedBy: string;
              description: string;
              materialsUsed: { name: string; quantity: string }[];
            },
            index: number
          ) => (
            <View key={index}>
              <CardContent className="p-2">
                <Text className="font-bold">{history.date}</Text>
                <Text className="text-muted-foreground">
                  Realizado por: {history.performedBy}
                </Text>
                <Text>{history.description}</Text>

                {/* Exibir materiais usados */}
                <View className="mt-2">
                  <Text className="font-bold">Materiais Usados:</Text>
                  {history.materialsUsed.map((material, materialIndex) => (
                    <Text key={materialIndex} className="pl-4">
                      {material.name} - {material.quantity}
                    </Text>
                  ))}
                </View>
              </CardContent>
              <Separator
                orientation="horizontal"
                className="bg-secondary-foreground/40"
              />
            </View>
          )
        )}
      </ScrollView>
    </View>
  );
}
