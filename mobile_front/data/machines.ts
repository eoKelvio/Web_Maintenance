const machines = Array.from({ length: 17 }, (_, index) => {
  // Define a quantidade de manutenções de forma dinâmica (entre 2 e 5 manutenções, por exemplo)
  const maintenanceCount = Math.floor(Math.random() * 4) + 2;

  // Gera o array de manutenções
  const maintenanceHistory = Array.from(
    { length: maintenanceCount },
    (__, mIndex) => ({
      date: `2023-${String(Math.floor(Math.random() * 12) + 1).padStart(
        2,
        "0"
      )}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
      description:
        mIndex % 2 === 0
          ? "Troca de óleo e verificação geral."
          : "Substituição de peças desgastadas.",
      performedBy: `Equipe ${String.fromCharCode(
        65 + ((index + mIndex) % 10)
      )}`,
      materialsUsed:
        mIndex % 2 === 0
          ? [
              { name: "Óleo Lubrificante", quantity: "2L" },
              { name: "Filtro de Óleo", quantity: "1 unidade" },
            ]
          : [
              { name: "Correia", quantity: "1 unidade" },
              { name: "Parafusos", quantity: "4 unidades" },
            ],
    })
  );

  return {
    name: `Máquina ${index + 1}`,
    type: `Tipo ${String.fromCharCode(65 + (index % 5))}`,
    model: `Modelo X${(index % 10) + 1}`,
    fabricationDate: `2022-01-${String((index % 28) + 1).padStart(2, "0")}`,
    serialNumber: `SN${String(index + 1).padStart(3, "0")}`,
    location: `Fábrica ${Math.floor(index / 5) + 1}`,
    status:
      index % 4 === 0
        ? "Rodando"
        : index % 4 === 1
        ? "Parado"
        : index % 4 === 2
        ? "Em Manutenção"
        : "Pendente",

    maintenanceHistory, // Adiciona o array gerado dinamicamente
  };
});

export default machines;
