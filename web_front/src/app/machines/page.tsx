import Footer from "@/components/footer"
import Header from "@/components/header"
import Line from "@/components/line"
import MachineRegister from "@/components/machine/machine-register"
import { Machine, columns } from "./columns"
import { DataTable } from "./data-table"
import { getMachines } from "@/services/MachineService"

// Função simulada para obter dados de máquinas
const getData = async () => {
  try {
    const response = await getMachines();
    return response;
  } catch (error: any) {
    console.error("Erro ao coletar(s) o usuário(s):", error.message);
  }
};

export default async function Home() {
  const data = await getData()

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto flex justify-between mt-5">
        <h1 className="title">Gerenciar Máquinas</h1>
        <MachineRegister />
      </div>
      <Line />
      <div className="flex-grow container mx-auto my-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}
