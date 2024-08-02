import { Button } from "@/components/ui/button";
import Footer from "../components/footer";
import Header from "../components/header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow container mx-auto">
        <Button>BOTÃO</Button>
      </div>
      <Footer />
    </div>
  );
}
