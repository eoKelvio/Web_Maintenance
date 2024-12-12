"use client"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from "axios"  // Importando o axios
import { deleteMachines } from "@/services/MachineService"
import { machine } from "os"

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
    cell: ({ row }) => {
      const machineId = row.original.id

      const handleDelete = async () => {
        // Confirmar com o usuário antes de excluir
        const confirmDelete = window.confirm("Você tem certeza que deseja excluir esta máquina?")
        if (!confirmDelete) 
          return
        deleteMachines(machineId)
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Opções</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(String(machineId))}
            >
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDelete}>Excluir</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
