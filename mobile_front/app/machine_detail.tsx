import React from "react";
import { useLocalSearchParams } from "expo-router";
import MachineDetail from "~/components/MachineDetail";

export default function DetailScreen() {
  const { machine, from } = useLocalSearchParams();
  const machineData = machine ? JSON.parse(machine as string) : null;

  return <MachineDetail from={from as string} machineData={machineData} />;
}
