import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePickerDemo } from "../date-picker";  // Caso você queira registrar a data de entrada ou saída
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

export default function StockRegister() {
  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-accent"
      >
        <Button variant="outline">Cadastrar Peça</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastro de Peça de Reposição</DialogTitle>
          <DialogDescription>
            Preencha as informações para cadastrar uma nova peça no estoque.
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5 gap-2">
              <Label htmlFor="name">Nome da Peça</Label>
              <Input id="name" placeholder="Nome da peça" />
              
              <Label htmlFor="code">Código</Label>
              <Input id="code" placeholder="Código da peça" />
              
              <Label htmlFor="supplier">Fornecedor</Label>
              <Input id="supplier" placeholder="Nome do fornecedor" />
              
              <Label htmlFor="quantity">Quantidade em Estoque</Label>
              <Input id="quantity" type="number" placeholder="Quantidade em estoque" />
              
              <Label htmlFor="unitPrice">Valor Unitário</Label>
              <Input id="unitPrice" type="number" placeholder="Valor unitário" />
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
