import Line from "@/components/line";
import MaintenanceRegister from "@/components/maintenance/maintenance-register";
import { Maintenance, columns } from "./columns";
import { DataTable } from "./data-table";
import { getMaintenances } from "@/services/MaintenanceService";

// Função simulada para obter dados de máquinas
async function getData(): Promise<Maintenance[]> {
  const response = await getMaintenances();
  return response;
}

export default async function Home() {
  const data = await getData();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto flex justify-between mt-5">
        <h1 className="title">Gerenciar Manutenções</h1>
        <MaintenanceRegister />
      </div>
      <Line />
      <div className="flex-grow container mx-auto my-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
