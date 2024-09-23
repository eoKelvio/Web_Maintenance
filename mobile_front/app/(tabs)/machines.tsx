import React from "react";
import { ScrollView, View } from "react-native";
import { Text } from "~/components/ui/text";
import { Input } from "~/components/ui/input";
import { Card, CardTitle, CardContent, CardHeader } from "~/components/ui/card";
import { machines } from "~/data/mock_machines";
import { router } from "expo-router";
import { Muted } from "~/components/ui/typography";
import { useColorScheme } from "~/lib/useColorScheme";
import { MachineDetailParams } from "~/data/types";

export default function MachinesScreen() {
  const [value, setValue] = React.useState("");
  const colorScheme = useColorScheme(); // Detecção do tema claro ou escuro

  // Definir as cores com base no tema e status da máquina
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

  const onChangeText = (text: string) => {
    setValue(text);
  };

  return (
    <View className="p-3 pb-0 gap-2 bg-secondary/30 h-full">
      <View>
        <Input
          placeholder="Pesquisar"
          value={value}
          onChangeText={onChangeText}
          aria-labelledby="inputLabel"
          aria-errormessage="inputError"
        />
      </View>
      <ScrollView
        contentContainerClassName="gap-3"
        showsVerticalScrollIndicator={false}
      >
        {machines.map((machine, index) => (
          <Card
            key={index}
            onTouchEndCapture={() =>
              router.push({
                pathname: "/machine_detail",
                params: {
                  machine: JSON.stringify(machine),
                  title: machine.name,
                  status: machine.status,
                } as MachineDetailParams,
              })
            }
          >
            <CardHeader className="flex flex-row justify-between">
              <CardTitle>{machine.serialNumber}</CardTitle>
              <Muted
                style={{
                  color: getStatusColor(machine.status),
                }}
              >
                {machine.status}
              </Muted>
            </CardHeader>
            <CardContent>
              <Text>Nome: {machine.name}</Text>
              <View className="flex-row justify-between">
                <Text>Localização: {machine.location}</Text>
                <Muted>Detalhes</Muted>
              </View>
            </CardContent>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}
