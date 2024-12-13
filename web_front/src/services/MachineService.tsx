import axios from "axios";

const API_URL = "http://localhost:9999";

const createMachines = async (data: any) => {
  try {
    const response = await axios.post(`${API_URL}/machines/`, data);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao cadastrar máquina:", error.message);
    throw error;
  }
};

const getMachines = async () => {
  try {
    const response = await axios.get(`${API_URL}/machines/`);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao coletar(s) o máquina(s):", error.message);
    throw error;
  }
};

const deleteMachines = async (machineId: any) => {
  try {
    // Enviar a requisição DELETE para a API usando axios
    const response = await axios.delete(
      `http://localhost:9999/machines/${machineId}`
    );

    if (response.status === 200) {
      alert("Máquina excluída com sucesso!");
      window.location.reload()
    } else {
      alert("Erro ao excluir a máquina.");
    }
  } catch (error) {
    console.error("Erro ao excluir a máquina:", error);
    alert("Erro ao excluir a máquina.");
  }
};

const updateMachine = async (machineId: number, data: any) => {
  try {
    const response = await axios.put(`${API_URL}/machines/${machineId}`, data);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao atualizar a máquina:", error.message);
    throw error;
  }
};

const getMachineById = async (machineId: number) => {
  try {
    const response = await axios.get(`${API_URL}/machines/${machineId}`);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao obter os dados da máquina:", error.message);
    throw error;
  }
};


export { createMachines, getMachines, deleteMachines, updateMachine, getMachineById };
