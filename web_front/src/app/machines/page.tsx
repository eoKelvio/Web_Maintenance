import Footer from "@/components/footer"
import Header from "@/components/header"
import Line from "@/components/line"
import MachineRegister from "@/components/machine-register"
import { Machine, columns } from "./columns"
import { DataTable } from "./data-table"

// Função simulada para obter dados de máquinas
async function getData(): Promise<Machine[]> {
  return [
    {
      id: "123abc",
      name: "Maquina A",
      type: "Tipo 1",
      model: "Modelo X",
      serialNumber: "SN123456",
      manufacturingDate: "2020-01-15",
      location: "Planta 1",
      maintenanceHistory: ["Manutenção em 2021", "Manutenção em 2022"],
    },
    {
      id: "456def",
      name: "Maquina B",
      type: "Tipo 2",
      model: "Modelo Y",
      serialNumber: "SN789101",
      manufacturingDate: "2019-05-20",
      location: "Planta 2",
      maintenanceHistory: ["Manutenção em 2020", "Manutenção em 2023"],
    },
    {
      id: "789ghi",
      name: "Maquina C",
      type: "Tipo 3",
      model: "Modelo Z",
      serialNumber: "SN112233",
      manufacturingDate: "2018-03-10",
      location: "Planta 3",
      maintenanceHistory: ["Manutenção em 2019", "Manutenção em 2021"],
    },
  ]
}

export default async function Home() {
  const data = await getData()

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto flex justify-between mt-5">
        <h1 className="title">Gerenciamento de Máquinas</h1>
        <MachineRegister />
      </div>
      <Line />
      <div className="flex-grow container mx-auto my-10">
        <DataTable columns={columns} data={data} />
      </div>
      <Footer />
    </div>
  )
}
