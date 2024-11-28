import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
  Key,
} from "react";

export default function DetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const mockData = [
    {
      id: "001",
      name: "Filtro de Óleo",
      code: "FO-1234",
      supplier: "Fornecedor A",
      quantity: 20,
      unitPrice: "R$ 50,00",
      moviment: [
        {
          type: true,
          date: "01/01/0001",
          quantity: 10,
        },
        {
          type: false,
          date: "02/02/0001",
          quantity: 10,
        },
        {
          type: true,
          date: "03/03/0001",
          quantity: 25,
        },
      ],
    },
    {
      id: "002",
      name: "Correia Dentada",
      code: "CD-5678",
      supplier: "Fornecedor B",
      quantity: 15,
      unitPrice: "R$ 120,00",
      moviment: [
        {
          type: true,
          date: "01/01/0001",
          quantity: 10,
        },
        {
          type: false,
          date: "02/02/0001",
          quantity: 10,
        },
        {
          type: true,
          date: "03/03/0001",
          quantity: 25,
        },
      ],
    },
    {
      id: "003",
      name: "Pastilha de Freio",
      code: "PF-9101",
      supplier: "Fornecedor C",
      quantity: 50,
      unitPrice: "R$ 30,00",
      moviment: [
        {
          type: true,
          date: "01/01/0001",
          quantity: 10,
        },
        {
          type: false,
          date: "02/02/0001",
          quantity: 10,
        },
        {
          type: true,
          date: "03/03/0001",
          quantity: 25,
        },
      ],
    },
  ];

  const item = mockData.find((item) => item.id === id);

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold text-red-500">Item não encontrado</h1>
        <p className="text-lg text-gray-600 mt-4">
          O item com ID <span className="font-mono">{id}</span> não foi encontrado.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screenx p-6">
      <div className="transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted p-6">
        <h1 className="px-4 mb-6 text-left text-3xl align-middle font-bold text-muted-foreground">Detalhes do Item</h1>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <p>
            <span className="font-semibold">ID:</span> {item.id}
          </p>
          <p>
            <span className="font-semibold">Nome:</span> {item.name}
          </p>
          <p>
            <span className="font-semibold">Código:</span> {item.code}
          </p>
          <p>
            <span className="font-semibold">Fornecedor:</span> {item.supplier}
          </p>
          <p>
            <span className="font-semibold">Quantidade:</span> {item.quantity}
          </p>
          <p>
            <span className="font-semibold">Preço Unitário:</span> {item.unitPrice}
          </p>
        </div>

        <h2 className="px-4 mb-6 text-left text-2xl align-middle font-bold text-muted-foreground">Movimentações</h2>
        <table className="w-full border border-gray-200">
          <thead>
            <tr className="text-left">
              <th className="transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted p-3">Tipo</th>
              <th className="transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted p-3">Data</th>
              <th className="transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted p-3">Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {item.moviment.map((moviment, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted" : "transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                } transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted`}
              >
                <td className="px-4 py-2">
                  {moviment.type ? (
                    <span className="text-green-600 font-bold">Entrada</span>
                  ) : (
                    <span className="text-red-600 font-bold">Saída</span>
                  )}
                </td>
                <td className="px-4 py-2">{moviment.date}</td>
                <td className="px-4 py-2">{moviment.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}