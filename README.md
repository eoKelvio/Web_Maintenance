# **Sistema de Gerenciamento de Manutenção - Dispositivos Web e Mobile**

Bem-vindo ao repositório do **Sistema de Gerenciamento de Manutenção**, um projeto que centraliza o controle de máquinas, manutenções, equipes e materiais de forma integrada para dispositivos web e mobile.

## **Índice**

1. [Sobre o Projeto](#sobre-o-projeto)
2. [Funcionalidades Principais](#funcionalidades-principais)
3. [Arquitetura do Projeto](#arquitetura-do-projeto)
4. [Frontend Web](#frontend-web)
   - [Instalação e Configuração](#instalação-e-configuração-web)
   - [Estrutura de Pastas](#estrutura-de-pastas-web)
   - [Funcionalidades](#funcionalidades-web)
5. [Frontend Mobile](#frontend-mobile)
   - [Instalação e Configuração](#instalação-e-configuração-mobile)
   - [Estrutura de Pastas](#estrutura-de-pastas-mobile)
   - [Funcionalidades](#funcionalidades-mobile)
6. [Backend (Coming Soon)](#backend-coming-soon)
7. [Contribuindo](#contribuindo)
8. [Licença](#licença)

---

## **Sobre o Projeto**

O **Sistema de Gerenciamento de Manutenção** foi projetado para otimizar o gerenciamento de máquinas, manutenções e recursos em uma empresa. A plataforma oferece uma experiência uniforme para web e dispositivos móveis, permitindo:

- Monitorar o status de máquinas e manutenções.
- Registrar e acompanhar o uso de materiais e peças.
- Atribuir e gerenciar equipes de manutenção.
- Acompanhar chamados e respondê-los rapidamente.

---

## **Funcionalidades Principais**

- Gerenciamento completo de máquinas, com status e detalhes.
- Histórico de manutenções realizadas e pendentes.
- Controle de estoque e materiais utilizados em manutenções.
- Gerenciamento de equipes de manutenção.
- Abertura e resposta a chamados de manutenção.
- Dashboard com indicadores de desempenho e metas.
- Suporte a tema claro e escuro.

---

## **Arquitetura do Projeto**

- **Frontend Web**: Construído com Next.js, utilizando **shadcn/ui** e **Tailwind CSS**.
- **Frontend Mobile**: Desenvolvido em React Native (SDK 51), utilizando **RNR (React Native Reusables)** para componentes reutilizáveis.
- **Backend**: Desenvolvido em **FastAPI** (detalhes a serem adicionados posteriormente).

---

## **Frontend Web**

### **Instalação e Configuração Web**

#### **Pré-requisitos**

- Node.js (v16 ou superior)
- npm ou yarn

#### **Passos para instalação**

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/sistema-manutencao.git
   cd sistema-manutencao/web
   ```
2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```
3. Configure as variáveis de ambiente no arquivo `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   NEXT_PUBLIC_APP_NAME=Sistema Manutenção
   ```
4. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```
5. Acesse o projeto em [http://localhost:3000](http://localhost:3000).

---

### **Estrutura de Pastas Web**

```plaintext
web/
├── app/
│   ├── dashboard/
│   ├── maquinas/
│   ├── manutencoes/
│   ├── equipes/
│   ├── estoque/
│   └── api/
├── components/
│   ├── ui/  # Componentes reutilizáveis com shadcn
│   ├── tables/  # Tabelas dinâmicas
│   └── forms/  # Componentes de formulários
├── styles/  # Configuração do Tailwind CSS
└── utils/  # Funções utilitárias
```

---

### **Funcionalidades Web**

- **Tela de Login e Registro**:

  - Autenticação JWT com cache de memória para persistência de sessão.

- **Dashboard**:

  - Exibição de gráficos e indicadores de metas.
  - Informações gerais sobre máquinas e manutenções.

- **Gestão de Máquinas**:

  - Listagem de máquinas, com detalhes e status.

- **Gestão de Manutenções**:

  - Histórico detalhado de manutenções realizadas.
  - Manutenções pendentes e informações associadas.

- **Gestão de Equipes**:

  - Visualização e controle de equipes responsáveis por manutenções.

- **Controle de Estoque**:
  - Monitoramento de materiais utilizados nas manutenções.

---

## **Frontend Mobile**

### **Instalação e Configuração Mobile**

#### **Pré-requisitos**

- Node.js (v16 ou superior)
- npm ou yarn
- Expo CLI

#### **Passos para instalação**

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/sistema-manutencao.git
   cd sistema-manutencao/mobile
   ```
2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```
3. Configure as variáveis de ambiente no arquivo `.env`:
   ```env
   API_URL=http://localhost:8000
   ```
4. Execute o aplicativo em ambiente de desenvolvimento:
   ```bash
   npx expo start
   ```

---

### **Estrutura de Pastas Mobile**

```plaintext
mobile/
├── src/
│   ├── screens/
│   │   ├── Dashboard.tsx
│   │   ├── Maquinas.tsx
│   │   ├── Manutencoes.tsx
│   │   ├── Equipes.tsx
│   │   └── Estoque.tsx
│   ├── components/
│   │   ├── ui/  # Componentes reutilizáveis com RNR
│   │   ├── forms/
│   │   └── cards/
│   ├── services/  # Comunicação com a API
│   └── utils/  # Funções utilitárias
```

---

### **Funcionalidades Mobile**

- **Experiência uniforme** com o frontend web, incluindo:
  - Login e registro.
  - Dashboard com gráficos e indicadores.
  - Gestão de máquinas, manutenções, equipes e estoque.
  - Suporte completo a tema claro e escuro.

---

## **Backend (Coming Soon)**

A seção de backend será detalhada futuramente, incluindo informações sobre:

- Arquitetura.
- Endpoints disponíveis.
- Modelos de dados.
- Estratégias de autenticação e autorização.

---

## **Contribuindo**

1. Faça um fork do repositório.
2. Crie uma branch para suas alterações (`git checkout -b feature/nova-feature`).
3. Realize os commits (`git commit -m 'Adicionei nova feature'`).
4. Envie as alterações para o repositório remoto (`git push origin feature/nova-feature`).
5. Abra um pull request.

---

## **Licença**

Este projeto está licenciado sob a [MIT License](./LICENSE).
