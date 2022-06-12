import { PokemonClient } from "./modules/PokemonClient.js";

import {
  addFunction,
  deleteFunction,
  listFunction,
} from "./mondayu-logger-todoapp.js";

import chalk from "chalk";

import Image from "ascii-art-image";

const args = process.argv;
const chalkDesign = chalk.blue.bgMagenta.bold;

const addPokemons = async (allIds) => {
  const pokemonsArray = allIds.toString().split(",");
  const pokemonClient = new PokemonClient();
  let data;
  data = await pokemonClient.fetchPokemon(pokemonsArray);
  data.forEach((pokemon) => {
    const name = "Catch " + pokemon.name;
    addFunction(name);
  });
};

export const checkUserInput = async () => {
  console.log(chalkDesign("Was a task added?"));
  if (args[3] == undefined) {
    addFunction(args[3]);
  } else if (!isNaN(args[3].trim().split(",")[0])) {
    addPokemons(args[3]);
  } else {
    addFunction(args[3]);
  }
};

export const getUserTasks = () => {
  console.log(chalkDesign("These are your tasks:"));
  listFunction();
};

export const deleteUserTasks = () => {
  console.log(chalkDesign("Was a task deleted?"));
  deleteFunction();
};

export const pokemonImg = async (Id) => {
  const pokemonClient = new PokemonClient();
  let data = await pokemonClient.getPokemonImg(Id);
  if (data == undefined) {
    console.log("Pokemon image does not exist");
  } else {
    const image = new Image({
      filepath: data,
      alphabet: "blocks",
    });

    image.write(function (err, rendered) {
      console.log(rendered);
    });
  }
};
