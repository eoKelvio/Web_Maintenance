"use client"
import { useState, useEffect } from "react";
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
import { updateMachine, getMachineById } from "@/services/MachineService"; 

type MachineEditProps = {
  machineId: number;
};

export default function MachineEdit({ machineId }: MachineEditProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    fabrication_date: "",
    serial_number: "",
    local: "",
  });

  useEffect(() => {
    // Carregar os dados da máquina com base no ID
    const fetchMachineData = async () => {
      try {
        const response = await getMachineById(machineId);
        setFormData({
          name: response.name,
          type: response.type,
          fabrication_date: response.fabrication_date,
          serial_number: response.serial_number,
          local: response.local,
        });
      } catch (error) {
        console.error("Erro ao carregar dados da máquina:", error);
        alert("Erro ao carregar dados da máquina");
      }
    };

    fetchMachineData();
  }, [machineId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await updateMachine(machineId, formData); // Atualizando a máquina
      alert("Máquina atualizada com sucesso!");
      window.location.reload()

    } catch (error) {
      console.error("Erro ao atualizar a máquina:", error);
      alert("Erro ao atualizar a máquina");
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        asChild
      >
        <Button variant="ghost">Editar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edição de Máquina</DialogTitle>
          <DialogDescription>Edite as informações da máquina</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5 gap-1">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Nome da máquina"
                value={formData.name}
                onChange={handleInputChange}
              />
              <Label htmlFor="type">Tipo</Label>
              <Input
                id="type"
                placeholder="Tipo de máquina"
                value={formData.type}
                onChange={handleInputChange}
              />
              <Label htmlFor="fabrication_date">Fabricação</Label>
              <Input
                id="type"
                placeholder="Data de fabricação"
                value={formData.fabrication_date}
                onChange={handleInputChange}
              />
              <Label htmlFor="serial_number">Serial</Label>
              <Input
                id="serial_number"
                placeholder="Número de série"
                value={formData.serial_number}
                onChange={handleInputChange}
              />
              <Label htmlFor="local">Local</Label>
              <Input
                id="local"
                placeholder="Localização da máquina"
                value={formData.local}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="container mx-auto flex justify-between mt-4">
            <DialogClose asChild>
              <Button variant="ghost" size="lg">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" size="lg">
              Atualizar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
