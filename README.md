# Desafio Back-End — CRUD de Alunos

Aplicação full stack para cadastrar, listar, editar e excluir alunos. O client foi desenvolvido com React e o servidor utiliza Node.js, Express e MySQL.

## Requisitos

- Node.js e npm
- MySQL Server na porta `3306`
- MySQL Workbench (opcional, para executar o script SQL)

## 1. Preparar o banco de dados

No MySQL Workbench, execute o arquivo `servidor/database.sql`.

Para utilizar um usuário específico da aplicação, execute como `root`, substituindo a senha do exemplo:

```sql
CREATE USER IF NOT EXISTS 'crud_app'@'127.0.0.1'
IDENTIFIED BY 'sua_senha_local';

GRANT SELECT, INSERT, UPDATE, DELETE
ON crudealunos.*
TO 'crud_app'@'127.0.0.1';
```

## 2. Configurar o servidor

No PowerShell:

```powershell
cd servidor
Copy-Item .env.example .env
```

Abra `servidor/.env` e substitua `sua_senha_local` pela senha definida no MySQL. O arquivo `.env` é local e não deve ser enviado ao GitHub.

## 3. Instalar e iniciar o servidor

```powershell
cd servidor
npm.cmd install
npm.cmd start
```

A API ficará disponível em `http://localhost:3001`.

## 4. Instalar e iniciar o client

Em outro terminal:

```powershell
cd client
npm.cmd install
npm.cmd start
```

A aplicação ficará disponível em `http://localhost:3000`.

## Endpoints

| Método | Endpoint | Operação |
|---|---|---|
| POST | `/register` | Cadastrar aluno |
| GET | `/listar` | Listar alunos |
| PUT | `/editar/:id` | Editar aluno |
| DELETE | `/excluir/:id` | Excluir aluno |

## Testes do client

```powershell
cd client
npm.cmd test -- --watchAll=false --runInBand
```

## Estrutura

```text
client/     Interface React
servidor/   API Express, configuração e script do MySQL
```
