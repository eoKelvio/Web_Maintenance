"use client"
import axios from "axios";
import { useState } from "react";
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

export default function UserRegister() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    role: "",
    team_id: "",
  });

  const handleChange = (e:any) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault(); // Previne o recarregamento da página
    try {
      const dataToSend = {
        ...formData,
        team_id: formData.team_id.trim() === "" ? null : formData.team_id,
      };

      const response = await axios.post("http://localhost:9999/users/", dataToSend);
      console.log("Usuário cadastrado com sucesso:", response.data);
      alert("Usuário cadastrado com sucesso!");
    } catch (error:any) {
      console.error("Erro ao cadastrar usuário:", error.message);
      alert("Ocorreu um erro ao cadastrar o usuário. Tente novamente.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-accent"
      >
        <Button variant="outline">Cadastrar Usuário</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastro de Usuário</DialogTitle>
          <DialogDescription>
            Preencha as informações para cadastrar um novo usuário.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5 gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Nome completo"
                value={formData.name}
                onChange={handleChange}
              />

              <Label htmlFor="username">Nome de Usuário</Label>
              <Input
                id="username"
                placeholder="Nome de usuário"
                value={formData.username}
                onChange={handleChange}
              />

              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Senha"
                value={formData.password}
                onChange={handleChange}
              />

              <Label htmlFor="role">Função</Label>
              <Input
                id="role"
                placeholder="Função do usuário (ex.: Admin, Usuário)"
                value={formData.role}
                onChange={handleChange}
              />

              <Label htmlFor="team_id">ID da Equipe</Label>
              <Input
                id="team_id"
                placeholder="ID da equipe (opcional)"
                value={formData.team_id}
                onChange={handleChange}
              />
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
