import { machines } from "./mock_machines"; // Importe as máquinas se necessário

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  team: string;
  sector: string;
  pis: string;
  currentMachine?: string;
  currentMaintenanceId?: number;
};

export const user: User = {
  id: "0",
  name: "Alexandre Reame",
  pis: "10837592017",
  role: "Mecânico IV",
  sector: "Manutenção",
  team: "G",
  email: "alexandre_reame@gmail.com",
  password: "alexandre123",
  currentMachine: undefined,
  currentMaintenanceId: undefined,
};

// Função para iniciar a manutenção
export const startMaintenance = (user: User, machineId: string) => {
  const machine = machines.find((m) => m.serialNumber === machineId);
  if (machine && machine.status === "Pendente") {
    user.currentMachine = machineId;
    user.currentMaintenanceId = Math.floor(Math.random() * 1000); // Exemplo de geração de ID aleatório para a manutenção
    machine.status = "Em Manutenção";
    // Adicione aqui a lógica para criar uma entrada na manutenção se necessário
    return Promise.resolve();
  }
  return Promise.reject(new Error("Não foi possível iniciar a manutenção."));
};

// Função para finalizar a manutenção
export const finishMaintenance = (user: User) => {
  if (user.currentMaintenanceId) {
    const machine = machines.find(
      (m) => m.serialNumber === user.currentMachine
    );
    if (machine) {
      machine.status = "Rodando";
      user.currentMachine = undefined;
      user.currentMaintenanceId = undefined;
      return Promise.resolve();
    }
  }
  return Promise.reject(
    new Error("Não há manutenção em andamento para finalizar.")
  );
};
