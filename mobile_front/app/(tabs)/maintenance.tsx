import * as React from "react";
import { ScrollView, View } from "react-native";
import MaintenanceHistory from "~/components/MaintenanceHistory";
import MaintenancePending from "~/components/MaintenancePending";
import MaintenanceRequest from "~/components/MaintenanceRequest";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Text } from "~/components/ui/text";
import { user } from "~/data/mock_user";
import { machines } from "~/data/mock_machines"; // Importando as máquinas
import MachineDetail from "~/components/MachineDetail";

export default function MaintenanceScreen() {
  const [selectedTab, setSelectedTab] = React.useState("history");

  // Função para obter os dados da máquina atual
  const getCurrentMachineData = () => {
    return machines.find(
      (machine) => machine.serialNumber === user.currentMachine
    );
  };

  const currentMachineData = getCurrentMachineData();

  return (
    <View className="h-full w-full p-3 pb-0 bg-secondary/30">
      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-full flex-col h-full gap-3"
      >
        <TabsList className="flex-row w-full p-0">
          <TabsTrigger value="history" className="flex-1 h-5/6">
            <Text>Histórico</Text>
          </TabsTrigger>
          <TabsTrigger
            value={user.currentMachine ? "running" : "pending"}
            className="flex-1 h-5/6"
          >
            {user.currentMachine ? <Text>Atual</Text> : <Text>Pendentes</Text>}
          </TabsTrigger>
          <TabsTrigger value="request" className="flex-1 h-5/6">
            <Text>Solicitar</Text>
          </TabsTrigger>
        </TabsList>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="h-full"
        >
          {/* Aba de Histórico */}
          <TabsContent value="history">
            <MaintenanceHistory />
          </TabsContent>

          {/* Aba de Pendentes */}
          <TabsContent value="pending">
            <MaintenancePending />
          </TabsContent>

          {/* Aba de Máquina Atual */}
          <TabsContent value="running">
            {currentMachineData ? (
              <MachineDetail
                machineData={currentMachineData}
                from={"pending"}
              />
            ) : (
              <View className="flex-1 items-center justify-center">
                <Text>Nenhuma máquina atual encontrada.</Text>
              </View>
            )}
          </TabsContent>

          {/* Aba de Solicitar */}
          <TabsContent value="request">
            <MaintenanceRequest />
          </TabsContent>
        </ScrollView>
      </Tabs>
    </View>
  );
}
