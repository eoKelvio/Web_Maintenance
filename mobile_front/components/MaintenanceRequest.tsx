import { useState } from "react";
import { View } from "react-native";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { H1, Muted } from "~/components/ui/typography";

export default function MaintenanceRequest() {
  const [machine, setMachine] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");

  const handleRequest = () => {
    // Limpar os campos de input após exibir os toasts
    setMachine("");
    setDescription("");
    setNotes("");
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
