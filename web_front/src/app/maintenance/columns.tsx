"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown, Trash, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { deleteMaintenance } from "@/services/MaintenanceService";
import { useRouter } from "next/navigation";

// Tipo que define o formato dos dados de manutenção.
export type Maintenance = {
  id: number;
  machine_id: number;
  date: string; // Data da solicitação
  status: string;
  description: string;
  priority: string;
  team_id: number;
};

export const columns: ColumnDef<Maintenance>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID da Manutenção
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "date",
    header: "Data",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "priority",
    header: "Prioridade",
  },
  {
    accessorKey: "details",
    header: "Detalhes",
    cell: ({ row }: { row: any }) => {
      const router = useRouter();
      return (
        <Button
          variant="ghost"
          onClick={() => router.push(`maintenance/${row.original.id}`)}
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
        const confirmDelete = window.confirm("Você tem certeza que deseja excluir essa manutenção?")
        if (!confirmDelete) return
        deleteMaintenance(partId)
      }

      const handleEdit = () => {
        setIsEditing(true) // Ativa o editor
      }

      const closeEditor = () => {
        setIsEditing(false) // Fecha o editor
      }

      return (
        <>
          {/* <StockEdit stockId={(partId)} /> */}

          {/* Coluna de Ações: Botão Excluir */}
          <Button variant="ghost" onClick={handleDelete}>
            <Trash/>
          </Button>

        </>
      )
    },
  },
];
