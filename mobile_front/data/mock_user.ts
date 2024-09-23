import { machines } from "./mock_machines"; // Import machines for validation

// Type definition for a user
export type User = {
  id: string; // Unique identifier for the user
  name: string; // User's name
  email: string; // User's email
  password: string; // User's password
  role: string; // User's role (e.g., mechanic, admin)
  team: string; // User's team identifier
  sector: string; // User's sector (e.g., Maintenance)
  pis: string; // User's PIS (Program of Social Integration)
  currentMachine?: string; // ID of the currently assigned machine (optional)
  currentMaintenanceId?: number; // ID of the ongoing maintenance (optional)
};

// Mock user data
export const user: User = {
  id: "0",
  name: "Alexandre Reame",
  pis: "10837592017",
  role: "Mecânico IV", // Mechanic Level IV
  sector: "Manutenção", // Maintenance sector
  team: "G", // Assigned team
  email: "alexandre_reame@gmail.com", // User's email
  password: "alexandre123", // User's password (should be stored securely in production)
  currentMachine: undefined, // No machine currently assigned
  currentMaintenanceId: undefined, // No maintenance currently in progress
};

// Function to start maintenance for a machine
export const startMaintenance = (user: User, machineId: string) => {
  // Find the machine by its serial number
  const machine = machines.find((m) => m.serialNumber === machineId);

  // Check if the machine exists and its status is "Pendente" (Pending)
  if (machine && machine.status === "Pendente") {
    user.currentMachine = machineId; // Set the current machine for the user
    user.currentMaintenanceId = Math.floor(Math.random() * 1000); // Generate a random maintenance ID
    machine.status = "Em Manutenção"; // Update machine status to "In Maintenance"

    // Logic to create a maintenance record can be added here

    return Promise.resolve(); // Resolve the promise to indicate success
  }

  return Promise.reject(new Error("Não foi possível iniciar a manutenção.")); // Reject if maintenance cannot be started
};

// Function to finish ongoing maintenance
export const finishMaintenance = (user: User) => {
  // Check if there's an ongoing maintenance
  if (user.currentMaintenanceId) {
    const machine = machines.find(
      (m) => m.serialNumber === user.currentMachine
    ); // Find the current machine
    if (machine) {
      machine.status = "Rodando"; // Update machine status to "Running"
      user.currentMachine = undefined; // Clear the current machine
      user.currentMaintenanceId = undefined; // Clear the current maintenance ID
      return Promise.resolve(); // Resolve the promise to indicate success
    }
  }

  return Promise.reject(
    new Error("Não há manutenção em andamento para finalizar.")
  ); // Reject if there's no ongoing maintenance
};
