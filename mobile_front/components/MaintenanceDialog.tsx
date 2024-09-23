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
import { user, startMaintenance } from "~/data/mock_user";
import { Machine } from "~/data/mock_machines";

// MaintenanceDialog component to handle maintenance actions for a machine
export default function MaintenanceDialog({
  machineData,
}: {
  machineData: Machine; // Props to receive machine data
}) {
  // State to manage loading status
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle the action of starting maintenance
  const handleAction = async () => {
    setIsLoading(true); // Set loading to true

    try {
      // Start maintenance process
      await startMaintenance(user, machineData.serialNumber);
      router.push("/maintenance"); // Navigate to the maintenance screen after success
    } catch (error) {
      console.error("Error processing maintenance:", error);
    } finally {
      setIsLoading(false); // Reset loading status
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
