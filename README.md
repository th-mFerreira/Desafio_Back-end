# Desafio Back-End — CRUD de Alunos

Aplicação full stack para cadastrar, listar, editar e excluir alunos. O client foi desenvolvido com React e o servidor utiliza Node.js, Express e MySQL.

## Tecnologias utilizadas

### Front-End

- React
- JavaScript
- Axios

### Back-End

- Node.js
- Express
- MySQL

### Banco de dados

- MySQL

## Arquitetura da aplicação

O funcionamento da aplicação segue o fluxo:

```text
React
  ↓
Requisições HTTP
  ↓
API Node.js + Express
  ↓
MySQL
```

O client envia requisições HTTP para a API, responsável por processar as operações e realizar a comunicação com o banco de dados.

## Requisitos

Antes de executar o projeto, é necessário ter instalado:

- Node.js 20 LTS ou superior
- npm
- MySQL Server 8.0 ou superior
- MySQL Workbench (opcional, para executar o script SQL)

O MySQL deve estar disponível na porta `3306`, salvo se a configuração do arquivo `.env` for alterada.

## 1. Clonar o repositório

Clone o projeto:

```bash
git clone https://github.com/th-mFerreira/Desafio_Back-end.git
```

Acesse a pasta do projeto:

```bash
cd Desafio_Back-end
```

## 2. Preparar o banco de dados

No MySQL Workbench, execute o arquivo:

```text
servidor/database.sql
```

O script prepara o banco de dados e a tabela utilizada pela aplicação.

Para utilizar um usuário específico para a aplicação, execute os comandos abaixo com um usuário que possua privilégios administrativos no MySQL, como `root`.

Substitua a senha do exemplo pela senha que deseja utilizar:

```sql
CREATE USER IF NOT EXISTS 'crud_app'@'127.0.0.1'
IDENTIFIED BY 'sua_senha_local';

GRANT SELECT, INSERT, UPDATE, DELETE
ON crudealunos.*
TO 'crud_app'@'127.0.0.1';
```

## 3. Configurar o servidor

O projeto possui o arquivo:

```text
servidor/.env.example
```

Crie uma cópia desse arquivo com o nome `.env`.

### Windows — PowerShell

```powershell
cd servidor
Copy-Item .env.example .env
```

### Linux ou macOS

```bash
cd servidor
cp .env.example .env
```

Depois, abra o arquivo:

```text
servidor/.env
```

A configuração deverá seguir este padrão:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=crud_app
DB_PASSWORD=sua_senha_local
DB_NAME=crudealunos
PORT=3001
CLIENT_ORIGIN=http://localhost:3000
```

Substitua:

```text
sua_senha_local
```

pela mesma senha definida anteriormente no MySQL.

O arquivo `.env` contém configurações locais e não deve ser enviado ao GitHub. Por esse motivo, somente o arquivo `.env.example` está versionado no repositório.

## 4. Instalar as dependências do servidor

Dentro da pasta `servidor`, instale as dependências.

### Windows — PowerShell

```powershell
npm.cmd install
```

### Linux ou macOS

```bash
npm install
```

## 5. Iniciar o servidor

Ainda dentro da pasta `servidor`, execute:

### Windows — PowerShell

```powershell
npm.cmd start
```

### Linux ou macOS

```bash
npm start
```

A API ficará disponível em:

```text
http://localhost:3001
```

Mantenha esse terminal aberto durante a utilização da aplicação.

## 6. Instalar as dependências do client

Abra outro terminal.

A partir da pasta raiz do projeto, acesse:

```bash
cd client
```

Instale as dependências.

### Windows — PowerShell

```powershell
npm.cmd install
```

### Linux ou macOS

```bash
npm install
```

## 7. Iniciar o client

Dentro da pasta `client`, execute:

### Windows — PowerShell

```powershell
npm.cmd start
```

### Linux ou macOS

```bash
npm start
```

A aplicação ficará disponível em:

```text
http://localhost:3000
```

O navegador normalmente será aberto automaticamente após a inicialização.

## Endpoints da API

A aplicação possui as quatro operações fundamentais de um CRUD:

| Método | Endpoint | Operação |
|---|---|---|
| POST | `/register` | Cadastrar aluno |
| GET | `/listar` | Listar alunos |
| PUT | `/editar/:id` | Editar aluno |
| DELETE | `/excluir/:id` | Excluir aluno |

A URL base utilizada durante a execução local é:

```text
http://localhost:3001
```

Exemplo:

```text
GET http://localhost:3001/listar
```

## Operações disponíveis

### Create

Permite cadastrar um novo aluno.

```http
POST /register
```

### Read

Retorna a lista de alunos cadastrados.

```http
GET /listar
```

### Update

Permite atualizar os dados de um aluno utilizando seu identificador.

```http
PUT /editar/:id
```

### Delete

Permite excluir um aluno utilizando seu identificador.

```http
DELETE /excluir/:id
```

## Estrutura do projeto

```text
Desafio_Back-end/
│
├── client/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── package-lock.json
│
├── servidor/
│   ├── .env.example
│   ├── database.sql
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

### client/

Contém a interface da aplicação desenvolvida em React.

É responsável pela interação com o usuário e pelo envio das requisições HTTP para a API.

### servidor/

Contém o Back-End da aplicação.

É responsável por:

- disponibilizar os endpoints da API;
- receber e processar as requisições;
- executar as operações do CRUD;
- realizar a comunicação com o MySQL.

### servidor/database.sql

Script SQL utilizado para preparar a estrutura necessária no banco de dados.

### servidor/.env.example

Modelo das variáveis de ambiente necessárias para executar o servidor localmente.

### servidor/server.js

Arquivo principal da API Express.

## Testes do client

O projeto possui testes automatizados para o client.

Para executá-los, acesse a pasta:

```bash
cd client
```

### Windows — PowerShell

```powershell
npm.cmd test -- --watchAll=false --runInBand
```

### Linux ou macOS

```bash
npm test -- --watchAll=false --runInBand
```

Os testes verificam comportamentos relacionados à interface e às operações realizadas pelo client.

Não foram implementados testes automatizados específicos para o servidor, pois eles não fazem parte dos requisitos propostos para o exercício.

## Portas utilizadas

| Serviço | Porta |
|---|---|
| React | `3000` |
| API Express | `3001` |
| MySQL | `3306` |

Caso alguma dessas portas seja alterada, as respectivas configurações também deverão ser atualizadas.

## Fluxo para execução

```text
1. Iniciar o MySQL Server
        ↓
2. Executar servidor/database.sql
        ↓
3. Criar o usuário crud_app no MySQL
        ↓
4. Criar e configurar servidor/.env
        ↓
5. Instalar as dependências do servidor
        ↓
6. Iniciar o servidor
        ↓
7. Instalar as dependências do client
        ↓
8. Iniciar o client
        ↓
9. Acessar http://localhost:3000
```

## Resumo

A aplicação implementa um CRUD completo de alunos utilizando:

```text
React → Node.js/Express → MySQL
```

As operações disponíveis permitem:

- cadastrar alunos;
- visualizar alunos cadastrados;
- editar informações;
- excluir registros.
