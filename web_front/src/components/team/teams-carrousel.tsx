"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TeamCard } from "./team-card";

export default function TeamCarousel() {
  // Estado para armazenar os dados das equipes
  const [teamsData, setTeamsData] = useState<any[]>([]);

  // Efeito para buscar os dados das equipes
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("http://localhost:9999/teams/"); // URL da API de equipes
        setTeamsData(response.data); // Atualiza o estado com os dados recebidos
      } catch (error:any) {
        console.error("Erro ao buscar equipes:", error.message);
      }
    };

    fetchTeams();
  }, []); // O array vazio significa que o efeito será executado uma vez ao carregar o componente

  return (
    <Carousel className="w-full max-w-5xl mx-auto" opts={{ align: "start", loop: true }}>
      <CarouselContent className="-ml-4 flex gap-4">
        {teamsData.map((team, index) => (
          <CarouselItem key={index} className="pl-4 flex-shrink-0 basis-1/3">
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
