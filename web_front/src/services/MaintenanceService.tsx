import axios from "axios";

const API_URL = "http://localhost:9999";

const createMaintenance = async (data: any) => {
  try {
    const response = await axios.post(`${API_URL}/maintenance/`, data);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao cadastrar manutenção:", error.message);
    throw error;
  }
};

const getMaintenances = async () => {
  try {
    const response = await axios.get(`${API_URL}/maintenance/`);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao coletar manutenção(ões):", error.message);
    throw error;
  }
};

const deleteMaintenance = async (maintenanceId: any) => {
  try {
    const response = await axios.delete(`${API_URL}/maintenance/${maintenanceId}`);

    if (response.status === 200) {
      alert("Manutenção excluída com sucesso!");
      window.location.reload();
    } else {
      alert("Erro ao excluir a manutenção.");
    }
  } catch (error) {
    console.error("Erro ao excluir a manutenção:", error);
    alert("Erro ao excluir a manutenção.");
  }
};

const updateMaintenance = async (maintenanceId: number, data: any) => {
  try {
    const response = await axios.put(`${API_URL}/maintenance/${maintenanceId}`, data);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao atualizar a manutenção:", error.message);
    throw error;
  }
};

const getMaintenanceById = async (maintenanceId: number) => {
  try {
    const response = await axios.get(`${API_URL}/maintenance/${maintenanceId}`);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao obter os dados da manutenção:", error.message);
    throw error;
  }
};

export { createMaintenance, getMaintenances, deleteMaintenance, updateMaintenance, getMaintenanceById };
