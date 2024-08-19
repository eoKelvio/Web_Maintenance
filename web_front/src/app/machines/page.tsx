import { Button } from "@/components/ui/button";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption, } from "@/components/ui/table";
import Line from "@/components/line";
import MachineRegister from "@/components/machine-register";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto flex justify-between mt-5">
        <h1 className="title">Consulta de Máquinas</h1>
        <MachineRegister/>
      </div>
      <Line/>
      <div className="container mx-auto mt-5 flex-grow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Modelo</TableHead>
            <TableHead>Fabricação</TableHead>
            <TableHead>Serial</TableHead>
            <TableHead>Localização</TableHead>
            <TableHead>Ultima Manutenção</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Empilhadeirão</TableCell>
            <TableCell>Empilhadeira</TableCell>
            <TableCell>Toyota</TableCell>
            <TableCell>10/03/2013</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>1110093</TableCell>
            <TableCell>05/05/2023</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Empilhadeirão</TableCell>
            <TableCell>Empilhadeira</TableCell>
            <TableCell>Toyota</TableCell>
            <TableCell>10/03/2013</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>1110093</TableCell>
            <TableCell>05/05/2023</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Empilhadeirão</TableCell>
            <TableCell>Empilhadeira</TableCell>
            <TableCell>Toyota</TableCell>
            <TableCell>10/03/2013</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>1110093</TableCell>
            <TableCell>05/05/2023</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Empilhadeirão</TableCell>
            <TableCell>Empilhadeira</TableCell>
            <TableCell>Toyota</TableCell>
            <TableCell>10/03/2013</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>1110093</TableCell>
            <TableCell>05/05/2023</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Empilhadeirão</TableCell>
            <TableCell>Empilhadeira</TableCell>
            <TableCell>Toyota</TableCell>
            <TableCell>10/03/2013</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>1110093</TableCell>
            <TableCell>05/05/2023</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Empilhadeirão</TableCell>
            <TableCell>Empilhadeira</TableCell>
            <TableCell>Toyota</TableCell>
            <TableCell>10/03/2013</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>1110093</TableCell>
            <TableCell>05/05/2023</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Empilhadeirão</TableCell>
            <TableCell>Empilhadeira</TableCell>
            <TableCell>Toyota</TableCell>
            <TableCell>10/03/2013</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>1110093</TableCell>
            <TableCell>05/05/2023</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Empilhadeirão</TableCell>
            <TableCell>Empilhadeira</TableCell>
            <TableCell>Toyota</TableCell>
            <TableCell>10/03/2013</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>1110093</TableCell>
            <TableCell>05/05/2023</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Empilhadeirão</TableCell>
            <TableCell>Empilhadeira</TableCell>
            <TableCell>Toyota</TableCell>
            <TableCell>10/03/2013</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>1110093</TableCell>
            <TableCell>05/05/2023</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      </div>
      <Footer />
    </div>
  );
}
