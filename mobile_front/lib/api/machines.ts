import { url } from "~/lib/utils";

// Tipagem para uma máquina
interface Machine {
  id?: number; // Opcional apenas para criar, obrigatório para update e delete
  name: string;
  type: string;
  local: string;
  fabrication_date: string; // Formato ISO 8601: 'YYYY-MM-DD'
  serial_number: string;
}

// Função para criar uma nova máquina
export const createMachine = async (machine: Machine) => {
  try {
    const response = await fetch(`${url}/machines/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(machine), // Envia os dados como JSON
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Erro ao criar máquina:", error);
    throw error;
  }
};

// Função para listar todas as máquinas
export const getMachines = async () => {
  try {
    const response = await fetch(`${url}/machines/`, {
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
    console.error("Erro ao listar máquinas:", error);
    throw error;
  }
};

// Função para listar a máquina por id
export const getMachineById = async (id: number) => {
  try {
    const response = await fetch(`${url}/machines/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar máquina: ${response.status}`);
    }

    const machine = await response.json();
    return machine;
  } catch (error) {
    console.error("Erro ao buscar máquina por ID:", error);
    throw error;
  }
};

// Função para atualizar uma máquina
export const updateMachine = async (id: number, machine: Machine) => {
  try {
    const response = await fetch(`${url}/machines/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(machine), // Envia os dados como JSON
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Erro ao atualizar máquina:", error);
    throw error;
  }
};

// Função para deletar uma máquina
export const deleteMachine = async (id: number) => {
  try {
    const response = await fetch(`${url}/machines/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    return { message: "Máquina deletada com sucesso" };
  } catch (error) {
    console.error("Erro ao deletar máquina:", error);
    throw error;
  }
};
