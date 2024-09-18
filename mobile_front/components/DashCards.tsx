import React from "react";
import { View, Text } from "react-native";
import { DashboardCard } from "./DashCard";
import { useColorScheme } from "nativewind";
import { router } from "expo-router";

// Dados das equipes e manutenções
const data = [
  { team: "Equipe A", maintenance: 5 },
  { team: "Equipe B", maintenance: 8 },
  { team: "Equipe C", maintenance: 2 },
  { team: "Equipe D", maintenance: 10 },
  { team: "Equipe E", maintenance: 7 },
  { team: "Equipe F", maintenance: 3 },
];

// Definir o componente que renderiza o gráfico
export default function DashCards() {
  return (
    <View className="p-4 flex-1">
      <Text className="text-xl font-bold text-primary text-left pl-2">
        Estastísticas
      </Text>

      <View className="flex flex-row flex-wrap justify-between">
        <View className="w-1/2 p-1">
          <DashboardCard
            number={10}
            content="Itens abaixo do estoque"
            icon="cart-outline"
            className={
              useColorScheme().colorScheme === "dark"
                ? "bg-orange-500"
                : "bg-orange-400"
            }
            onPress={() => router.push("/stock")}
          />
        </View>

        <View className="w-1/2 p-1">
          <DashboardCard
            number={3}
            content="Itens esgotados do estoque"
            icon="alert"
            className="bg-destructive"
            onPress={() => router.push("/stock")}
          />
        </View>

        <View className="w-1/2 p-1">
          <DashboardCard
            number={2}
            content="Máquinas paradas"
            icon="trending-down"
            className="bg-destructive"
            onPress={() => router.push("/machines")}
          />
        </View>

        <View className="w-1/2 p-1">
          <DashboardCard
            number={4}
            content="Máquinas em manutenção"
            icon="play-outline"
            className={
              useColorScheme().colorScheme === "dark"
                ? "bg-blue-800"
                : "bg-blue-600"
            }
            onPress={() => router.push("/maintenance")}
          />
        </View>

        <View className="w-1/2 p-1">
          <DashboardCard
            number={12}
            content="Manutenções no mês"
            icon="calendar-outline"
            className={
              useColorScheme().colorScheme === "dark"
                ? "bg-blue-800"
                : "bg-blue-600"
            }
            onPress={() => router.push("/maintenance")}
          />
        </View>

        <View className="w-1/2 p-1">
          <DashboardCard
            number={7}
            content="Manutenções pendentes"
            icon="build-outline"
            className={
              useColorScheme().colorScheme === "dark"
                ? "bg-orange-500"
                : "bg-orange-400"
            }
            onPress={() => router.push("/maintenance")}
          />
        </View>
      </View>
    </View>
  );
}
