const supabase = require("../config/supabase");

// Create a new Paciente
const createPaciente = async (request, response) => {
  const { name, birth, sex, address } = request.body;

  if (!name || !birth || !sex || !address) {
    return response.status(400).json({ error: "All fields are required" });
  }

  const validSex = ["M", "F", "O"];
  if (!validSex.includes(sex)) {
    return response.status(400).json({ error: "Invalid sex value" });
  }

  try {
    const { data, error } = await supabase
      .from("paciente")
      .insert([{ name, birth, sex, address }])
      .select("*")
      .single();

    if (error) throw error;

    response.status(201).json({ data });
  } catch (err) {
    console.error("Error creating Paciente:", err.message);
    response.status(500).json({ error: err.message });
  }
};

// Get all Pacientes
const getAllPacientes = async (_, response) => {
  try {
    const { data, error } = await supabase
      .from("paciente")
      .select("id, name, birth, sex, address");

    if (error) throw error;

    response.json({ data });
  } catch (err) {
    console.error("Error fetching Pacientes:", err.message);
    response.status(500).json({ error: err.message });
  }
};

// Get a single Paciente by ID
const getPacienteById = async (request, response) => {
  const { id } = request.params;

  try {
    const { data, error } = await supabase
      .from("paciente")
      .select("id, name, birth, sex, address")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return response.status(404).json({ error: "Paciente not found" });
      }
      throw error;
    }

    response.json({ data });
  } catch (err) {
    console.error("Error fetching Paciente:", err.message);
    response.status(500).json({ error: err.message });
  }
};

// Update a Paciente
const updatePaciente = async (request, response) => {
  const { id } = request.params;
  const { name, birth, sex, address } = request.body;

  if (!name || !birth || !sex || !address) {
    return response.status(400).json({ error: "All fields are required" });
  }

  const validSex = ["M", "F", "O"];
  if (!validSex.includes(sex)) {
    return response.status(400).json({ error: "Invalid sex value" });
  }

  try {
    const { data, error } = await supabase
      .from("paciente")
      .update({ name, birth, sex, address })
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return response.status(404).json({ error: "Paciente not found" });
      }
      throw error;
    }

    response.json({ data });
  } catch (err) {
    console.error("Error updating Paciente:", err.message);
    response.status(500).json({ error: err.message });
  }
};

// Delete a Paciente
const deletePaciente = async (request, response) => {
  const { id } = request.params;

  try {
    const { data, error } = await supabase
      .from("paciente")
      .delete()
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return response.status(404).json({ error: "Paciente not found" });
      }
      throw error;
    }

    response.json({ message: "Paciente deleted successfully", data });
  } catch (err) {
    console.error("Error deleting Paciente:", err.message);
    response.status(500).json({ error: err.message });
  }
};

module.exports = {
  createPaciente,
  getAllPacientes,
  getPacienteById,
  updatePaciente,
  deletePaciente,
};
