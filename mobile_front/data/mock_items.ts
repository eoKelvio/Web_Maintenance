// Type definition for an Item
export type Item = {
  id: number; // Unique identifier for the item
  name: string; // Name of the item
  unit: string; // Unit of measurement (e.g., liters, units)
  currentStock: number; // Current stock level of the item
  minimumStock: number; // Minimum stock level for the item
  status: "Normal" | "Abaixo"; // Status indicating if the item is normal or below minimum stock
};

// Array of mock items
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

// Function to generate random stock quantities and statuses
export const generateRandomStock = (): Item[] => {
  return items.map((item) => {
    const currentStock = Math.floor(Math.random() * 20); // Random current stock between 0 and 19
    const minimumStock = Math.floor(Math.random() * 10) + 1; // Random minimum stock between 1 and 10
    const status = currentStock < minimumStock ? "Abaixo" : "Normal"; // Determine status based on current stock

    return {
      ...item, // Spread the existing item properties
      currentStock, // Update current stock
      minimumStock, // Update minimum stock
      status, // Update status
    };
  });
};

// Variable to store the randomly generated stock
export const stockedItems: Item[] = generateRandomStock(); // Generates and stores the stocked items
