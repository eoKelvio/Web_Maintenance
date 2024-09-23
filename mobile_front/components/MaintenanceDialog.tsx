import { router } from "expo-router";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { user, startMaintenance, finishMaintenance } from "~/data/mock_user";
import { Machine } from "~/data/mock_machines";

export default function MaintenanceDialog({
  machineData,
}: {
  machineData: Machine;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async () => {
    setIsLoading(true);

    try {
      await startMaintenance(user, machineData.serialNumber);
      router.push("/maintenance");
    } catch (error) {
      console.error("Erro ao processar a manutenção:", error);
      alert("Ocorreu um erro ao processar a manutenção. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="mt-4" disabled={isLoading}>
          <Text>Iniciar Manutenção</Text>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="relative">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-primary">
            Iniciar Manutenção?
          </AlertDialogTitle>
          <AlertDialogDescription>
            "Você está prestes a iniciar a manutenção desta máquina. Deseja
            continuar?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            <Text className="text-primary">Cancelar</Text>
          </AlertDialogCancel>
          <AlertDialogAction onPress={handleAction} disabled={isLoading}>
            <Text className="text-primary-foreground">
              {isLoading ? "Processando..." : "Confirmar"}
            </Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
