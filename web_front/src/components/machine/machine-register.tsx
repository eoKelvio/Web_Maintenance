"use client"
import { useState } from "react";
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
import { createMachines } from "@/services/MachineService";

export default function MachineRegister() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    fabrication_date: "",
    serial_number: "",
    local: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await createMachines(formData);
      alert("Máquina cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar máquina:", error);
      alert("Erro ao cadastrar máquina");
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-accent"
      >
        <Button variant="outline">Cadastrar Máquina</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastro de Máquina</DialogTitle>
          <DialogDescription>Faça cadastro de máquinas novas</DialogDescription>
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
              <DatePickerDemo
                onDateChange={(date) => {
                  const formattedDate = date
                    ? new Date(date).toISOString().split("T")[0] // Formata para yyyy-mm-dd
                    : "";
                  setFormData({
                    ...formData,
                    fabrication_date: formattedDate,
                  });
                }}
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
