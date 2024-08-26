import Footer from "@/components/footer";
import Header from "@/components/header";
import Line from "@/components/line";
import { SparePart, columns } from "./columns";
import { DataTable } from "./data-table";
import StockRegister from "@/components/stock/stock-register";

// Função simulada para obter dados de peças
async function getData(): Promise<SparePart[]> {
  return [
    {
      id: "001",
      name: "Filtro de Óleo",
      code: "FO-1234",
      supplier: "Fornecedor A",
      quantity: 20,
      unitPrice: "R$ 50,00",
    },
    {
      id: "002",
      name: "Correia Dentada",
      code: "CD-5678",
      supplier: "Fornecedor B",
      quantity: 15,
      unitPrice: "R$ 120,00",
    },
    {
      id: "003",
      name: "Pastilha de Freio",
      code: "PF-9101",
      supplier: "Fornecedor C",
      quantity: 50,
      unitPrice: "R$ 30,00",
    },
  ];
}

export default async function StockControl() {
  const data = await getData();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto flex justify-between mt-5">
        <h1 className="title">Controle de Estoque de Peças</h1>
        <StockRegister/>
      </div>
      <Line />
      <div className="flex-grow container mx-auto my-10">
        <DataTable columns={columns} data={data} />
      </div>
      <Footer />
    </div>
  );
}
