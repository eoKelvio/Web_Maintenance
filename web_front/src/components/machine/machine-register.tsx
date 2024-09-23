/**
 * v0 by Vercel.
 * @see https://v0.dev/t/6yziop514l8
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DatePickerDemo } from "@/components/date-picker"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


export default function MachineRegister() {
  return (
    <Dialog>
      <DialogTrigger asChild className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-accent">
        <Button variant="outline">Cadastrar Máquina</Button>
      </DialogTrigger>
      <DialogContent>
      <DialogHeader>
          <DialogTitle>Cadastro de Máquina</DialogTitle>
          <DialogDescription>
            Faça cadastro de máquinas novas
          </DialogDescription>
        </DialogHeader>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5 gap-1">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" placeholder="Nome da maquina" />
                  <Label htmlFor="type">Tipo</Label>
                  <Input id="type" placeholder="Tipo de máquina" />
                  <Label htmlFor="fabrication">Fabricação</Label>
                  <DatePickerDemo/>
                  <Label htmlFor="serie">Serial</Label>
                  <Input id="serie" placeholder="Número de série" />
                  <Label htmlFor="local">Local</Label>
                  <Input id="local" placeholder="Localização da máquina" />
                  <Label htmlFor="history">Histórico</Label>
                  <DatePickerDemo/>
                </div>
              </div>
            </form>
            <DialogClose asChild>
                <div className="container mx-auto flex justify-between">
                  <Button variant="outline" size="lg">Cancelar</Button>
                  <Button size="lg">Cadastrar</Button>
                </div>
            </DialogClose>
      </DialogContent>
    </Dialog>
  )
}