// mock_items.ts
export type Item = {
  id: number;
  name: string;
  unit: string;
  currentStock: number;
  minimumStock: number;
  status: "Normal" | "Abaixo";
};

export const items: Item[] = [
  {
    id: 1,
    name: "Óleo Lubrificante",
    unit: "L",
    currentStock: 0,
    minimumStock: 0,
    status: "Normal",
  },
  {
    id: 2,
    name: "Filtro de Óleo",
    unit: "unidade",
    currentStock: 0,
    minimumStock: 0,
    status: "Normal",
  },
  {
    id: 3,
    name: "Correia",
    unit: "unidade",
    currentStock: 0,
    minimumStock: 0,
    status: "Normal",
  },
  {
    id: 4,
    name: "Parafusos",
    unit: "unidades",
    currentStock: 0,
    minimumStock: 0,
    status: "Normal",
  },
  {
    id: 5,
    name: "Graxa",
    unit: "kg",
    currentStock: 0,
    minimumStock: 0,
    status: "Normal",
  },
  {
    id: 6,
    name: "Rolamento",
    unit: "unidade",
    currentStock: 0,
    minimumStock: 0,
    status: "Normal",
  },
];

// Função para gerar status e quantidades aleatórias
export const generateRandomStock = (): Item[] => {
  return items.map((item) => {
    const currentStock = Math.floor(Math.random() * 20);
    const minimumStock = Math.floor(Math.random() * 10) + 1;
    const status = currentStock < minimumStock ? "Abaixo" : "Normal";

    return {
      ...item,
      currentStock,
      minimumStock,
      status,
    };
  });
};

// Variável para armazenar o estoque gerado aleatoriamente
export const stockedItems: Item[] = generateRandomStock();
