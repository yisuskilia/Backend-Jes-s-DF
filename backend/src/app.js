const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const peliculaRoutes = require("./routes/peliculaRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/peliculas", peliculaRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API funcionando 🚀" });
});

module.exports = app;