"use client"
import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deleteMachines } from "@/services/MachineService"
import MachineEdit from "@/components/machine/machine-edit"

// Tipo que define o formato dos dados da máquina.
export type Machine = {
  id: number
  name: string
  type: string
  fabrication_date: string
  local: string
  serial_number: string
}

export const columns: ColumnDef<Machine>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "type",
    header: "Tipo",
  },
  {
    accessorKey: "fabrication_date",
    header: "Data de Fabricação",
  },
  {
    accessorKey: "local",
    header: "Local",
  },
  {
    accessorKey: "serial_number",
    header: "Número de Série",
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Ações", // Adicionando título para a coluna de Ações
    cell: ({ row }) => {
      const machineId = row.original.id
      const [isEditing, setIsEditing] = useState(false) // Controlando a exibição do editor

      const handleDelete = async () => {
        const confirmDelete = window.confirm("Você tem certeza que deseja excluir esta máquina?")
        if (!confirmDelete) return
        deleteMachines(machineId)
      }

      const handleEdit = () => {
        setIsEditing(true) // Ativa o editor
      }

      const closeEditor = () => {
        setIsEditing(false) // Fecha o editor
      }

      return (
        <>
          <MachineEdit machineId={(machineId)} />

          {/* Coluna de Ações: Botão Excluir */}
          <Button variant="ghost" onClick={handleDelete}>
          <Trash/>
          </Button>

        </>
      )
    },
  },
]
