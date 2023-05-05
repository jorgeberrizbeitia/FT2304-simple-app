// Este archivo inicializará mi dase de datos con una data inicial
// Este proceso solo ocurre una vez
// Este código no se conecta con el servidor



// 1. necesitamos crear un modelo para nuestros documentos
const Pokemon = require("../models/Pokemon.model.js")

// 2. debemos conectar con la base de datos
const mongoose = require("mongoose")
require("../db/index.js")

// 3. requerir el json con la data
const allPokemon = require("./pokemon.json")

// 4. agregar la data a la base de datos
Pokemon.insertMany(allPokemon)
.then(() => {
  console.log("pokemon añadidos")
  mongoose.connection.close()
})
.catch((error) => {
  console.log(error)
})