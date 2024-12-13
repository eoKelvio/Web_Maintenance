"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePickerDemo } from "@/components/date-picker";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { createMaintenance } from "@/services/MaintenanceService";
import axios from "axios";

interface Machine {
  id: number;
  name: string;
}
interface Teams {
  id: number;
  name: string;
}

export default function MaintenanceRegister() {
  const [formData, setFormData] = useState({
    machine_id: "",
    date: "",
    status: "",
    description: "",
    priority: "",
    team_id: "",
  });

  const [machines, setMachines] = useState<Machine[]>([]);
  const [teams, setTeams] = useState<Teams[]>([]);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await axios.get("http://localhost:9999/machines");
        setMachines(response.data);
      } catch (error) {
        console.error("Erro ao buscar máquinas:", error);
      }
    };

    const fetchTeams = async () => {
      try {
        const response = await axios.get("http://localhost:9999/teams");
        setTeams(response.data);
      } catch (error) {
        console.error("Erro ao buscar equipes:", error);
      }
    };

    fetchMachines();
    fetchTeams();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    // Se for machine_id ou team_id, converta o valor para número
    const newValue =
      id === "machine_id" || id === "team_id" ? Number(value) : value;
    setFormData((prev) => ({
      ...prev,
      [id]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await createMaintenance(formData);
      alert("Manutenção cadastrada com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar manutenção:", error);
      alert("Erro ao cadastrar manutenção");
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-accent"
      >
        <Button variant="outline">Cadastrar Manutenção</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chamado de Manutenção</DialogTitle>
          <DialogDescription>
            Faça o chamado de manutenções novas
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5 gap-1">
              <Label htmlFor="machine_id">ID da Máquina</Label>
              <select
                id="machine_id"
                className="border border-gray-300 rounded-md p-2"
                value={formData.machine_id}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Selecione uma máquina
                </option>
                {machines.map((machine) => (
                  <option key={machine.id} value={machine.id}>
                    {machine.name}
                  </option>
                ))}
              </select>
              <Label htmlFor="date">Data</Label>
              <DatePickerDemo
                onDateChange={(date) => {
                  const formattedDate = date
                    ? new Date(date).toISOString().split("T")[0] // Formata para yyyy-mm-dd
                    : "";
                  setFormData({
                    ...formData,
                    date: formattedDate,
                  });
                }}
              />
              <Label htmlFor="status">Status</Label>
              <Input
                id="status"
                placeholder="Status da manutenção"
                value={formData.status}
                onChange={handleInputChange}
              />
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                placeholder="Descrição da manutenção"
                value={formData.description}
                onChange={handleInputChange}
              />
              <Label htmlFor="priority">Prioridade</Label>
              <Input
                id="priority"
                placeholder="Prioridade da manutenção"
                value={formData.priority}
                onChange={handleInputChange}
              />
              <Label htmlFor="team_id">ID da Equipe</Label>
              <select
                id="team_id"
                className="border border-gray-300 rounded-md p-2"
                value={formData.team_id}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Selecione uma equipe
                </option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="container mx-auto flex justify-between mt-4">
            <DialogClose asChild>
              <Button variant="outline" size="lg">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" size="lg">
              Cadastrar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
