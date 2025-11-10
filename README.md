## README - WEPGCOMP Front-end

### Descrição Geral do Projeto

Este é o repositório do código-fonte do front-end para o WEPGCOMP, um sistema web projetado para gerenciar as apresentações de seminários de doutorado do Programa de Pós-Graduação em Ciência da Computação (PGCOMP).

O sistema oferece interfaces distintas para diferentes perfis de usuário, incluindo Doutorandos, Professores, Administradores e Ouvintes, permitindo o cadastro de usuários, submissão de apresentações, avaliação, gerenciamento de eventos e muito mais.

### Stack Tecnológica Utilizada

*   **Linguagem:** TypeScript
*   **Framework:** React 18
*   **Ferramenta de Build:** Vite
*   **Biblioteca de UI:** Material-UI (MUI)
*   **Roteamento:** React Router DOM v6
*   **Cliente HTTP:** Axios

### Instruções de Setup e Execução

**1. Pré-requisitos:**
*   Node.js (versão 18.x ou superior)
*   NPM ou Yarn

**2. Instalação das Dependências:**

Navegue até a pasta raiz do projeto e execute o seguinte comando para instalar todas as dependências necessárias:

```bash
npm install
```

**3. Execução em Ambiente de Desenvolvimento:**

Após a instalação, inicie o servidor de desenvolvimento local com o comando:

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173` (ou outra porta, se a 5173 estiver em uso). O servidor de desenvolvimento possui hot-reloading, atualizando a aplicação automaticamente após qualquer alteração no código-fonte.

### Estrutura de Pastas (Visão Geral)

A estrutura do projeto foi organizada para garantir a separação de responsabilidades e facilitar a manutenção.

```
/src/
|-- /assets/             # Arquivos estáticos (imagens, etc.)
|-- /components/         # Componentes de UI reutilizáveis
|-- /contexts/           # Contextos React para gerenciamento de estado global
|-- /hooks/              # Hooks customizados
|-- /pages/              # Componentes que representam as páginas da aplicação
|-- /routes/             # Configuração do roteamento da aplicação
|-- /services/           # Lógica de comunicação com a API externa
|-- /styles/             # Estilos globais e configuração de tema
|-- /types/              # Definições de tipos e interfaces TypeScript
|-- /utils/              # Funções utilitárias
|-- App.tsx              # Componente principal que organiza as rotas
|-- main.tsx             # Ponto de entrada da aplicação
```
