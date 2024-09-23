import React from "react";
import { View, Text, ScrollView } from "react-native";
import { maintenances } from "~/data/mock_maintenances"; // Adjust the path as needed
import { teams } from "~/data/mock_teams"; // Adjust the path as needed

// Definir o componente que renderiza o gráfico
export default function MaintenanceChart() {
  // Contar o número de manutenções por equipe
  const maintenanceCount = teams.map((team) => {
    const count = maintenances.filter(
      (m) => m.performedBy === team.name
    ).length;
    return { team: team.name, maintenance: count };
  });

  // Encontrar o valor máximo de manutenções para ajustar a escala
  const maxMaintenance = Math.max(
    ...maintenanceCount.map((d) => d.maintenance)
  );

  return (
    <View className="p-6 flex-1">
      <Text className="text-xl font-bold text-primary text-left mb-3">
        Número de Manutenções por Equipe
      </Text>
      <ScrollView>
        {maintenanceCount.map((item, index) => (
          <View key={index} className="flex-row items-center mb-3">
            <Text className="w-20 text-base mr-2 text-primary">
              {item.team}
            </Text>
            <View className="flex-1 h-6 bg-border rounded mr-2">
              <View
                className="h-full bg-green-500"
                style={{
                  width: `${(item.maintenance / maxMaintenance) * 100}%`,
                }}
              />
            </View>
            <Text className="w-10 text-right text-primary">
              {item.maintenance}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
