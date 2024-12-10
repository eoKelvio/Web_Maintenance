import Line from "@/components/line";
import { Users, columns } from "./columns";
import { DataTable } from "./data-table";
import UserRegister from "@/components/users/UserRegister";
import axios from "axios";


// Função simulada para obter dados de users
async function getData(){
  try {
    const response = await axios.get("http://localhost:9999/users/");
    return response.data; // Retorna apenas os dados da resposta
  } catch (error:any) {
    console.error("Erro ao buscar dados:", error.message);
    throw error; // Repassa o erro para ser tratado pelo chamador
  }
}

export default async function UsersControl() {
  const data = await getData();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto flex justify-between mt-5">
        <h1 className="title">Controle de usuários cadastrados</h1>
        <UserRegister />
      </div>
      <Line />
      <div className="flex-grow container mx-auto my-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
