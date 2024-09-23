import React from "react";
import { useLocalSearchParams } from "expo-router";
import MachineDetail from "~/components/MachineDetail";

export default function DetailScreen() {
  const { machine, from } = useLocalSearchParams(); // Retrieve parameters from the URL
  const machineData = machine ? JSON.parse(machine as string) : null; // Parse machine data if available

  // Render the MachineDetail component with the parsed data and source
  return <MachineDetail from={from as string} machineData={machineData} />;
}
