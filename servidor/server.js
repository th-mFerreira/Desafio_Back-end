require("dotenv").config();

const express = require("express");
const app = express();
const mysql = require('mysql2');//isso pegara a versão mais atual do mysql que instalamos
const cors = require("cors");

const db = mysql.createPool({
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "root",
    port: Number(process.env.DB_PORT) || 3306,
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "crudealunos"
});

/*app.get("/",(req, )=>{
    /*let SQL = "INSERT INTO alunos (id,nome, idade) VALUES (null,'Maria','28')";
    db.query(SQL,(err,result)=>{
        console.log(err);
    });

   /*let SQL = "truncate table alunos";
    db.query(SQL,(err,result)=>{
        console.log(err);
    });
}) */
app.use(cors({
      origin: process.env.CLIENT_ORIGIN || "http://localhost:3000"
    }));
    
app.use(express.json());
app.get("/listar", (req, res) => {
    let SQL = "SELECT * FROM alunos";
    db.query(SQL, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Erro ao listar alunos" });
        } else {
            res.json(result); // Enviar os dados dos alunos como resposta
        }
    });
});

app.delete("/excluir/:id", (req, res) => {
    const alunoId = Number(req.params.id);
    if (!Number.isInteger(alunoId) || alunoId <= 0) {
      return res.status(400).json({ error: "ID de aluno inválido" });
    }

   // Execute uma consulta SQL para excluir o aluno com base no ID
    const SQL = "DELETE FROM alunos WHERE id = ?";
    db.query(SQL, [alunoId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao excluir aluno" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Aluno não encontrado" });
      }

      return res.json({ message: "Aluno excluído com sucesso" });
    });
  });

//app.use(cors());


app.post("/register", (req, res) => {
    const { nome: nomeRecebido, idade: idadeRecebida } = req.body || {};
    const nome = typeof nomeRecebido === "string" ? nomeRecebido.trim() : "";
    const idade = Number(idadeRecebida);

    if (!nome || idadeRecebida === "" || idadeRecebida == null || !Number.isInteger(idade) || idade < 0) {
      return res.status(400).json({ error: "Nome e idade válida são obrigatórios" });
    }

    const SQL = "INSERT INTO alunos(nome,idade) VALUES (?,?)";
    db.query(SQL, [nome, idade], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao cadastrar aluno" });
      }

      return res.status(201).json({
        message: "Aluno cadastrado com sucesso",
        aluno: { id: result.insertId, nome, idade }
      });
    });
 });

app.put("/editar/:id", (req, res) => {
    const alunoId = Number(req.params.id);
    const { nome: nomeRecebido, idade: idadeRecebida } = req.body || {};
    const nome = typeof nomeRecebido === "string" ? nomeRecebido.trim() : "";
    const idade = Number(idadeRecebida);

    if (!Number.isInteger(alunoId) || alunoId <= 0) {
      return res.status(400).json({ error: "ID de aluno inválido" });
    }

    if (!nome || idadeRecebida === "" || idadeRecebida == null || !Number.isInteger(idade) || idade < 0) {
      return res.status(400).json({ error: "Nome e idade válida são obrigatórios" });
    }

    // Execute uma consulta SQL para atualizar os dados do aluno com base no ID
    const SQL = "UPDATE alunos SET nome = ?, idade = ? WHERE id = ?";
    db.query(SQL, [nome, idade, alunoId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao editar aluno" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Aluno não encontrado" });
      }

      return res.json({
        message: "Aluno editado com sucesso",
        aluno: { id: alunoId, nome, idade }
      });
    });
  });  

const PORT = Number(process.env.PORT) || 3001;

app.listen(PORT,()=>{
    console.log(`rodando servidor na porta ${PORT}`);
});
