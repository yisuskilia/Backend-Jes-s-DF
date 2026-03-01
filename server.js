require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./src/routes/authRoutes");
const peliculaRoutes = require("./src/routes/peliculaRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/peliculas", peliculaRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API funcionando 🚀" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Error interno del servidor" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));