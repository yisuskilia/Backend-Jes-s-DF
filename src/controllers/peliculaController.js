const supabase = require("../config/supabase");

// ===============================
// Obtener todas las películas con paginación
// ===============================
exports.getPeliculas = async (req, res, next) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
      .from("peliculas")
      .select("*", { count: "exact" })
      .range(from, to);

    if (error) throw error;

    res.json({
      totalRegistros: count,
      paginaActual: page,
      limitePorPagina: limit,
      totalPaginas: Math.ceil(count / limit),
      data,
    });
  } catch (err) {
    next(err);
  }
};

// ===============================
// Obtener película por ID
// ===============================
exports.getPeliculaById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("peliculas")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return res.status(404).json({ error: "Película no encontrada" });

    res.json(data);
  } catch (err) {
    next(err);
  }
};

// ===============================
// Crear película
// ===============================
exports.createPelicula = async (req, res, next) => {
  try {
    const { titulo, anio, genero, imagen_url } = req.body;
    if (!titulo || !anio)
      return res.status(400).json({ error: "Título y año son obligatorios" });

    const { data, error } = await supabase
      .from("peliculas")
      .insert([{ titulo, anio, genero, imagen_url }])
      .select();

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

// ===============================
// Actualizar película
// ===============================
exports.updatePelicula = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("peliculas")
      .update(req.body)
      .eq("id", id)
      .select();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    next(err);
  }
};

// ===============================
// Eliminar película
// ===============================
exports.deletePelicula = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from("peliculas").delete().eq("id", id);
    if (error) throw error;

    res.json({ message: "Película eliminada correctamente" });
  } catch (err) {
    next(err);
  }
};