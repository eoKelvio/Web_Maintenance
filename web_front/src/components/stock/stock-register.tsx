"use client";

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
import { createPart } from "@/services/PartsService";

export default function StockRegister() {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    cost: "",
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
    try {
      const payload = {
        ...formData,
        quantity: parseInt(formData.quantity),
        cost: parseFloat(formData.cost),
      };
      console.log(payload)
      await createPart(payload);
      alert("Peça cadastrada com sucesso!");
      window.location.reload(); // Atualizar a página após o cadastro
    } catch (error) {
      console.error("Erro ao cadastrar a peça:", error);
      alert("Erro ao cadastrar a peça");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Cadastrar Peça</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastro de Peça de Reposição</DialogTitle>
          <DialogDescription>
            Preencha as informações para cadastrar uma nova peça no estoque.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5 gap-2">
              <Label htmlFor="name">Nome da Peça</Label>
              <Input
                id="name"
                placeholder="Nome da peça"
                value={formData.name}
                onChange={handleInputChange}
              />

              <Label htmlFor="quantity">Quantidade em Estoque</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="Quantidade em estoque"
                value={formData.quantity}
                onChange={handleInputChange}
              />

              <Label htmlFor="cost">Valor Unitário</Label>
              <Input
                id="cost"
                type="number"
                placeholder="Valor unitário"
                value={formData.cost}
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
