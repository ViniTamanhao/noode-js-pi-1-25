const supabase = require("../config/supabase");

const getAllCoordenacao = async (_, response) => {
  const { data } = await supabase
    .from("coordenacao")
    .select("*")
    .catch((error) => {
      response.status(500).json({ error: error.message });
    });

  response.json({ data });
};

const validadeAccess = async (request, response) => {
  const { email, pwd } = request.body;

  return data;
};

module.exports = {
  getAllCoordenacao,
};
