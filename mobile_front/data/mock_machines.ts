import { maintenances } from "./mock_maintenances";
import { items } from "./mock_items";

export type Machine = {
  name: string;
  type: string;
  model: string;
  fabricationDate: string;
  serialNumber: string;
  location: string;
  status: "Rodando" | "Parado" | "Em Manutenção" | "Pendente";
  maintenanceHistory: {
    date: string;
    description: string;
    performedBy: string;
    materialsUsed: { material: string; quantity: string }[];
  }[];
};

export const machines: Machine[] = Array.from({ length: 17 }, (_, index) => {
  const machineMaintenances = maintenances.filter(
    (m) => m.machineId === index + 1
  );

  const maintenanceHistory = machineMaintenances.map((machineMaintenance) => ({
    date: machineMaintenance.date,
    description: machineMaintenance.description,
    performedBy: machineMaintenance.performedBy,
    materialsUsed: machineMaintenance.materialsUsed.map((material) => {
      const item = items.find((i) => i.id === material.itemId);
      return {
        material: item
          ? item.name
          : `Item não encontrado (ID: ${material.itemId})`,
        quantity: material.quantity,
      };
    }),
  }));

  return {
    name: `Máquina ${index + 1}`,
    type: `Tipo ${String.fromCharCode(65 + (index % 5))}`,
    model: `Modelo X${(index % 10) + 1}`,
    fabricationDate: `${String((index % 28) + 1).padStart(2, "0")}/07/2021`,
    serialNumber: `SN${String(index + 1).padStart(3, "0")}`,
    location: `Setor ${Math.floor(index / 5) + 1}`,
    status:
      index % 4 === 0 ? "Rodando" : index % 4 === 1 ? "Parado" : "Pendente",
    maintenanceHistory: maintenanceHistory.length > 0 ? maintenanceHistory : [],
  };
});
