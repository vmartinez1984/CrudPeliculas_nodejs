const express = require('express')
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())
const {agregar, obtenerPorId, obtenerTodos} = require('./pelicula.repositorio')

app.get("/", (req, res)=>{
    const data = {
        mensaje: "Hola mundo"
    }
    res.status(200).json(data)
})

app.get("/api/peliculas", async (req, res) => {
  let peliculas = await obtenerTodos();
  res.status(200).json(peliculas);
});

app.get("/api/peliculas/:id", async (req, res) => {
  //console.log(req.params.id)
  let pelicula = await obtenerPorId(req.params.id);
  if (pelicula == undefined)
    return res
      .status(404)
      .json({ mensaje: "Pelicula no encontrada con el id: " + req.params.id });
  return res.status(200).json(pelicula);
});

app.post("/api/peliculas/", async (req, res) => {
  console.log(req.body);
  let pelicula = {
    titulo: req.body.titulo,
    visto: false,
    resumen: req.body.resumen,
  };
  let id = await agregar(pelicula);
  //pelicula.id = id
  res.status(201).json(pelicula);
});

app.listen(3000,()=>{
    console.log("http://localhost:3000")
})