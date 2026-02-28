const express = require("express");
const router = express.Router();
const peliculaController = require("../controllers/peliculaController");

// Obtener todas las películas
router.get("/", peliculaController.getPeliculas);

// Obtener película por ID
router.get("/:id", peliculaController.getPeliculaById);

// Crear película (solo admin)
router.post("/", peliculaController.createPelicula);

// Actualizar película (solo admin)
router.put("/:id", peliculaController.updatePelicula);

// Eliminar película (solo admin)
router.delete("/:id", peliculaController.deletePelicula);

module.exports = router;