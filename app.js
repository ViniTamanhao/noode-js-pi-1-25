const express = require("express");
const env = require("dotenv");
const { createClient } = require("@supabase/supabase-js");

const { getAllCoordenacao } = require("./controllers/coordenacao");

env.config();

const app = express();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.get("/", getAllCoordenacao);

app.listen(process.env.PORT, () =>
  console.log(
    new Date().toLocaleTimeString() +
      `: Server is running on port ${process.env.PORT}...`
  )
);
