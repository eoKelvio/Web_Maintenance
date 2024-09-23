import { maintenances } from "./mock_maintenances"; // Import maintenance data
import { items } from "./mock_items"; // Import item data

// Type definition for a Machine
export type Machine = {
  name: string; // Name of the machine
  type: string; // Type of the machine
  model: string; // Model of the machine
  fabricationDate: string; // Fabrication date of the machine
  serialNumber: string; // Serial number of the machine
  location: string; // Location of the machine
  status: "Rodando" | "Parado" | "Em Manutenção" | "Pendente"; // Status of the machine
  maintenanceHistory: {
    date: string; // Date of the maintenance
    description: string; // Description of the maintenance
    performedBy: string; // Person who performed the maintenance
    materialsUsed: { material: string; quantity: string }[]; // Materials used during maintenance
  }[]; // Array of maintenance history records
};

// Generate an array of machines with mock data
export const machines: Machine[] = Array.from({ length: 17 }, (_, index) => {
  // Filter maintenances for the current machine based on index
  const machineMaintenances = maintenances.filter(
    (m) => m.machineId === index + 1
  );

  // Map maintenance records to include material details
  const maintenanceHistory = machineMaintenances.map((machineMaintenance) => ({
    date: machineMaintenance.date, // Maintenance date
    description: machineMaintenance.description, // Maintenance description
    performedBy: machineMaintenance.performedBy, // Maintenance performer
    materialsUsed: machineMaintenance.materialsUsed.map((material) => {
      // Find the corresponding item for each material used
      const item = items.find((i) => i.id === material.itemId);
      return {
        material: item
          ? item.name // Use item name if found
          : `Item não encontrado (ID: ${material.itemId})`, // Fallback if item is not found
        quantity: material.quantity, // Quantity used
      };
    }),
  }));

  // Return the constructed machine object
  return {
    name: `Máquina ${index + 1}`, // Machine name
    type: `Tipo ${String.fromCharCode(65 + (index % 5))}`, // Machine type (A, B, C, D, E)
    model: `Modelo X${(index % 10) + 1}`, // Machine model
    fabricationDate: `${String((index % 28) + 1).padStart(2, "0")}/07/2021`, // Fabrication date
    serialNumber: `SN${String(index + 1).padStart(3, "0")}`, // Serial number
    location: `Setor ${Math.floor(index / 5) + 1}`, // Location based on index
    status:
      index % 4 === 0 ? "Rodando" : index % 4 === 1 ? "Parado" : "Pendente", // Status based on index
    maintenanceHistory: maintenanceHistory.length > 0 ? maintenanceHistory : [], // Maintenance history
  };
});
