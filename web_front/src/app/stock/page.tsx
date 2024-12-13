import Line from "@/components/line";
import { SparePart, columns } from "./columns";
import { DataTable } from "./data-table";
import StockRegister from "@/components/stock/stock-register";
import { getParts } from "@/services/PartsService";

// Função simulada para obter dados de peças
async function getData(): Promise<SparePart[]> {
  const response = await getParts();
  return response;
}

export default async function StockControl() {
  const data = await getData();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto flex justify-between mt-5">
        <h1 className="title">Controle de Estoque de Peças</h1>
        <StockRegister />
      </div>
      <Line />
      <div className="flex-grow container mx-auto my-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
