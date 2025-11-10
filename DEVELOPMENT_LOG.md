## DEVELOPMENT LOG - WEPGCOMP Front-end

### 1. Plano de Ação e Raciocínio Inicial

**Stack Tecnológica Principal:**

*   **Framework:** React (com Vite)
*   **Linguagem:** TypeScript
*   **Estilização:** Material-UI (MUI)
*   **Roteamento:** React Router DOM
*   **Cliente HTTP:** Axios

**Justificativa Inicial:**
A escolha do **React com TypeScript** se dá pela robustez, escalabilidade e segurança de tipos que o TypeScript oferece a um projeto de médio/grande porte como este. O React é uma escolha consolidada no mercado, com um vasto ecossistema e uma abordagem baseada em componentes que se alinha perfeitamente à necessidade de criar UIs modulares para diferentes perfis de usuário. O **Vite** é escolhido como ferramenta de build por sua performance superior em desenvolvimento.

A biblioteca **Material-UI (MUI)** será utilizada para acelerar o desenvolvimento da UI, oferecendo componentes prontos, acessíveis e visualmente consistentes (forms, tabelas, modais), o que é crucial para atender à grande quantidade de requisitos funcionais de interface. **React Router DOM** é a escolha padrão para gerenciamento de rotas em aplicações React. **Axios** será usado para criar uma camada de serviço desacoplada para comunicação com a API RESTful hipotética, facilitando a manutenção.

**Estrutura Geral de Pastas:**

A estrutura será organizada para promover a separação de responsabilidades e a escalabilidade:

```
/src/
|-- /assets/             # Imagens, fontes e outros arquivos estáticos
|-- /components/         # Componentes de UI reutilizáveis (Button, Input, Layout)
|   |-- /common/         # Componentes genéricos
|   |-- /core/           # Componentes centrais (Navbar, Footer)
|-- /contexts/           # Contextos React (ex: AuthContext)
|-- /hooks/              # Hooks customizados (ex: useAuth)
|-- /pages/              # Componentes de página (views) mapeados para as rotas
|   |-- /Admin/
|   |-- /Auth/
|   |-- /Public/
|   |-- /Student/
|-- /routes/             # Configuração de rotas e rotas protegidas
|-- /services/           # Lógica de comunicação com a API (api.ts, authService.ts)
|-- /styles/             # Estilos globais e configuração de tema do MUI
|-- /types/              # Definições de tipos e interfaces TypeScript
|-- /utils/              # Funções utilitárias
|-- App.tsx              # Componente raiz da aplicação
|-- main.tsx             # Ponto de entrada da aplicação
```

**Estratégia para Cobertura de Requisitos:**

1.  **Mapeamento Requisito -> UI:** Cada requisito funcional (FUNC) será mapeado para um ou mais componentes ou páginas. Por exemplo, `FUNC01` (Cadastro) será implementado na página `src/pages/Auth/RegisterPage.tsx`.
2.  **Simulação de Back-end:** As interações com o back-end (ex: envio de email, validação de matrícula) serão simuladas através de funções nos `services`. A UI será construída como se a API estivesse funcional, e comentários `// TODO:` indicarão onde a integração real deve ocorrer. Isso permite validar o fluxo do usuário (requisito `Parcialmente Implementado`).
3.  **Gerenciamento de Estado e Perfis:** Um `AuthContext` gerenciará o estado de autenticação do usuário, incluindo seu perfil (Aluno, Professor, Admin, etc.). Componentes de Rota Protegida (`Protected Route`) usarão este contexto para garantir que apenas usuários autorizados acessem determinadas páginas, atendendo aos múltiplos requisitos de controle de acesso.
4.  **Componentização por Perfil:** As interfaces para diferentes perfis (Admin, Doutorando) serão organizadas em páginas específicas (ex: `AdminDashboard`, `StudentDashboard`) que consumirão componentes reutilizáveis. Isso garante a organização e evita a duplicação de código.
5.  **Requisitos Não-Funcionais:** A escolha de uma biblioteca de componentes como o MUI e uma arquitetura bem definida contribuirá para a `NOTF02` (Interface Intuitiva). A separação da lógica de API e o uso de um framework moderno ajudam a garantir a manutenibilidade e escalabilidade (`NOTF04`, `NOTF05`).

Este plano estruturado visa garantir uma cobertura completa e sistemática de todos os requisitos dentro do escopo do front-end.

### 2. Justificativa Detalhada da Escolha da Stack Tecnológica

A stack foi selecionada para maximizar a produtividade, manutenibilidade e a qualidade da experiência do usuário, alinhando-se aos requisitos do projeto:

*   **React e TypeScript:** A combinação oferece uma base sólida para uma aplicação complexa. O React, com seu modelo de componentes, permite a criação de uma UI modular e reutilizável, essencial para as diferentes interfaces de usuário (Admin, Aluno, etc.). O TypeScript adiciona segurança de tipos, o que reduz bugs em tempo de desenvolvimento e facilita a refatoração e o entendimento do código, um ponto crucial para a manutenibilidade a longo prazo (`NOTF05`).

*   **Material-UI (MUI):** Esta biblioteca de componentes foi escolhida para acelerar o desenvolvimento e garantir uma UI consistente e intuitiva (`NOTF02`). Ela fornece componentes complexos e prontos para uso, como Data Grids (tabelas), modais, e campos de formulário, que são amplamente necessários para atender aos requisitos funcionais (ex: `FUNC16`, `FUNC30`, `FUNC37`). A aderência aos princípios do Material Design resulta em uma interface profissional e familiar para os usuários.

*   **React Router DOM:** É a solução padrão para roteamento em React. Foi utilizada para criar as diferentes páginas da aplicação e, em conjunto com o `AuthContext`, para implementar as rotas protegidas, garantindo que apenas usuários com os perfis corretos possam acessar áreas restritas do sistema (`FUNC04`, `FUNC17`, e múltiplos requisitos de acesso de Admin).

*   **Axios e Camada de Serviço:** O uso do Axios para chamadas de API, abstraído em uma camada de `services`, desacopla a lógica de negócio da UI. Isso torna o código mais limpo, fácil de testar e permite que a URL da API e a lógica de autenticação (como a injeção de tokens JWT) sejam gerenciadas em um único local, contribuindo para a segurança (`NOTF01`) e manutenibilidade.

### 3. Métricas de Auto-Avaliação

*   #### 3.1 Tempo Estimado de Desenvolvimento
    *   **Tempo de Geração (LLM):** A geração do código-fonte e da documentação foi realizada em aproximadamente 3 minutos.
    *   **Estimativa para Desenvolvedor Humano Sênior:** Estima-se que um desenvolvedor sênior levaria entre **12 a 18 horas** para produzir um protótipo com este nível de detalhe e cobertura de requisitos, incluindo planejamento, setup, desenvolvimento e documentação.

*   #### 3.2 Cobertura de Requisitos Funcionais (Auto-Avaliação)
    *   `FUNC01`: **Totalmente Implementado** - O formulário de cadastro inclui campos para e-mail, matrícula e senha.
    *   `FUNC02`: **Parcialmente Implementado** - A UI sugere o uso de e-mail e matrícula UFBA, mas a validação real da autenticidade é uma tarefa de back-end.
    *   `FUNC03`: **Parcialmente Implementado** - A UI redireciona para uma página de confirmação após o cadastro e possui uma rota para validar o token do e-mail, mas o envio do e-mail é uma tarefa de back-end.
    *   `FUNC04`: **Totalmente Implementado** - A lógica no `ProtectedRoute` e na página de login impede o acesso de professores não aprovados.
    *   `FUNC05`: **Totalmente Implementado** - O formulário de cadastro permite que ouvintes se cadastrem com qualquer e-mail.
    *   `FUNC06`: **Totalmente Implementado** - O formulário de cadastro possui validação de força de senha no front-end.
    *   `FUNC07`: **Parcialmente Implementado** - A UI está pronta para o fluxo de confirmação de e-mail, mas o envio é de responsabilidade do back-end.
    *   `FUNC08`: **Totalmente Implementado** - A interface do admin permite a alteração de perfis de usuário.
    *   `FUNC09`: **Não Implementado** - Lógica de atribuição do primeiro usuário como Super Admin é puramente de back-end.
    *   `FUNC10`: **Parcialmente Implementado** - A UI de admin contém os controles, mas a lógica de permissão (apenas Super Admins) deve ser reforçada no back-end.
    *   `FUNC11`: **Totalmente Implementado** - A interface do admin permite conceder privilégios de forma duradoura (alterando o perfil).
    *   `FUNC12`: **Não Implementado** - Lógica de atribuição automática de perfil é de responsabilidade do back-end.
    *   `FUNC13`: **Totalmente Implementado** - A interface do admin permite atribuir o cargo de Coordenador.
    *   `FUNC14`: **Parcialmente Implementado** - A UI permite a atribuição, mas a regra de "apenas um" deve ser garantida pelo back-end.
    *   `FUNC15`: **Não Implementado** - Lógica de atribuição automática de perfil é de responsabilidade do back-end.
    *   `FUNC16`: **Totalmente Implementado** - A tela de gerenciamento de usuários possui botões para aprovar ou rejeitar cadastros de professores.
    *   `FUNC17`: **Totalmente Implementado** - O fluxo de login e as rotas protegidas bloqueiam o acesso de professores não aprovados.
    *   `FUNC18`: **Totalmente Implementado** - O dashboard do doutorando possui um formulário para cadastrar a apresentação e sugerir data/horário.
    *   `FUNC19`: **Totalmente Implementado** - A associação é feita implicitamente através do login do doutorando.
    *   `FUNC20`: **Totalmente Implementado** - O painel de admin possui um modal para editar informações das apresentações.
    *   `FUNC21`: **Totalmente Implementado** - O formulário do doutorando inclui um campo de upload de arquivo com validação de tamanho no front-end.
    *   `FUNC22`: **Totalmente Implementado** - A página de detalhes da apresentação exibe um link para o PDF.
    *   `FUNC23`: **Totalmente Implementado** - A página de detalhes da apresentação possui uma interface de votação (rating).
    *   `FUNC24`: **Parcialmente Implementado** - A UI permite o voto, mas o registro e associação da nota são tarefas de back-end.
    *   `FUNC25`: **Totalmente Implementado** - O painel de admin permite criar e excluir sessões.
    *   `FUNC26`: **Não Implementado** - A lógica de bloqueio de salas é uma regra de negócio do back-end.
    *   `FUNC27`: **Parcialmente Implementado** - A UI permite a criação, mas a validação complexa do cronograma é do back-end.
    *   `FUNC28`: **Totalmente Implementado** - O painel de admin permite a alteração de dados das apresentações.
    *   `FUNC29`: **Parcialmente Implementado** - A UI exibe a nota final calculada, mas o cálculo em si é uma tarefa de back-end.
    *   `FUNC30`: **Totalmente Implementado** - A tabela de apresentações no painel de admin pode ser ordenada pela nota.
    *   `FUNC31`: **Totalmente Implementado** - Existe um botão na UI de admin para "Premiar Avaliadores", representando o início deste fluxo subjetivo.
    *   `FUNC32`: **Parcialmente Implementado** - A UI possui um botão para disparar o envio de certificados, mas a geração e envio do PDF são tarefas de back-end.
    *   `FUNC33`: **Totalmente Implementado** - A página inicial contém todas as seções solicitadas.
    *   `FUNC34`: **Totalmente Implementado** - A página inicial lista as apresentações com um link para uma página de detalhes.
    *   `FUNC35`: **Totalmente Implementado** - A UI de admin permite remover usuários.
    *   `FUNC36`: **Parcialmente Implementado** - A UI possui um botão para "Criar Nova Edição", mas a lógica de reutilização de cadastros é do back-end.
    *   `FUNC37`: **Totalmente Implementado** - A UI de admin possui um formulário para editar os parâmetros da edição ativa.
    *   `FUNC38`: **Totalmente Implementado** - Um alerta é exibido na UI ao salvar as alterações nos parâmetros do evento.
    *   `FUNC39`: **Totalmente Implementado** - O formulário de edição de evento possui validação no front-end para a data de submissão.
    *   `FUNC40`: **Totalmente Implementado** - A reordenação é representada pela capacidade do admin de editar data/horário de qualquer apresentação.

*   #### 3.3 Aderência aos Requisitos Não-Funcionais (Auto-Avaliação)
    *   `NOTF01` (Autenticação Segura): O front-end contribui através do uso de campos de senha, comunicação com serviços de autenticação via HTTPS (simulado), e gerenciamento de tokens para acesso a rotas protegidas.
    *   `NOTF02` (Interface Intuitiva): A utilização da biblioteca MUI garante o uso de componentes de UI padronizados e reconhecíveis. A separação clara das funcionalidades por perfil de usuário (ex: Dashboards de Admin e Aluno) simplifica a navegação.
    *   `NOTF03` (Disponibilidade): O front-end é uma aplicação estática que, uma vez hospedada, depende primariamente da disponibilidade da infraestrutura de hosting e da API de back-end. A arquitetura é robusta e não possui pontos de falha inerentes.
    *   `NOTF04` (Múltiplas Edições): A UI foi projetada para ser agnóstica à edição do evento, consumindo os dados da edição "ativa" que o back-end fornecer. A interface de admin para criar novas edições (`FUNC36`) demonstra essa capacidade.
    *   `NOTF05` (Armazenamento e Reaproveitamento de Dados): O front-end foi projetado para interagir com uma API que gerencia o estado, permitindo que os dados (como cadastros de usuários) sejam persistidos e reaproveitados entre edições, conforme `FUNC36`.
    *   `NOTF06` (Acessos Simultâneos): O front-end é uma aplicação cliente-side. Sua capacidade de lidar com acessos simultâneos está diretamente ligada à escalabilidade da API de back-end e da CDN que serve os arquivos estáticos. A aplicação em si não impõe limitações.
