import axios from 'axios';

const API_URL = 'http://localhost:9999';

const createUser = async (data: any) => {
  try {
    const response = await axios.post(`${API_URL}/users/`, data);
    console.log(response.data)
    return response.data;
  } catch (error: any) {
    console.error('Erro ao cadastrar usuário:', error.message);
    throw error;
  }
};

export { createUser };