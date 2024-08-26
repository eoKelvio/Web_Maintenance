/**
 * v0 by Vercel.
 * @see https://v0.dev/t/6yziop514l8
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
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
import { Maintenances } from "../maintenance/maintenances";

export default function TeamMaintenance() {
  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-accent"
      >
        <Button variant="outline">Atribuir Equipe</Button>
      </DialogTrigger>
      <DialogContent className="w-auto">
        <DialogHeader>
          <DialogTitle>Atribuição da Equipe</DialogTitle>
          <DialogDescription>Atribuir equipe a manutenção.</DialogDescription>
        </DialogHeader>
        <form>
          <div className="grid w-full items-center gap-4">
            <Label htmlFor="team">Manutenção</Label>
            <Maintenances />
          </div>
        </form>
        <DialogClose asChild className="gap-5">
          <div className="container mx-auto flex justify-between">
            {/* <Button variant="outline" size="lg">
              Cancelar
            </Button> */}
            <Button size="lg">Atribuir</Button>
          </div>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
