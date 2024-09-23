//mock_maintenances.ts
import { items } from "./mock_items";
import { teams } from "./mock_teams";

export type MaintenanceMaterial = {
  itemId: number;
  quantity: string;
  itemName: string; // Novo campo para o nome do item
};

export type Maintenance = {
  id: number;
  machineId: number;
  date: string;
  description: string;
  performedBy: string;
  materialsUsed: MaintenanceMaterial[];
};

export const maintenances: Maintenance[] = [];

// Função para gerar um número aleatório de manutenções para cada máquina
const getRandomMaintenanceCount = () => Math.floor(Math.random() * 5) + 2; // 2 a 6 manutenções

// Gera manutenções garantindo que cada máquina tenha um número variável (mínimo 2)
for (let machineId = 1; machineId <= 17; machineId++) {
  const maintenanceCount = getRandomMaintenanceCount();

  for (let i = 0; i < maintenanceCount; i++) {
    const teamIndex = Math.floor(Math.random() * 10);
    const maintenanceMaterials: MaintenanceMaterial[] = [
      {
        itemId: Math.floor(Math.random() * items.length) + 1,
        quantity: `${Math.floor(Math.random() * 5) + 1} unidades`,
        itemName: items[Math.floor(Math.random() * items.length)].name,
      },
      {
        itemId: Math.floor(Math.random() * items.length) + 1,
        quantity: `${Math.floor(Math.random() * 5) + 1} unidades`,
        itemName: items[Math.floor(Math.random() * items.length)].name,
      },
    ];

    maintenances.push({
      id: maintenances.length + 1,
      machineId: machineId,
      date: `${String(Math.floor(Math.random() * 28) + 1).padStart(
        2,
        "0"
      )}/${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}/2023`,
      description:
        i % 2 === 0
          ? "Troca de óleo e verificação geral."
          : "Substituição de peças desgastadas.",
      performedBy: teams[teamIndex].name,
      materialsUsed: maintenanceMaterials,
    });
  }
}

// Agora você terá um total variável de manutenções por máquina, mas com pelo menos duas manutenções para cada
