const supabase = require("../config/supabase");

// Create a new Aluno
const createAluno = async (request, response) => {
  const { name, coordenacao_id } = request.body;

  if (!name || !coordenacao_id) {
    return response
      .status(400)
      .json({ error: "Name and coordenacao_id are required" });
  }

  try {
    const { data, error } = await supabase
      .from("aluno")
      .insert([{ name, coordenacao_id }])
      .select("*")
      .single();

    if (error) throw error;

    response.status(201).json({ data });
  } catch (err) {
    console.error("Error creating Aluno:", err.message);
    response.status(500).json({ error: err.message });
  }
};

// Get all Alunos
const getAllAlunos = async (_, response) => {
  try {
    const { data, error } = await supabase
      .from("aluno")
      .select("id, name, coordenacao_id");

    if (error) throw error;

    response.json({ data });
  } catch (err) {
    console.error("Error fetching Alunos:", err.message);
    response.status(500).json({ error: err.message });
  }
};

// Get a single Aluno by ID
const getAlunoById = async (request, response) => {
  const { id } = request.params;

  try {
    const { data, error } = await supabase
      .from("aluno")
      .select("id, name, coordenacao_id")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return response.status(404).json({ error: "Aluno not found" });
      }
      throw error;
    }

    response.json({ data });
  } catch (err) {
    console.error("Error fetching Aluno:", err.message);
    response.status(500).json({ error: err.message });
  }
};

// Update an Aluno
const updateAluno = async (request, response) => {
  const { id } = request.params;
  const { name, coordenacao_id } = request.body;

  try {
    const { data, error } = await supabase
      .from("aluno")
      .update({ name, coordenacao_id })
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return response.status(404).json({ error: "Aluno not found" });
      }
      throw error;
    }

    response.json({ data });
  } catch (err) {
    console.error("Error updating Aluno:", err.message);
    response.status(500).json({ error: err.message });
  }
};

// Delete an Aluno
const deleteAluno = async (request, response) => {
  const { id } = request.params;

  try {
    const { data, error } = await supabase
      .from("aluno")
      .delete()
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return response.status(404).json({ error: "Aluno not found" });
      }
      throw error;
    }

    response.json({ message: "Aluno deleted successfully", data });
  } catch (err) {
    console.error("Error deleting Aluno:", err.message);
    response.status(500).json({ error: err.message });
  }
};

module.exports = {
  createAluno,
  getAllAlunos,
  getAlunoById,
  updateAluno,
  deleteAluno,
};
