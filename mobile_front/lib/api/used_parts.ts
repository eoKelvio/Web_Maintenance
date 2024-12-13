import { url } from "~/lib/utils";

// Tipagem para uma peça
interface Part {
  id?: number; // Opcional apenas para criar, obrigatório para update e delete
  name: string;
  quantity: number;
  cost: number;
  used_parts: string;
}

// Função para criar uma nova peça
export const createPart = async (maintenanceId: number, part: Part) => {
  try {
    const response = await fetch(
      `${url}/maintenances/${maintenanceId}/used_parts/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(part), // Envia os dados como JSON
      }
    );

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Erro ao criar peça:", error);
    throw error;
  }
};

// Função para listar todas as peças de uma manutenção
export const getParts = async (maintenanceId: number) => {
  try {
    const response = await fetch(
      `${url}/maintenances/${maintenanceId}/used_parts/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Erro ao listar peças:", error);
    throw error;
  }
};

// Função para listar uma peça por id
export const getPartById = async (maintenanceId: number, partId: number) => {
  try {
    const response = await fetch(
      `${url}/maintenances/${maintenanceId}/used_parts/${partId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erro ao buscar peça: ${response.status}`);
    }

    const part = await response.json();
    return part;
  } catch (error) {
    console.error("Erro ao buscar peça por ID:", error);
    throw error;
  }
};

// Função para atualizar uma peça
export const updatePart = async (
  maintenanceId: number,
  partId: number,
  part: Part
) => {
  try {
    const response = await fetch(
      `${url}/maintenances/${maintenanceId}/used_parts/${partId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(part), // Envia os dados como JSON
      }
    );

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Erro ao atualizar peça:", error);
    throw error;
  }
};

// Função para deletar uma peça
export const deletePart = async (maintenanceId: number, partId: number) => {
  try {
    const response = await fetch(
      `${url}/maintenances/${maintenanceId}/used_parts/${partId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    return { message: "Peça deletada com sucesso" };
  } catch (error) {
    console.error("Erro ao deletar peça:", error);
    throw error;
  }
};
