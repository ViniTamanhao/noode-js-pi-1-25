const supabase = require("../config/supabase");

// Create a new Parecer
const createParecer = async (request, response) => {
  const {
    aluno_id,
    paciente_id,
    setor_id,
    num_port,
    solicitation_date,
    answer_date,
    enter_date,
    leave_date,
    obs,
  } = request.body;

  if (
    !aluno_id ||
    !paciente_id ||
    !setor_id ||
    !num_port ||
    !solicitation_date
  ) {
    return response.status(400).json({ error: "Required fields are missing" });
  }

  try {
    const { data, error } = await supabase
      .from("parecer")
      .insert([
        {
          aluno_id,
          paciente_id,
          setor_id,
          num_port,
          solicitation_date,
          answer_date,
          enter_date,
          leave_date,
          obs,
        },
      ])
      .select("*")
      .single();

    if (error) throw error;

    response.status(201).json({ data });
  } catch (err) {
    console.error("Error creating Parecer:", err.message);
    response.status(500).json({ error: err.message });
  }
};

// Get all Pareceres
const getAllPareceres = async (_, response) => {
  try {
    const { data, error } = await supabase.from("parecer").select(`
        id,
        aluno_id,
        aluno (name),
        paciente_id,
        paciente (name),
        setor_id,
        setor (name),
        num_port,
        solicitation_date,
        answer_date,
        enter_date,
        leave_date,
        obs
      `);

    if (error) throw error;

    // Remove ids from the response data
    const formattedData = data.map((item) => ({
      id: item.id,
      aluno_name: item.aluno?.name || null,
      paciente_name: item.paciente?.name || null,
      setor_name: item.setor?.name || null,
      num_port: item.num_port,
      solicitation_date: item.solicitation_date,
      answer_date: item.answer_date,
      enter_date: item.enter_date,
      leave_date: item.leave_date,
      obs: item.obs,
    }));
    response.json({ data: formattedData });
  } catch (err) {
    console.error("Error fetching Pareceres:", err.message);
    response.status(500).json({ error: err.message });
  }
};

// Get a single Parecer by ID
const getParecerById = async (request, response) => {
  const { id } = request.params;

  try {
    const { data, error } = await supabase
      .from("parecer")
      .select(
        `
        id,
        aluno_id,
        aluno (name),
        paciente_id,
        paciente (name),
        setor_id,
        setor (name),
        num_port,
        solicitation_date,
        answer_date,
        enter_date,
        leave_date,
        obs
      `
      )
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return response.status(404).json({ error: "Parecer not found" });
      }
      throw error;
    }
    // Remove ids from the response data
    const formattedData = {
      aluno_name: data.aluno?.name || null,
      paciente_name: data.paciente?.name || null,
      setor_name: data.setor?.name || null,
      num_port: data.num_port,
      solicitation_date: data.solicitation_date,
      answer_date: data.answer_date,
      enter_date: data.enter_date,
      leave_date: data.leave_date,
      obs: data.obs,
    };

    response.json({ data: formattedData });
  } catch (err) {
    console.error("Error fetching Parecer:", err.message);
    response.status(500).json({ error: err.message });
  }
};

// Update a Parecer
const updateParecer = async (request, response) => {
  const { id } = request.params;
  console.log("ID: ", id);

  const {
    aluno_id,
    paciente_id,
    setor_id,
    num_port,
    solicitation_date,
    answer_date,
    enter_date,
    leave_date,
    obs,
  } = request.body;

  if (
    !aluno_id ||
    !paciente_id ||
    !setor_id ||
    !num_port ||
    !solicitation_date
  ) {
    return response.status(400).json({ error: "Required fields are missing" });
  }

  try {
    const { data, error } = await supabase
      .from("parecer")
      .update({
        aluno_id,
        paciente_id,
        setor_id,
        num_port,
        solicitation_date,
        answer_date,
        enter_date,
        leave_date,
        obs,
      })
      .eq("id", id)
      .select("*")
      .single();
    if (error) console.log(error);

    if (error) throw error;

    response.json({ data });
  } catch (err) {
    console.error("Error updating Parecer:", err.message);
    response.status(500).json({ error: err.message });
  }
};

// Delete a Parecer
const deleteParecer = async (request, response) => {
  const { id } = request.params;

  try {
    const { data, error } = await supabase
      .from("parecer")
      .delete()
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;

    response.json({ message: "Parecer deleted successfully", data });
  } catch (err) {
    console.error("Error deleting Parecer:", err.message);
    response.status(500).json({ error: err.message });
  }
};

module.exports = {
  createParecer,
  getAllPareceres,
  getParecerById,
  updateParecer,
  deleteParecer,
};
