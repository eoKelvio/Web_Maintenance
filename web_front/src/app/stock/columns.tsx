"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deletePart } from "@/services/PartsService";
import StockEdit from "@/components/stock/stock-edit";
import { ExternalLink } from "lucide-react";
import { Trash } from "lucide-react";

// Tipo que define o formato dos dados da peça baseado no JSON fornecido.
export type SparePart = {
  id: number; // Ajustado para number
  name: string;
  quantity: number;
  cost: number; // Ajustado para cost
};

export const columns: ColumnDef<SparePart>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "quantity",
    header: "Quantidade",
  },
  {
    accessorKey: "cost",
    header: "Custo (R$)",
    cell: ({ getValue }) => `R$ ${getValue<number>().toFixed(2)}`, // Formata o custo como moeda
  },
  {
    accessorKey: "details",
    header: "Detalhes",
    cell: ({ row }: { row: any }) => {
      const router = useRouter();
      return (
        <Button
          variant="ghost"
          onClick={() => router.push(`stock/item/${row.original.id}`)}
        >
          <ExternalLink/>
        </Button>
      );
    },
  },
  {
    id: "actions",
    header: "Ações", // Adicionando título para a coluna de Ações
    cell: ({ row }) => {
      const partId = row.original.id
      const [isEditing, setIsEditing] = useState(false) // Controlando a exibição do editor

      const handleDelete = async () => {
        const confirmDelete = window.confirm("Você tem certeza que deseja excluir esse componente?")
        if (!confirmDelete) return
        deletePart(partId)
      }

      const handleEdit = () => {
        setIsEditing(true) // Ativa o editor
      }

      const closeEditor = () => {
        setIsEditing(false) // Fecha o editor
      }

      return (
        <>
          <StockEdit stockId={(partId)} />

          {/* Coluna de Ações: Botão Excluir */}
          <Button variant="ghost" onClick={handleDelete}>
            <Trash/>
          </Button>

        </>
      )
    },
  },
];
