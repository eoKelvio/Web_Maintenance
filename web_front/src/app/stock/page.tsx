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

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow container mx-auto">
      </div>
      <Footer />
    </div>
  );
}
