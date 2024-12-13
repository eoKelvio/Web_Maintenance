"use client";
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
import { updatePart, getPartById } from "@/services/PartsService";
import { Edit } from "lucide-react";

type StockEditProps = {
  stockId: number;
};

export default function StockEdit({ stockId }: StockEditProps) {
  const [formData, setFormData] = useState({
    name: "",
    quantity: 0,
    cost: 0.0,
  });

  useEffect(() => {
    // Carregar os dados do estoque com base no ID
    const fetchStockData = async () => {
      try {
        const response = await getPartById(stockId);
        setFormData({
          name: response.name,
          quantity: response.quantity,
          cost: response.cost,
        });
      } catch (error) {
        console.error("Erro ao carregar dados do estoque:", error);
        alert("Erro ao carregar dados do estoque");
      }
    };

    fetchStockData();
  }, [stockId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "quantity" || id === "cost" ? Number(value) : value, // Convertendo valores numéricos
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await updatePart(stockId, formData); // Atualizando o estoque
      alert("Estoque atualizado com sucesso!");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao atualizar o estoque:", error);
      alert("Erro ao atualizar o estoque");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edição de Estoque</DialogTitle>
          <DialogDescription>Edite as informações do estoque</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5 gap-1">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Nome do item"
                value={formData.name}
                onChange={handleInputChange}
              />
              <Label htmlFor="quantity">Quantidade</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="Quantidade em estoque"
                value={formData.quantity}
                onChange={handleInputChange}
              />
              <Label htmlFor="cost">Custo</Label>
              <Input
                id="cost"
                type="number"
                step="0.01"
                placeholder="Custo por unidade"
                value={formData.cost}
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
