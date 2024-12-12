import { url } from "~/lib/utils";

// Tipagem para uma manutenção
interface Maintenance {
  id?: number; // Opcional apenas para criar, obrigatório para update e delete
  machine_id: number;
  date: string; // Formato ISO 8601: 'YYYY-MM-DD'
  status: string;
  description: string;
  priority: string;
  team_id: number;
}

// Função para criar uma nova manutenção
export const createMaintenance = async (maintenance: Maintenance) => {
  try {
    const response = await fetch(`${url}/maintenance/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(maintenance), // Envia os dados como JSON
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Erro ao criar manutenção:", error);
    throw error;
  }
};

// Função para listar todas as manutenções
export const getMaintenances = async () => {
  try {
    const response = await fetch(`${url}/maintenance/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Erro ao listar manutenções:", error);
    throw error;
  }
};

// Função para listar a manutenção por id
export const getMaintenanceById = async (id: number) => {
  try {
    const response = await fetch(`${url}/maintenance/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar manutenção: ${response.status}`);
    }

    const maintenance = await response.json();
    return maintenance;
  } catch (error) {
    console.error("Erro ao buscar manutenção por ID:", error);
    throw error;
  }
};

// Função para atualizar uma manutenção
export const updateMaintenance = async (
  id: number,
  maintenance: Maintenance
) => {
  try {
    const response = await fetch(`${url}/maintenance/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(maintenance), // Envia os dados como JSON
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Erro ao atualizar manutenção:", error);
    throw error;
  }
};

// Função para deletar uma manutenção
export const deleteMaintenance = async (id: number) => {
  try {
    const response = await fetch(`${url}/maintenance/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    return { message: "Manutenção deletada com sucesso" };
  } catch (error) {
    console.error("Erro ao deletar manutenção:", error);
    throw error;
  }
};
