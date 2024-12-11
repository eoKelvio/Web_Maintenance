"use client"
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";

// Interface para os usuários
interface User {
  id: number;
  name: string;
  role: string;
}

export default function TeamRegister() {
  const [users, setUsers] = useState<User[]>([]); // Lista de todos os usuários
  const [admins, setAdmins] = useState<User[]>([]); // Lista de admins filtrados
  const [teamName, setTeamName] = useState(""); // Nome da equipe
  const [selectedLeader, setSelectedLeader] = useState<number | null>(null); // Líder selecionado

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:9999/users");
        const allUsers = response.data; // Supondo que a resposta seja uma lista de usuários
        setUsers(allUsers);

        // Filtra os usuários com role "admin"
        const filteredAdmins = allUsers.filter((user: User) => user.role === "admin");
        setAdmins(filteredAdmins);
      } catch (error: any) {
        console.error("Erro ao buscar usuários:", error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName || selectedLeader === null) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:9999/teams", {
        name: teamName,
        leader_id: selectedLeader,
      });
      console.log("Equipe cadastrada com sucesso:", response.data);
      alert("Equipe cadastrada com sucesso!");
      // Opcional: Limpar os campos após o envio
      setTeamName("");
      setSelectedLeader(null);
    } catch (error: any) {
      console.error("Erro ao cadastrar equipe:", error.message);
      alert("Erro ao cadastrar equipe.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-accent"
      >
        <Button variant="outline">Criar Equipe</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastro de Equipe</DialogTitle>
          <DialogDescription>
            Faça cadastro de uma nova equipe de manutenção
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleRegister}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5 gap-1">
              <Label htmlFor="teamName">Nome da Equipe</Label>
              <Input
                id="teamName"
                placeholder="Nome da equipe"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                required
              />

              <Label htmlFor="leader">Líder da Equipe</Label>
              <select
                id="leader"
                className="border border-gray-300 rounded-md p-2"
                value={selectedLeader ?? ""}
                onChange={(e) => setSelectedLeader(Number(e.target.value))}
                required
              >
                <option value="" disabled>
                  Selecione um líder
                </option>
                {admins.map((admin) => (
                  <option key={admin.id} value={admin.id}>
                    {admin.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <DialogClose asChild>
            <div className="container mx-auto flex justify-between mt-4">
              <Button variant="outline" size="lg" type="button">
                Cancelar
              </Button>
              <Button size="lg" type="submit">
                Cadastrar
              </Button>
            </div>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}
