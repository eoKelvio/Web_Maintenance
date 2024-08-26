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

export default function TeamRegister() {
  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-accent"
      >
        <Button variant="outline">Criar Equipe</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastro de Equipe</DialogTitle>
          <DialogDescription>
            Faça cadastro de uma nova equipe de manutenção
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5 gap-1">
              <Label htmlFor="teamName">Nome da Equipe</Label>
              <Input id="teamName" placeholder="Nome da equipe" />

              <Label htmlFor="members">Membros da Equipe</Label>
              <Input id="members" placeholder="Nome dos membros da equipe" />

              <Label htmlFor="speciality">Especialidade</Label>
              <Input
                id="speciality"
                placeholder="Especialidade da equipe (e.g., Mecânica, Elétrica)"
              />

              <Label htmlFor="availability">Disponibilidade</Label>
              <DatePickerDemo />
            </div>
          </div>
        </form>
        <DialogClose asChild>
          <div className="container mx-auto flex justify-between mt-4">
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
