import axios from "axios";

const API_URL = "http://localhost:9999";

const createPart = async (data: any) => {
  try {
    const response = await axios.post(`${API_URL}/parts/`, data);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao cadastrar peça:", error.message);
    throw error;
  }
};

const getParts = async () => {
  try {
    const response = await axios.get(`${API_URL}/parts/`);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao coletar(s) a(s) peça(s):", error.message);
    throw error;
  }
};

const deletePart = async (partId: any) => {
  try {
    const response = await axios.delete(`${API_URL}/parts/${partId}`);

    if (response.status === 200) {
      alert("Peça excluída com sucesso!");
      window.location.reload();
    } else {
      alert("Erro ao excluir a peça.");
    }
  } catch (error) {
    console.error("Erro ao excluir a peça:", error);
    alert("Erro ao excluir a peça.");
  }
};

const updatePart = async (partId: number, data: any) => {
  try {
    const response = await axios.put(`${API_URL}/parts/${partId}`, data);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao atualizar a peça:", error.message);
    throw error;
  }
};

const getPartById = async (partId: number) => {
  try {
    const response = await axios.get(`${API_URL}/parts/${partId}`);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao obter os dados da peça:", error.message);
    throw error;
  }
};

export { createPart, getParts, deletePart, updatePart, getPartById };
