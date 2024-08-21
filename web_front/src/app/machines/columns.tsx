"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

// Tipo que define o formato dos dados da máquina.
export type Machine = {
  id: string
  name: string
  type: string
  model: string
  serialNumber: string
  manufacturingDate: string
  location: string
  maintenanceHistory: string[]
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
    accessorKey: "model",
    header: "Modelo",
  },
  {
    accessorKey: "serialNumber",
    header: "Número de Série",
  },
  {
    accessorKey: "manufacturingDate",
    header: "Data de Fabricação",
  },
  {
    accessorKey: "location",
    header: "Localização",
  },
  {
    accessorKey: "maintenanceHistory",
    header: "Histórico de Manutenção",
    cell: ({ row }) => {
      const maintenanceHistory = row.getValue("maintenanceHistory") as string[]
      return (
        <ul>
          {maintenanceHistory.map((entry: string, index: number) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const machineId = row.original.id
  
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
              onClick={() => navigator.clipboard.writeText(machineId)}
            >
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Excluir</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },  
]
