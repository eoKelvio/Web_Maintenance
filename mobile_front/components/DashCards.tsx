import React from "react";
import { View, Text } from "react-native";
import { DashboardCard } from "./DashCard";
import { useColorScheme } from "nativewind";
import { router } from "expo-router";
import { stockedItems } from "~/data/mock_items"; // Imports stock items data
import { machines } from "~/data/mock_machines"; // Imports machine data

export default function DashCards() {
  // Calculate statistics from mock data
  const lowStockItems = stockedItems.filter(
    (item) => item.status === "Abaixo" // Count items below stock
  ).length;
  const outOfStockItems = stockedItems.filter(
    (item) => item.currentStock === 0 // Count out-of-stock items
  ).length;
  const stoppedMachines = machines.filter(
    (machine) => machine.status === "Parado" // Count stopped machines
  ).length;
  const underMaintenanceMachines = machines.filter(
    (machine) => machine.status === "Em Manutenção" // Count machines under maintenance
  ).length;
  const runningMachines = machines.filter(
    (machine) => machine.status === "Rodando" // Count running machines
  ).length;
  const pendingMachines = machines.filter(
    (machine) => machine.status === "Pendente" // Count pending maintenance
  ).length;

  const { colorScheme } = useColorScheme();

  return (
    <View className="p-4">
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
            number={pendingMachines}
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
