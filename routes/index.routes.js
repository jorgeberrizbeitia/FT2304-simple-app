const express = require('express');
const router = express.Router();

const capitalize = require("../utils/capitalize")

const Pokemon = require("../models/Pokemon.model")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// GET "/pokemon" => Mostrar los nombres de todos los pokemon
router.get("/pokemon", (req, res, next) => {
  // 4. terminar la funcionalidad de la ruta (buscar la lista de pokemon)
  Pokemon.find()
  .select({name: 1}) // cuales son las propiedades que necesitamos
  .then((response) => {
    console.log(response)

    response.forEach((eachPokemon) => {
      eachPokemon.name = capitalize(eachPokemon.name)
    })

    // 5. renderizarlo en la vista
    res.render("pokemon/list.hbs", {
      allPokemon: response
    })
  })
  .catch((error) => {
    next(error)
  })
}) 

// GET "/pokemon/:pokeId" => Mostrar los detalles de un pokemon por su id
router.get("/pokemon/:pokeId", async (req, res, next) => {

  try {
    const response = await Pokemon.findById( req.params.pokeId )
    console.log(response)
  
    response.name = capitalize(response.name)
  
    res.render("pokemon/details.hbs", {
      singlePokemon: response
    })
  } catch(error) {
    next(error)
  }

})

// GET "/pokemon-search" => Buscar un pokemon por su nombre
router.get("/pokemon-search", (req, res, next) => {

  // como yo puedo recibir los valores del campo?
  // /pokemon-search?pokemonName=bulbasaur
  // console.log(req.query) // almacena todos los valores de campos de un formulario en rutas GET
  console.log(req.query.pokemonName)
  // podriamos convertir el valor del campo a minuscula
  const lowerCase = req.query.pokemonName.toLowerCase()

  Pokemon.findOne({ name: lowerCase })
  .then((response) => {
    console.log(response)

    res.render("pokemon/search.hbs", {
      foundPokemon: response
    })
  })
  .catch((err) => {
    next(err)
  })


})

module.exports = router;
