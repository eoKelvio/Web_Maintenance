# Aplicativo de Gestão de Manutenção

Este projeto é um aplicativo móvel desenvolvido com React Native e Expo, projetado para gerenciar a manutenção de máquinas de forma eficiente. Os usuários podem visualizar o histórico de manutenção, solicitar manutenção e acompanhar o status das máquinas em tempo real.

## Recursos

- **Autenticação de Usuário**: Login seguro para usuários gerenciarem tarefas de manutenção.
- **Visão Geral das Máquinas**: Visualizar detalhes sobre as máquinas, incluindo status, localização e histórico de manutenção.
- **Solicitações de Manutenção**: Enviar pedidos de manutenção, fornecendo detalhes sobre a máquina e os problemas encontrados.
- **Acompanhamento de Manutenção**: Iniciar e finalizar sessões de manutenção, atualizando o status da máquina conforme necessário.
- **Registros de Histórico**: Acessar um log abrangente das atividades de manutenção anteriores.

## Stack Tecnológica

- **React Native**: Framework para construção de aplicativos nativos usando React.
- **Expo**: Um conjunto de ferramentas para desenvolver aplicativos React Native.
- **TypeScript**: Linguagem de programação fortemente tipada para melhor qualidade de código.
- **Dados Simulados**: Dados simulados para testes e propósitos de desenvolvimento.

## Começando

Para configurar e executar o aplicativo localmente, siga estes passos:

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/eoKelvio/Web_Maintenance.git
   cd Web_Maintenance/mobile_front
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**:

   ```bash
   npx expo start
   ```

4. **Execute o aplicativo**:
   - Você pode escanear o QR code com o aplicativo Expo Go ou usar um emulador para rodar o aplicativo em seu dispositivo.

## Estrutura de Arquivos

```plaintext
.
├── components             # Componentes de UI reutilizáveis
├── data                   # Arquivos de dados simulados
│   ├── mock_items.ts      # Itens simulados para manutenção
│   ├── mock_machines.ts   # Dados simulados de máquinas
│   ├── mock_maintenances.ts # Registros simulados de manutenção
│   └── mock_teams.ts      # Dados simulados de equipes
├── screens                # Telas para diferentes funcionalidades do aplicativo
│   ├── MaintenanceHistory.tsx      # Visualizar histórico de manutenção
│   ├── MaintenancePending.tsx      # Visualizar tarefas de manutenção pendentes
│   ├── MaintenanceRequest.tsx      # Solicitar nova manutenção
│   └── MaintenanceRunning.tsx      # Visualizar manutenção em andamento
└── App                    # Ponto de entrada principal do aplicativo
```

## Contribuindo

Contribuições são bem-vindas! Se você encontrar algum problema ou tiver sugestões de melhoria, por favor, abra uma issue ou envie um pull request.

## Licença

Este projeto está licenciado sob a Licença MIT - consulte o arquivo [LICENSE](LICENSE) para detalhes.
