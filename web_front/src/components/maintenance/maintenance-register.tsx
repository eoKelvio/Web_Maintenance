import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePickerDemo } from "../date-picker";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Status } from "../status-button";
import { Teams } from "../team/teams";
import { Priority } from "../priority-button";
import { Type } from "../type-button";

export default function MaintenanceRegister() {
  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-accent"
      >
        <Button variant="outline">Solicitar Manutenção</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastro de Manutenção</DialogTitle>
          <DialogDescription>Faça cadastro de uma manutenção</DialogDescription>
        </DialogHeader>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5 gap-1">
              <Label htmlFor="responsability">Responsável</Label>
              <Teams />
              <Label htmlFor="solicitation">Data da Solicitação</Label>
              <DatePickerDemo />
              <Label htmlFor="priority">Prioridade</Label>
              <Priority />
              <Label htmlFor="status">Status</Label>
              <Status />
              <Label htmlFor="type">Tipo</Label>
              <Type />
              <Label htmlFor="description">Descrição</Label>
              <Textarea className="w-full p-2 resize-none overflow-hidden rounded-md border border-gray-300 rows=1" />
            </div>
          </div>
        </form>
        <DialogClose asChild>
          <div className="container mx-auto flex justify-between">
            <Button variant="outline" size="lg">
              Cancelar
            </Button>
            <Button size="lg">Cadastrar</Button>
          </div>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
