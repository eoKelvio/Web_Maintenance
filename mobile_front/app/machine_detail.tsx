import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import MachineDetail from "~/components/MachineDetail";
import { getMachineById } from "~/lib/api/machines";
import { View, Text } from "react-native";

export default function DetailScreen() {
  const { id, from } = useLocalSearchParams();
  const [machineData, setMachineData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMachine = async () => {
      if (id) {
        try {
          const machine = await getMachineById(Number(id));
          setMachineData(machine);
        } catch (error) {
          console.error("Erro ao carregar máquina:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchMachine();
  }, [id]);

  if (loading) {
    return (
      <View className="h-full w-full justify-center">
        <Text className="self-center">Carregando...</Text>
      </View>
    );
  }

  if (!machineData) {
    return (
      <View className="h-full w-full justify-center">
        <Text className="self-center">Erro: Máquina não encontrada!</Text>
      </View>
    );
  }

  return <MachineDetail from={from as string} machineData={machineData} />;
}
