import { items } from "./mock_items"; // Importing items data for maintenance
import { teams } from "./mock_teams"; // Importing teams data for maintenance

// Type definition for a maintenance material used in a maintenance
export type MaintenanceMaterial = {
  itemId: number; // ID of the item used
  quantity: string; // Quantity of the item used
  itemName: string; // New field for the name of the item
};

// Type definition for a maintenance record
export type Maintenance = {
  id: number; // Unique ID for the maintenance record
  machineId: number; // ID of the machine being maintained
  date: string; // Date of the maintenance
  description: string; // Description of the maintenance
  performedBy: string; // Name of the person/team that performed the maintenance
  materialsUsed: MaintenanceMaterial[]; // Array of materials used during maintenance
};

// Array to hold maintenance records
export const maintenances: Maintenance[] = [];

// Function to generate a random number of maintenance records for each machine
const getRandomMaintenanceCount = () => Math.floor(Math.random() * 5) + 2; // Generates between 2 to 6 maintenance records

// Loop to generate maintenance records for 17 machines
for (let machineId = 1; machineId <= 17; machineId++) {
  const maintenanceCount = getRandomMaintenanceCount(); // Get a random count of maintenance records for the current machine

  for (let i = 0; i < maintenanceCount; i++) {
    const teamIndex = Math.floor(Math.random() * 10); // Randomly select a team index
    const maintenanceMaterials: MaintenanceMaterial[] = [
      {
        itemId: Math.floor(Math.random() * items.length) + 1, // Randomly select an item ID
        quantity: `${Math.floor(Math.random() * 5) + 1} unidades`, // Generate a random quantity (1 to 5 units)
        itemName: items[Math.floor(Math.random() * items.length)].name, // Randomly select an item name from the items array
      },
      {
        itemId: Math.floor(Math.random() * items.length) + 1, // Another random item ID
        quantity: `${Math.floor(Math.random() * 5) + 1} unidades`, // Another random quantity (1 to 5 units)
        itemName: items[Math.floor(Math.random() * items.length)].name, // Another random item name
      },
    ];

    // Push a new maintenance record into the maintenances array
    maintenances.push({
      id: maintenances.length + 1, // Unique ID for the maintenance
      machineId: machineId, // Current machine ID
      date: `${String(Math.floor(Math.random() * 28) + 1).padStart(
        2,
        "0"
      )}/${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}/2023`, // Random maintenance date
      // Description alternates between two options
      description:
        i % 2 === 0
          ? "Troca de óleo e verificação geral."
          : "Substituição de peças desgastadas.",
      performedBy: teams[teamIndex].name, // Name of the team that performed the maintenance
      materialsUsed: maintenanceMaterials, // Materials used in the maintenance
    });
  }
}

// This setup ensures that each machine has a variable number of maintenance records, with at least two records per machine.
