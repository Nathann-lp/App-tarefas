# 📋 TaskManager

Aplicativo mobile de gerenciamento de tarefas desenvolvido em **React Native (Expo)** como projeto de avaliação final da disciplina de Desenvolvimento Mobile.

---

## 📱 Sobre o Projeto

O TaskManager permite criar, visualizar, editar e excluir tarefas, com integração a um backend real desenvolvido em **Spring Boot + PostgreSQL**. O app conta com funcionalidades que vão além do trivial, como seletor de data nativo e filtro por status.

---

## ✅ Funcionalidades

- Listagem de tarefas com **pull-to-refresh**
- **Filtro por status**: Todas / Pendentes / Concluídas
- Contador de tarefas por filtro
- Criação e edição de tarefas
- Exclusão com confirmação
- Tela de detalhe da tarefa
- **DatePicker nativo** para seleção de prazo
- Toggle de conclusão via Switch
- Seletor visual de prioridade (Baixa / Média / Alta)
- Integração completa com API REST via Axios

---

## 🗂️ Atributos da Entidade Tarefa

| Atributo | Tipo | Descrição |
|---|---|---|
| `titulo` | String | Nome da tarefa |
| `descricao` | String | Descrição detalhada |
| `prioridade` | int | 1 = Baixa, 2 = Média, 3 = Alta |
| `horasEstimadas` | Double | Estimativa de horas para conclusão |
| `prazo` | LocalDate | Data limite da tarefa |
| `concluida` | boolean | Status de conclusão |

---

## 🛠️ Tecnologias Utilizadas

### Frontend (Mobile)
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/) (SDK 56)
- [React Navigation](https://reactnavigation.org/) — navegação entre telas
- [Axios](https://axios-http.com/) — requisições HTTP
- [@react-native-community/datetimepicker](https://github.com/react-native-datetimepicker/datetimepicker) — seletor de data nativo

### Backend
- [Spring Boot](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [PostgreSQL](https://www.postgresql.org/)
- CORS configurado para aceitar requisições do app mobile

---

## 📁 Estrutura do Projeto

```
TaskManager/
├── App.js
├── src/
│   ├── api/
│   │   └── api.js              # Configuração do Axios e chamadas HTTP
│   ├── screens/
│   │   ├── TaskListScreen.js   # Tela de listagem com filtros
│   │   ├── TaskFormScreen.js   # Tela de criação e edição
│   │   └── TaskDetailScreen.js # Tela de detalhe da tarefa
│   └── components/
│       ├── TaskCard.js         # Card de tarefa na listagem
│       └── PriorityBadge.js    # Badge colorido de prioridade
├── package.json
└── app.json
```

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js instalado
- Expo Go instalado no celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779))
- Backend rodando localmente na porta `8080`
- Celular e PC na **mesma rede Wi-Fi**

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/TaskManager.git
cd TaskManager

# Instale as dependências
npm install
```

### Configuração

Antes de rodar, descubra o IP local da sua máquina:

```bash
# Windows
ipconfig

# Mac/Linux
ifconfig
```

Abra o arquivo `src/api/api.js` e substitua o IP:

```js
const BASE_URL = 'http://SEU_IP_AQUI:8080/api';
```

### Executar

```bash
npx expo start
```

Escaneie o QR code com o Expo Go no celular.

---

## 🔗 Backend

O backend deste projeto está disponível em:
👉 [github.com/Nathann-lp/Projeto-web-II-Back-end](https://github.com/Nathann-lp/Projeto-web-II-Back-end)

### Endpoints utilizados

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/tasks` | Lista todas as tarefas |
| GET | `/api/tasks/{id}` | Busca tarefa por ID |
| POST | `/api/tasks` | Cria nova tarefa |
| PUT | `/api/tasks/{id}` | Atualiza tarefa |
| DELETE | `/api/tasks/{id}` | Remove tarefa |

### Configuração de CORS no backend

Para o app mobile conseguir se comunicar com o backend, é necessário configurar o CORS para aceitar qualquer origem:

```java
config.setAllowCredentials(false);
config.setAllowedOriginPatterns(Arrays.asList("*"));
config.setAllowedHeaders(Arrays.asList("*"));
config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
```

---

## 📸 Telas do App

| Lista de Tarefas | Nova Tarefa | Detalhe |
|---|---|---|
| Filtros + contador | DatePicker nativo | Todos os atributos |

---


