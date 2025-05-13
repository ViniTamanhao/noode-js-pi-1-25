const express = require("express");
const env = require("dotenv");
const bodyParser = require("body-parser");
const {
  getAllCoordenacao,
  validadeAccess,
  registerCoordenacao,
} = require("./controllers/coordenacao");
const {
  getAllAlunos,
  getAlunoById,
  createAluno,
  updateAluno,
  deleteAluno,
} = require("./controllers/aluno");
const {
  getAllSetores,
  getSetorById,
  createSetor,
  updateSetor,
  deleteSetor,
} = require("./controllers/setor");
const authenticate = require("./middleware/auth");

env.config();

const app = express();
app.use(bodyParser.json());

app.post("/register", registerCoordenacao);
app.post("/login", validadeAccess);
app.get("/coordenacao", authenticate, getAllCoordenacao);

app.get("/alunos", authenticate, getAllAlunos);
app.get("/alunos/:id", authenticate, getAlunoById);
app.post("/alunos", authenticate, createAluno);
app.put("/alunos/:id", authenticate, updateAluno);
app.delete("/alunos/:id", authenticate, deleteAluno);

app.post("/setores", authenticate, createSetor);
app.get("/setores", authenticate, getAllSetores);
app.get("/setores/:id", authenticate, getSetorById);
app.put("/setores/:id", authenticate, updateSetor);
app.delete("/setores/:id", authenticate, deleteSetor);

app.listen(process.env.PORT, () =>
  console.log(
    new Date().toLocaleTimeString() +
      `: Server is running on port ${process.env.PORT}...`
  )
);
