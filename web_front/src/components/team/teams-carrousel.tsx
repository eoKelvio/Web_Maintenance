import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel";
  import { TeamCard } from "./team-card";
  
  export default function TeamCarrousel() {
    // Dados mocados para os cards de equipe
    const teamsData = [
      {
        teamName: "Equipe A",
        members: "João, Ana, Carlos",
        specialty: "Mecânica",
        availability: "2024-09-01 to 2024-09-05",
        status: "Ativo",
      },
      {
        teamName: "Equipe B",
        members: "Mariana, Pedro, Lucas",
        specialty: "Elétrica",
        availability: "2024-09-10 to 2024-09-15",
        status: "Inativo",
      },
      {
        teamName: "Equipe C",
        members: "Fabiana, Roberto, Clara",
        specialty: "Hidráulica",
        availability: "2024-09-05 to 2024-09-12",
        status: "Ativo",
      },
      {
        teamName: "Equipe D",
        members: "Eduardo, Beatriz, Marcelo",
        specialty: "Pneumática",
        availability: "2024-09-03 to 2024-09-08",
        status: "Em manutenção",
      },
      {
        teamName: "Equipe E",
        members: "Gabriela, Henrique, Felipe",
        specialty: "Soldagem",
        availability: "2024-09-12 to 2024-09-20",
        status: "Ativo",
      },
    ];
  
    return (
      <Carousel className="w-full max-w-3xl mx-auto" opts={{ align: "start", loop: true }}>
        <CarouselContent className="-ml-4 flex gap-4">
          {teamsData.map((team, index) => (
            <CarouselItem key={index} className="pl-4 flex-shrink-0">
              <div className="p-2 flex justify-center items-center">
                <TeamCard team={team} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
  }
  