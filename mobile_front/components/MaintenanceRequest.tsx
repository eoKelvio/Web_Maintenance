import { useState } from "react";
import { View } from "react-native";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { H1, Muted } from "~/components/ui/typography";

// Component to request maintenance for a machine
export default function MaintenanceRequest() {
  // State variables to hold input values for the maintenance request
  const [machine, setMachine] = useState(""); // Holds the machine ID or name
  const [description, setDescription] = useState(""); // Holds the problem description
  const [notes, setNotes] = useState(""); // Holds additional notes (machine location)

  const handleRequest = () => {
    // Clear input fields after submitting the request
    setMachine("");
    setDescription("");
    setNotes("");
    // Optionally, you could also show a toast notification or feedback here
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
        placeholder="Máquina (ID ou Nome)"
        value={machine}
        onChangeText={setMachine}
      />
      <Input
        placeholder="Localização da máquina"
        multiline
        value={notes}
        onChangeText={setNotes}
      />
      <Input
        placeholder="Descrição do Problema"
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <Button className="mt-4" onPress={handleRequest}>
        <Text>Enviar Solicitação</Text>
      </Button>
    </View>
  );
}
