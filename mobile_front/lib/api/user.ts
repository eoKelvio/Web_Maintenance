import { url } from "~/lib/utils";

// Tipagem para um novo usuário
interface User {
  name: string;
  username: string;
  password: string;
  role: string;
  team_id: number;
}

// Função para criar um novo usuário com fetch
export const createUser = async (user: User) => {
  try {
    const response = await fetch(`${url}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user), // Envia os dados como JSON
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
};
