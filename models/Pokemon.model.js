const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema({
  number: Number,
  name: String,
  url: String,
  type: [ String ]
})

const Pokemon = mongoose.model("Pokemon", pokemonSchema)
// los modelos se crean con PascalCasing 

module.exports = Pokemon;