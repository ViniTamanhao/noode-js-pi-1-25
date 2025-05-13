const supabase = require("../config/supabase");

// Create a new Setor
const createSetor = async (request, response) => {
  const { name } = request.body;

  if (!name) {
    return response.status(400).json({ error: "Name is required" });
  }

  try {
    const { data, error } = await supabase
      .from("setor")
      .insert([{ name }])
      .select("*")
      .single();

    if (error) {
      if (error.code === "23505") {
        // Unique violation error code
        return response
          .status(409)
          .json({ error: "Setor name already exists" });
      }
      throw error;
    }

    response.status(201).json({ data });
  } catch (err) {
    console.error("Error creating Setor:", err.message);
    response.status(500).json({ error: err.message });
  }
};

// Get all Setores
const getAllSetores = async (_, response) => {
  try {
    const { data, error } = await supabase.from("setor").select("id, name");

    if (error) throw error;

    response.json({ data });
  } catch (err) {
    console.error("Error fetching Setores:", err.message);
    response.status(500).json({ error: err.message });
  }
};

// Get a single Setor by ID
const getSetorById = async (request, response) => {
  const { id } = request.params;

  try {
    const { data, error } = await supabase
      .from("setor")
      .select("id, name")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return response.status(404).json({ error: "Setor not found" });
      }
      throw error;
    }

    response.json({ data });
  } catch (err) {
    console.error("Error fetching Setor:", err.message);
    response.status(500).json({ error: err.message });
  }
};

// Update a Setor
const updateSetor = async (request, response) => {
  const { id } = request.params;
  const { name } = request.body;

  if (!name) {
    return response.status(400).json({ error: "Name is required" });
  }

  try {
    const { data, error } = await supabase
      .from("setor")
      .update({ name })
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      if (error.code === "23505") {
        return response
          .status(409)
          .json({ error: "Setor name already exists" });
      }
      if (error.code === "PGRST116") {
        return response.status(404).json({ error: "Setor not found" });
      }
      throw error;
    }

    response.json({ data });
  } catch (err) {
    console.error("Error updating Setor:", err.message);
    response.status(500).json({ error: err.message });
  }
};

// Delete a Setor
const deleteSetor = async (request, response) => {
  const { id } = request.params;

  try {
    const { data, error } = await supabase
      .from("setor")
      .delete()
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return response.status(404).json({ error: "Setor not found" });
      }
      throw error;
    }

    response.json({ message: "Setor deleted successfully", data });
  } catch (err) {
    console.error("Error deleting Setor:", err.message);
    response.status(500).json({ error: err.message });
  }
};

module.exports = {
  createSetor,
  getAllSetores,
  getSetorById,
  updateSetor,
  deleteSetor,
};
