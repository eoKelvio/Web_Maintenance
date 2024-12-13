import { url } from "~/lib/utils";

// Tipagem para uma equipe (team)
interface Team {
  id?: number; // Opcional apenas para criar, obrigatório para update e delete
  name: string;
  leader_id: number;
}

// Função para criar uma nova equipe
export const createTeam = async (team: Team) => {
  try {
    const response = await fetch(`${url}/teams/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(team), // Envia os dados como JSON
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Erro ao criar equipe:", error);
    throw error;
  }
};

// Função para listar todas as equipes
export const getTeams = async () => {
  try {
    const response = await fetch(`${url}/teams/`, {
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
    console.error("Erro ao listar equipes:", error);
    throw error;
  }
};

// Função para listar uma equipe por id
export const getTeamById = async (id: number) => {
  try {
    const response = await fetch(`${url}/teams/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar equipe: ${response.status}`);
    }

    const team = await response.json();
    return team;
  } catch (error) {
    console.error("Erro ao buscar equipe por ID:", error);
    throw error;
  }
};

// Função para atualizar uma equipe
export const updateTeam = async (id: number, team: Team) => {
  try {
    const response = await fetch(`${url}/teams/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(team), // Envia os dados como JSON
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Erro ao atualizar equipe:", error);
    throw error;
  }
};

// Função para deletar uma equipe
export const deleteTeam = async (id: number) => {
  try {
    const response = await fetch(`${url}/teams/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    return { message: "Equipe deletada com sucesso" };
  } catch (error) {
    console.error("Erro ao deletar equipe:", error);
    throw error;
  }
};
