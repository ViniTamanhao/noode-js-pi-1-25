const supabase = require("../config/supabase");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const getAllCoordenacao = async (_, response) => {
  try {
    const { data, error } = await supabase.from("coordenacao").select("*");

    if (error) throw error;

    response.json({ data });
  } catch (err) {
    console.error("Error fetching coordenacao:", err.message);
    response.status(500).json({ error: err.message });
  }
};

const validadeAccess = async (request, response) => {
  const { name, pwd } = request.body;
  console.log("Request body:", request.body);

  if (!name || !pwd) {
    return response
      .status(400)
      .json({ error: "Name and password are required" });
  }

  try {
    const { data, error } = await supabase
      .from("coordenacao")
      .select("*")
      .eq("name", name)
      .single();

    if (error) {
      console.log("Error fetching user:", error.message);
      return response.status(401).json({ error: "Invalid credentials" });
    }

    const user = data;

    // Compare password
    const isMatch = bcrypt.compareSync(pwd, user.pwd);
    if (!isMatch) {
      console.log("Password mismatch");
      return response.status(401).json({ error: "Invalid credentials" });
    }

    // Create JWT payload
    const payload = {
      id: user.id,
      name: user.name,
    };

    // Generate JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    response.json({ token });
  } catch (err) {
    console.error("Error during login:", err.message);
    response.status(500).json({ error: err.message });
  }
};

const registerCoordenacao = async (request, response) => {
  const { name, pwd } = request.body;

  if (!name || !pwd) {
    return response
      .status(400)
      .json({ error: "Name and password are required" });
  }

  try {
    // Hash password
    const hashedPwd = bcrypt.hashSync(pwd, 10);

    const { data, error } = await supabase
      .from("coordenacao")
      .insert([{ name, pwd: hashedPwd }])
      .select("*")
      .single();

    if (error) throw error;

    response.json({ message: "User registered successfully", data });
  } catch (err) {
    console.error("Error during registration:", err.message);
    response.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllCoordenacao,
  validadeAccess,
  registerCoordenacao,
};
