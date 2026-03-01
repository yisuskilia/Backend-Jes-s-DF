const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.json({ message: "Usuario registrado correctamente" });
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  res.json({
    message: "Login exitoso!",
    token: data.session.access_token,
  });
});

module.exports = router;