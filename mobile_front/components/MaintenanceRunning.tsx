import React from "react";
import { View, Text } from "react-native";
import { user } from "~/data/mock_user"; // Importa o mock do usuário
import { machines } from "~/data/mock_machines"; // Importa as máquinas

export default function MaintenanceRunning() {
  const currentMachineId = user.currentMachine;
  const currentMachine = machines.find(
    (machine) => machine.serialNumber === currentMachineId
  );

  if (!currentMachine) {
    return (
      <View className="flex-1 items-center justify-center p-4 bg-white rounded-lg shadow-lg">
        <Text className="text-lg text-gray-700">
          Nenhuma máquina em manutenção no momento.
        </Text>
      </View>
    );
  }

  return (
    <View className="p-4 bg-white rounded-lg shadow-lg">
      <Text className="text-xl font-bold mb-2">Máquina Atual</Text>
      <Text className="text-base mb-1">Nome: {currentMachine.name}</Text>
      <Text className="text-base mb-1">Modelo: {currentMachine.model}</Text>
      <Text className="text-base mb-1">
        Localização: {currentMachine.location}
      </Text>
      <Text className="text-base mb-1">Status: {currentMachine.status}</Text>
      <Text className="text-base mb-1">
        Data de Fabricação: {currentMachine.fabricationDate}
      </Text>
      <Text className="text-base mb-1">
        Número de Série: {currentMachine.serialNumber}
      </Text>

      <Text className="text-xl font-bold mt-4">Histórico de Manutenção</Text>
      {currentMachine.maintenanceHistory.length > 0 ? (
        currentMachine.maintenanceHistory.map((maintenance, index) => (
          <View key={index} className="py-2 border-b border-gray-300">
            <Text className="text-sm text-gray-600">
              {maintenance.date} - {maintenance.description} (Executado por:{" "}
              {maintenance.performedBy})
            </Text>
          </View>
        ))
      ) : (
        <Text className="text-base text-gray-700">
          Nenhuma manutenção registrada.
        </Text>
      )}
    </View>
  );
}
