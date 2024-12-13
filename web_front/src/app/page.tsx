import { Button } from "@/components/ui/button";
import Footer from "../components/footer";
import Header from "../components/header";
import { Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption, } from "@/components/ui/table";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow container mx-auto h-full">
        <h1 className="text-center font-bold text-4xl mt-40">Bem vindo a aplicação da nossa Fábrica</h1>
      </div>
    </div>
  );
}
