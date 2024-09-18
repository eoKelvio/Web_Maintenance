import React from "react";
import { View, Text } from "react-native";

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
export default function MaintenanceChart() {
  // Encontrar o valor máximo de manutenções para ajustar a escala
  const maxMaintenance = Math.max(...data.map((d) => d.maintenance));

  return (
    <View className="p-6 flex-1">
      <Text className="text-xl font-bold text-primary text-left mb-5">
        Número de Manutenções por Equipe
      </Text>

      {data.map((item, index) => (
        <View key={index} className="flex-row items-center mb-3">
          {/* Nome da equipe */}
          <Text className="w-20 text-base mr-2 text-primary">{item.team}</Text>

          {/* Barra do gráfico */}
          <View className="flex-1 h-6 bg-border rounded mr-2">
            <View
              className="h-full bg-green-500"
              style={{
                width: `${(item.maintenance / maxMaintenance) * 100}%`,
              }}
            />
          </View>

          {/* Quantidade de manutenções */}
          <Text className="w-10 text-right text-primary">
            {item.maintenance}
          </Text>
        </View>
      ))}
    </View>
  );
}
