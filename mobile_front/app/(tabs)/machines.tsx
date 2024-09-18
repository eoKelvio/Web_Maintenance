import React from "react";
import { ScrollView, View } from "react-native";
import { Text } from "~/components/ui/text";
import { Input } from "~/components/ui/input";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import machines from "~/data/machines";
import { router } from "expo-router";
import { Muted } from "~/components/ui/typography";
import { useColorScheme } from "~/lib/useColorScheme";

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
    <View className="pt-12 gap-2 bg-secondary/30 h-full">
      <View className="px-3">
        <Input
          placeholder="Pesquisar"
          value={value}
          onChangeText={onChangeText}
          aria-labelledby="inputLabel"
          aria-errormessage="inputError"
        />
      </View>
      <ScrollView className="px-4">
        {machines.map((machine, index) => (
          <Card
            className="p-4 my-1"
            key={index}
            onTouchEndCapture={() =>
              router.push({
                pathname: "/machine_detail",
                params: { machine: JSON.stringify(machine) },
              })
            }
          >
            <View className="flex flex-row justify-between">
              <CardTitle>{machine.name}</CardTitle>
              <Muted
                style={{
                  color: getStatusColor(machine.status),
                }}
              >
                {machine.status}
              </Muted>
            </View>
            <CardDescription>Modelo: {machine.model}</CardDescription>
            <CardContent className="p-0">
              <Text>{machine.location}</Text>
            </CardContent>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}
