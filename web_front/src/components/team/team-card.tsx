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

interface TeamCardProps {
  team: {
    teamName: string;
    members: string;
    specialty: string;
    availability: string;
    status: string;
  };
}

export function TeamCard({ team }: TeamCardProps) {
  return (
    <Card className={cn("w-[380px]")}>
      <CardHeader>
        <CardTitle>{team.teamName}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex flex-col space-y-1.5 gap-2">
          <Label htmlFor="members">Membros da Equipe</Label>
          <CardDescription>{team.members}</CardDescription>

          <Label htmlFor="specialty">Especialidade</Label>
          <CardDescription>{team.specialty}</CardDescription>

          <Label htmlFor="availability">Disponibilidade</Label>
          <CardDescription>{team.availability}</CardDescription>

          <Label htmlFor="status">Status</Label>
          <CardDescription>{team.status}</CardDescription>
        </div>
      </CardContent>
      <CardFooter>
        <TeamMaintenance />
      </CardFooter>
    </Card>
  );
}
