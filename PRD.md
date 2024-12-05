# PRD - Product Requirements Document

## Introdução & objetivo

O Sistema de Gerenciamento de Manutenção é uma aplicação web projetada para atender às necessidades de uma grande empresa industrial que fabrica peças automotivas. O objetivo principal é otimizar os processos de manutenção, tanto preventiva quanto corretiva, garantindo a produtividade e a segurança dos colaboradores. Atualmente, a empresa enfrenta diversos desafios devido ao uso de um sistema de gerenciamento manual, como a falta de organização e controle, comunicação ineficiente e perda de tempo e produtividade. A implementação deste sistema visa resolver esses problemas, proporcionando uma melhor organização, comunicação eficaz e maior eficiência nas operações de manutenção. Este sistema será um diferencial competitivo, permitindo à empresa manter suas operações de forma mais suave e eficiente, evitando paradas não planejadas e reduzindo custos operacionais.

## Por que implementar isto?

### Motivação e Razões Estratégicas

A motivação para desenvolver o Sistema de Gerenciamento de Manutenção surge de várias necessidades críticas dentro da empresa. A visão é transformar a forma como a manutenção é gerenciada, movendo-se de processos manuais para um sistema informatizado que ofereça maior controle e visibilidade.

#### Motivação Pessoal e Visão

A visão é criar uma solução que não apenas melhore a eficiência interna, mas também sirva como um modelo para outras empresas do setor. Melhorar a eficiência e a segurança nas operações de manutenção é fundamental para assegurar que a produção não seja interrompida, mantendo a qualidade e a competitividade da empresa.

#### Evidências de Sucesso Inicial

Estudos de caso e benchmarks em outras empresas industriais demonstraram que a adoção de sistemas informatizados de gerenciamento de manutenção resulta em aumentos significativos na produtividade e reduções substanciais nos custos de manutenção. Essas evidências reforçam a importância de adotar um sistema avançado que possa trazer benefícios similares.

#### Oportunidades de Mercado

O mercado está cada vez mais demandando soluções tecnológicas que aumentem a eficiência e reduzam custos. Um sistema de gerenciamento de manutenção bem-sucedido pode ser comercializado para outras empresas do setor, criando uma nova fonte de receita.

#### Oportunidades de Monetização

Além dos benefícios internos, há potencial para monetização externa. O sistema pode ser licenciado para outras empresas, oferecido como um serviço SaaS (Software as a Service), ou mesmo personalizado para atender necessidades específicas de diferentes indústrias, ampliando a presença da empresa no mercado de tecnologia industrial.

---

## Público alvo

### Grupos de Usuários

O público-alvo do Sistema de Gerenciamento de Manutenção inclui três principais grupos de usuários: Gerentes de Manutenção, Técnicos de Manutenção e Equipe de Estoque. Cada grupo possui necessidades e interesses específicos que serão atendidos pelo sistema.

1. **Gerentes de Manutenção**
   - **Descrição:** Profissionais responsáveis pelo planejamento e supervisão das atividades de manutenção.
   - **Necessidades:** Precisam de uma visão geral das atividades de manutenção, controle de custos, alocação de recursos e geração de relatórios detalhados.
   - **Interesses:** Eficiência operacional, facilidade no acesso e análise de dados, ferramentas para planejamento estratégico.

2. **Técnicos de Manutenção**
   - **Descrição:** Profissionais que realizam as atividades de manutenção preventiva e corretiva nas máquinas e equipamentos.
   - **Necessidades:** Precisam registrar e acessar informações sobre as manutenções realizadas, histórico das máquinas, e status das solicitações de manutenção.
   - **Interesses:** Interface intuitiva, comunicação clara, acesso fácil a informações relevantes para a execução de suas tarefas.

3. **Equipe de Estoque**
   - **Descrição:** Profissionais responsáveis pela gestão do estoque de peças e materiais utilizados nas manutenções.
   - **Necessidades:** Precisam controlar a entrada e saída de peças, manter registros atualizados e gerar relatórios de estoque.
   - **Interesses:** Atualização em tempo real, previsões de necessidades de peças, eficiência na gestão do estoque.

---

## Personas

### João Silva, Gerente de Manutenção

- **Idade:** 45 anos
- **Ocupação:** Gerente de Manutenção
- **Objetivos:** Melhorar a organização e eficiência das atividades de manutenção, reduzir custos e tempo de inatividade das máquinas.
- **Frustrações:** Dificuldade em controlar custos, falta de visibilidade sobre o status das manutenções e atrasos devido à comunicação ineficiente.

### Maria Oliveira, Técnica de Manutenção

- **Idade:** 30 anos
- **Ocupação:** Técnica de Manutenção
- **Objetivos:** Realizar manutenções de forma eficiente, registrar todas as atividades realizadas e ter acesso fácil ao histórico de manutenção das máquinas.
- **Frustrações:** Comunicação ineficaz, dificuldade em encontrar informações relevantes e falta de um sistema centralizado para registro de atividades.

### Carlos Santos, Responsável pelo Estoque

- **Idade:** 35 anos
- **Ocupação:** Responsável pelo Estoque
- **Objetivos:** Manter o controle das peças e materiais utilizados na manutenção, garantir a disponibilidade de peças necessárias e gerar relatórios precisos.
- **Frustrações:** Falta de atualização em tempo real, dificuldade em prever necessidades de peças e ineficiência na gestão do estoque.

---

## Requisitos Funcionais

1. **Gerenciamento de Máquinas**
   - **Descrição:** Permitir o cadastro de máquinas, incluindo informações detalhadas como nome, tipo, modelo, data de fabricação, número de série, localização e histórico de manutenção.
   - **Critérios de Aceitação:** Usuários devem poder visualizar, editar e excluir informações de máquinas. O histórico de manutenções deve estar disponível e acessível.
   - **Prioridade:** P1

2. **Gerenciamento de Manutenções**
   - **Descrição:** Facilitar o cadastro de solicitações de manutenção, incluindo descrição do problema, data da solicitação, prioridade, responsável e status da manutenção.
   - **Critérios de Aceitação:** Usuários devem poder alterar o status da manutenção, adicionar comentários e arquivos relacionados.
   - **Prioridade:** P1

3. **Controle de Estoque de Peças**
   - **Descrição:** Permitir o cadastro de peças de reposição, com informações como nome, código, fornecedor, quantidade em estoque e valor unitário.
   - **Critérios de Aceitação:** Usuários devem poder registrar a entrada e saída de peças, visualizar o estoque em tempo real e gerar relatórios de estoque.
   - **Prioridade:** P1

### Casos de uso

1. **Cadastro de nova máquina**
   - **Cenário:** João, como Gerente de Manutenção, cadastra uma nova máquina no sistema com todas as informações relevantes, incluindo data de fabricação, modelo e localização.
   - **Aplicação:** Facilita a organização e acesso a dados da máquina, permitindo um melhor planejamento e controle das manutenções futuras.

2. **Solicitação de manutenção**
   - **Cenário:** Maria, Técnica de Manutenção, registra uma solicitação de manutenção para uma máquina que apresentou problema, descrevendo o problema e adicionando a prioridade.
   - **Aplicação:** Garante que todas as solicitações sejam registradas e monitoradas, permitindo um acompanhamento mais eficiente das atividades de manutenção.

3. **Controle de estoque de peças**
   - **Cenário:** Carlos, Responsável pelo Estoque, registra a entrada de novas peças no sistema e atualiza a quantidade disponível em estoque. Ele também verifica o relatório de peças em falta.
   - **Aplicação:** Mantém o controle e a disponibilidade de peças necessárias para as manutenções, evitando atrasos devido à falta de materiais.

---

## Requisitos Não Funcionais

1. **Interface amigável e intuitiva**
   - **Descrição:** A interface deve ser fácil de usar e intuitiva para todos os usuários, independentemente do nível de conhecimento técnico.
   - **Critérios de Aceitação:** Usuários devem ser capazes de navegar e utilizar o sistema sem a necessidade de treinamento extenso, proporcionando uma experiência positiva e eficiente.
   - **Prioridade:** P1

2. **Responsividade**
   - **Descrição:** A aplicação deve funcionar perfeitamente em diferentes dispositivos, incluindo computadores, tablets e smartphones.
   - **Critérios de Aceitação:** A interface deve se adaptar a diferentes tamanhos de tela, garantindo uma experiência consistente e agradável em qualquer dispositivo.
   - **Prioridade:** P1

3. **Segurança**
   - **Descrição:** Implementar medidas de segurança robustas para proteger os dados da aplicação, incluindo criptografia, autenticação e autorização.
   - **Critérios de Aceitação:** O sistema deve evitar acessos não autorizados e proteger contra ataques, garantindo a integridade e confidencialidade dos dados.
   - **Prioridade:** P1

### 📊 Métricas

| Medida                  | Estado atual | Esperado              | Resultados             |
|-------------------------|--------------|-----------------------|------------------------|
| Tempo de resposta       | 2 segundos   | 1 segundo             | Melhoria no desempenho |
| Satisfação do usuário   | 70%          | 90%                   | Melhor experiência     |
| Taxa de erro            | 5%           | 1%                    | Maior confiabilidade   |

---

## Fora de escopo

- Integração com outros sistemas de ERP, pois o foco inicial é desenvolver um sistema independente que atenda às necessidades específicas de manutenção da empresa.
- Funcionalidades avançadas de análise preditiva de manutenção, que podem ser adicionadas em fases futuras do projeto.
- Suporte a múltiplos idiomas, considerando que a aplicação será inicialmente implementada em um ambiente de língua portuguesa.

---

## User Experience

[Link para arquivos de UX: UX Flows, UI]

---

## Dependências

- Servidores de alta disponibilidade para hospedagem, garantindo que a

 aplicação esteja sempre acessível e funcione sem interrupções.
- Equipe de desenvolvimento capacitada, com habilidades em desenvolvimento web, design de interfaces e segurança da informação.
- Acesso aos dados de manutenção atuais para migração, assegurando que o novo sistema tenha todas as informações necessárias desde o início.

---

## Plano de lançamento

### Regras para lançamento interno:

1. **Validação com usuários-chave:**
   - Realizar testes com um grupo seleto de usuários para identificar possíveis melhorias e ajustes antes do lançamento completo.
   
2. **Divulgação e treinamento da equipe:**
   - Desenvolver materiais de treinamento e realizar sessões para garantir que todos os usuários estejam familiarizados com o novo sistema e suas funcionalidades.

---

## Plano de comunicação

### Comunicação interna

- Envio de e-mails para toda a equipe de manutenção, informando sobre a implementação do novo sistema e suas vantagens.
- Notificações no aplicativo para manter os usuários atualizados sobre novas funcionalidades e melhorias contínuas.

### Comunicação externa

- Divulgação no site da empresa, destacando a inovação e os benefícios trazidos pelo novo sistema de gerenciamento de manutenção.
- Apresentação do sistema em eventos do setor industrial, demonstrando sua eficácia e potencial de mercado, e buscando possíveis parcerias e clientes interessados.
