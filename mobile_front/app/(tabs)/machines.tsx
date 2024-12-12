import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Text } from "~/components/ui/text";
import { Input } from "~/components/ui/input";
import { Card, CardTitle, CardContent, CardHeader } from "~/components/ui/card";
import { router } from "expo-router";
import { Muted } from "~/components/ui/typography";
import { useColorScheme } from "~/lib/useColorScheme";
import { getMachines } from "~/lib/api/machines";

interface Machine {
  id: number;
  name: string;
  type: string;
  local: string;
  fabrication_date: string;
  serial_number: string;
  status: string; // Adicionado apenas para exibição
}

export default function MachinesScreen() {
  const [value, setValue] = useState("");
  const [machines, setMachines] = useState<Machine[]>([]);
  const colorScheme = useColorScheme();

  // Fetch machines from backend
  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const data = await getMachines();
        // Adicionando um status padrão para cada máquina
        const machinesWithStatus = data.map((machine: any) => ({
          ...machine,
          status: "Rodando", // Status padrão
        }));
        setMachines(machinesWithStatus);
      } catch (error) {
        console.error("Erro ao carregar máquinas:", error);
      }
    };

    fetchMachines();
  }, []);

  // Get color based on machine status and color scheme
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
        {machines
          .filter((machine) =>
            machine.name.toLowerCase().includes(value.toLowerCase())
          )
          .map((machine, index) => (
            <Card
              key={index}
              onTouchEndCapture={() =>
                router.push({
                  pathname: "/machine_detail",
                  params: {
                    title: machine.name,
                    id: machine.id.toString(),
                  },
                })
              }
            >
              <CardHeader className="flex flex-row justify-between">
                <CardTitle>{machine.serial_number}</CardTitle>
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
                  <Text>Localização: {machine.local}</Text>
                  <Muted>Detalhes</Muted>
                </View>
              </CardContent>
            </Card>
          ))}
      </ScrollView>
    </View>
  );
}
