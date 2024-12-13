import { useState } from "react";
import { View, Alert } from "react-native";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { H1, Muted } from "~/components/ui/typography";
import { createMaintenance } from "~/lib/api/maintenances";
import dayjs from "dayjs";

// Component to request maintenance for a machine
export default function MaintenanceRequest() {
  // State variables to hold input values for the maintenance request
  const [machineId, setMachineId] = useState(""); // Holds the machine ID
  const [description, setDescription] = useState(""); // Holds the problem description
  const [priority, setPriority] = useState("Normal"); // Default priority
  const [teamId, setTeamId] = useState(""); // Holds the team ID

  const handleRequest = async () => {
    // Validate required fields
    if (!machineId || !description || !teamId) {
      alert("Erro - Preencha todos os campos obrigatórios.");
      return;
    }

    const maintenanceData = {
      machine_id: parseInt(machineId, 10),
      date: dayjs().format("YYYY-MM-DD"), // Formato ISO sem timestamp
      status: "Pending", // Default status
      description,
      priority,
      team_id: parseInt(teamId, 10),
    };

    try {
      const response = await createMaintenance(maintenanceData);
      alert("Sucesso - Manutenção solicitada com sucesso.");
      // Clear input fields after submitting the request
      setMachineId("");
      setDescription("");
      setPriority("Normal");
      setTeamId("");
    } catch (error) {
      alert("Erro - Não foi possível solicitar a manutenção.");
      console.error(error);
    }
  };

  return (
    <View className="p-4 native:pb-24 max-w-md gap-3 h-full items-center bg-secondary/30">
      <View className="gap-1">
        <H1 className="text-foreground text-center">Solicitar Manutenção</H1>
        <Muted className="text-base text-center">
          Preencha as informações abaixo
        </Muted>
      </View>

      <Input
        placeholder="ID da Máquina (obrigatório)"
        value={machineId}
        onChangeText={setMachineId}
        keyboardType="numeric"
      />
      <Input
        placeholder="Descrição do Problema (obrigatório)"
        multiline
        value={description}
        onChangeText={setDescription}
      />
      <Input
        placeholder="Prioridade (Normal, Alta, Baixa)"
        value={priority}
        onChangeText={setPriority}
      />
      <Input
        placeholder="ID da Equipe (obrigatório)"
        value={teamId}
        onChangeText={setTeamId}
        keyboardType="numeric"
      />

      <Button className="mt-4" onPress={handleRequest}>
        <Text>Enviar Solicitação</Text>
      </Button>
    </View>
  );
}
