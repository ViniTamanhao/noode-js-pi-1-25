const express = require("express");
const env = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

// Import controllers and middleware
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

// Enable CORS for all origins
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://vite-pi-1-25-m8vyoyyli-viniciusdiasministeriofis-projects.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Enable JSON parsing
app.use(bodyParser.json());

// Routes
app.post("/register", registerCoordenacao);
app.post("/login", validadeAccess);
app.get("/coordenacao", authenticate, getAllCoordenacao);

app.get("/alunos", getAllAlunos);
app.get("/alunos/:id", authenticate, getAlunoById);
app.post("/alunos", authenticate, createAluno);
app.put("/alunos/:id", authenticate, updateAluno);
app.delete("/alunos/:id", authenticate, deleteAluno);

app.post("/pacientes", authenticate, createPaciente);
app.get("/pacientes", getAllPacientes);
app.get("/pacientes/:id", authenticate, getPacienteById);
app.put("/pacientes/:id", authenticate, updatePaciente);
app.delete("/pacientes/:id", authenticate, deletePaciente);

app.post("/setores", authenticate, createSetor);
app.get("/setores", getAllSetores);
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
