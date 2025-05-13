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

const {
  getAllPacientes,
  getPacienteById,
  createPaciente,
  updatePaciente,
  deletePaciente,
} = require("./controllers/paciente");

const {
  getAllPareceres,
  getParecerById,
  createParecer,
  updateParecer,
  deleteParecer,
} = require("./controllers/parecer");

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

app.post("/pacientes", authenticate, createPaciente);
app.get("/pacientes", authenticate, getAllPacientes);
app.get("/pacientes/:id", authenticate, getPacienteById);
app.put("/pacientes/:id", authenticate, updatePaciente);
app.delete("/pacientes/:id", authenticate, deletePaciente);

app.post("/setores", authenticate, createSetor);
app.get("/setores", authenticate, getAllSetores);
app.get("/setores/:id", authenticate, getSetorById);
app.put("/setores/:id", authenticate, updateSetor);
app.delete("/setores/:id", authenticate, deleteSetor);

app.post("/pareceres", authenticate, createParecer);
app.get("/pareceres", authenticate, getAllPareceres);
app.get("/pareceres/:id", authenticate, getParecerById);
app.put("/pareceres/:id", authenticate, updateParecer);
app.delete("/pareceres/:id", authenticate, deleteParecer);

app.listen(process.env.PORT, () =>
  console.log(
    new Date().toLocaleTimeString() +
      `: Server is running on port ${process.env.PORT}...`
  )
);
