import Line from "@/components/line";
import { Users, columns } from "./columns";
import { DataTable } from "./data-table";
import UserRegister from "@/components/users/UserRegister";
import axios from "axios";
import { getUsers } from "@/services/UserService";


const getData = async () => {
  try {
    const response = await getUsers();
    return response;
  } catch (error: any) {
    console.error("Erro ao coletar(s) o usuário(s):", error.message);
  }
};

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
