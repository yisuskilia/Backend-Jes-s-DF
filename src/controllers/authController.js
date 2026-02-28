const supabase = require("../config/supabase");

// Registrar usuario
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email y contraseña obligatorios" });

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) return res.status(400).json({ message: error.message });

    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (err) {
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};

// Login usuario
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email y contraseña obligatorios" });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return res.status(400).json({ message: error.message });

    // Por simplicidad, asignamos rol admin a un email específico
    res.json({
      token: data.session.access_token,
      role: email === "admin@email.com" ? "admin" : "user",
    });
  } catch (err) {
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};