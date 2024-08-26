import Footer from "@/components/footer";
import Header from "@/components/header";
import Line from "@/components/line";
import TeamRegister from "@/components/team/team-register";
import { Maintenance, columns } from "./columns";
import { DataTable } from "./data-table";
import TeamMaintenance from "@/components/team/team-maintenance";
import TeamCarrousel from "@/components/team/teams-carrousel";

// Função simulada para obter dados de máquinas
async function getData(): Promise<Maintenance[]> {
  return [
    {
      id: "1100292511",
      responsability: "Equipe A",
      solicitation: "2024-05-23",
      status: "Pendente",
      description: "A máquina se encontrar com um problema na mangueira.",
    },
    {
      id: "1100293392",
      responsability: "Equipe B",
      solicitation: "2024-08-01",
      status: "Finalizado",
      description: "A máquina estava com a junta do cabeçote queimada.",
    },
    {
      id: "1100290912",
      responsability: "Equipe D",
      solicitation: "2024-08-26",
      status: "Em Andamento",
      description: "A máquina se encontra com uma roda quebrada.",
    },
  ];
}

export default async function Home() {
  const data = await getData();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto flex justify-between mt-5">
        <h1 className="title">Gerencias Manutenções</h1>
        <div className="flex gap-4">
          <TeamRegister />
        </div>
      </div>
      <Line />
      <div className="flex-grow container mx-auto my-10 flex justify-center items-center">
        <TeamCarrousel/>
      </div>
    </div>
  );
}
