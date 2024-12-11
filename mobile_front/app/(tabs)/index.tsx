import { View, Text } from "react-native";
import DashCards from "~/components/DashCards";
import MaintenanceChart from "~/components/DashChart";
import { Separator } from "~/components/ui/separator";
import { url } from "~/lib/utils";
import { useEffect } from "react";

export default function Home() {
  // Função para realizar o GET
  const fetchData = async () => {
    try {
      const response = await fetch(url + "/users"); // Faz a requisição
      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }
      const data = await response.json(); // Converte a resposta para JSON
      console.log("Dados recebidos:", data); // Exibe os dados no console
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  // Chama o fetchData ao montar o componente
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View className="h-full bg-secondary/30">
      <DashCards />
      <Separator
        orientation="horizontal"
        className="bg-secondary-foreground/40"
      />
      <MaintenanceChart />
    </View>
  );
}
