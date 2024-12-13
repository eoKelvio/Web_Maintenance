"use client"

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TeamMaintenance from "./team-maintenance";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import axios from "axios";

interface TeamCardProps {
  team: {
    name: string;
    leader_id: string;
  };
}

export function TeamCard({ team }: TeamCardProps) {
  const [leader, setLeader] = useState<any>(null); // Estado para armazenar os dados do líder

  useEffect(() => {
    const fetchLeader = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/users/${team.leader_id}/`);
        setLeader(response.data); // Salva os dados do líder no estado
      } catch (error: any) {
        console.error("Erro ao buscar líder:", error.message);
      }
    };

    if (team.leader_id) {
      fetchLeader();
    }
  }, [team.leader_id]); // Depende de `team.leader_id`

  return (
    <Card className={cn("w-[380px]")}>
      <CardHeader>
        <CardTitle>{team.name}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex flex-col space-y-1.5 gap-2">
          <Label htmlFor="members">Líder</Label>
          {leader ? (
            <CardDescription>{leader.name}</CardDescription> // Exibe o nome do líder se disponível
          ) : (
            <CardDescription>Carregando...</CardDescription> // Exibe mensagem de carregamento
          )}
        </div>
      </CardContent>
      <CardFooter>
        <TeamMaintenance />
      </CardFooter>
    </Card>
  );
}
