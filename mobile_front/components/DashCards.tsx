import React from "react";
import { View, Text } from "react-native";
import { DashboardCard } from "./DashCard";
import { useColorScheme } from "nativewind";
import { router } from "expo-router";
import { stockedItems } from "~/data/mock_items"; // Importa os dados de itens
import { machines } from "~/data/mock_machines"; // Importa os dados de máquinas

export default function DashCards() {
  // Calcula as estatísticas a partir dos dados mockados
  const lowStockItems = stockedItems.filter(
    (item) => item.status === "Abaixo"
  ).length;
  const outOfStockItems = stockedItems.filter(
    (item) => item.currentStock === 0
  ).length;
  const stoppedMachines = machines.filter(
    (machine) => machine.status === "Parado"
  ).length;
  const underMaintenanceMachines = machines.filter(
    (machine) => machine.status === "Em Manutenção"
  ).length;
  const runningMachines = machines.filter(
    (machine) => machine.status === "Rodando"
  ).length;
  const pendingMachines = machines.filter(
    (machine) => machine.status === "Pendente"
  ).length; // Corrigido para contar máquinas pendentes

  const { colorScheme } = useColorScheme();

  return (
    <View className="p-4 flex-1">
      <Text className="text-xl font-bold text-primary text-left pl-2">
        Estatísticas
      </Text>

      <View className="flex flex-row flex-wrap justify-between">
        <View className="w-1/2 p-1">
          <DashboardCard
            number={lowStockItems}
            content="Itens abaixo do estoque"
            icon="cart-outline"
            className={
              colorScheme === "dark" ? "bg-orange-500" : "bg-orange-400"
            }
            onPress={() => router.push("/stock")}
          />
        </View>

        <View className="w-1/2 p-1">
          <DashboardCard
            number={outOfStockItems}
            content="Itens esgotados do estoque"
            icon="alert"
            className="bg-destructive"
            onPress={() => router.push("/stock")}
          />
        </View>

        <View className="w-1/2 p-1">
          <DashboardCard
            number={stoppedMachines}
            content="Máquinas paradas"
            icon="trending-down"
            className="bg-destructive"
            onPress={() => router.push("/machines")}
          />
        </View>

        <View className="w-1/2 p-1">
          <DashboardCard
            number={underMaintenanceMachines}
            content="Máquinas em manutenção"
            icon="play-outline"
            className={colorScheme === "dark" ? "bg-blue-800" : "bg-blue-600"}
            onPress={() => router.push("/maintenance")}
          />
        </View>

        <View className="w-1/2 p-1">
          <DashboardCard
            number={runningMachines}
            content="Máquinas rodando"
            icon="checkmark-circle-outline"
            className={colorScheme === "dark" ? "bg-blue-800" : "bg-blue-600"}
            onPress={() => router.push("/machines")}
          />
        </View>

        <View className="w-1/2 p-1">
          <DashboardCard
            number={pendingMachines} // Agora conta máquinas pendentes
            content="Manutenções pendentes"
            icon="build-outline"
            className={
              colorScheme === "dark" ? "bg-orange-500" : "bg-orange-400"
            }
            onPress={() => router.push("/maintenance")}
          />
        </View>
      </View>
    </View>
  );
}
