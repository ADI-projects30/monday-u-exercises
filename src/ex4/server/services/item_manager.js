// The ItemManager should go here. Remember that you have to export it.
import fs from "fs/promises";
import path from "path";
import { existsSync } from "node:fs";
import { PokemonClient } from "../clients/pokemon_client.js";
import dotenv from "dotenv";

dotenv.config();

const taskFile = process.env.task_File_Name;
const currentDirectory = path.resolve(taskFile);
export class ItemManager {
  getAll = async () => {
    return await this.readTaskFile();
  };

  createTask = async (task) => {
    let data = await this.readTaskFile();
    if (!data) {
      data = [];
    }
    data.push({ task: task });
    await this.writeTaskFile(data);
  };

  createPokemons = async (allIds) => {
    const pokemonsArray = allIds.split(",");
    const pokemonClient = new PokemonClient();
    let data = await this.readTaskFile();
    if (!data) {
      data = [];
    }
    let pokemonData = await pokemonClient.fetchPokemons(pokemonsArray);
    pokemonData.forEach((pokemon) => {
      data.push({ task: "Catch " + pokemon });
    });
    await this.writeTaskFile(data);
  };

  getTask = async (id) => {
    const data = await this.readTaskFile();
    return data.find((value) => value.id === id);
  };

  readTaskFile = async () => {
    try {
      if (!existsSync(currentDirectory)) {
        let createStream = fs.createWriteStream(taskFile);
        createStream.end();
      }
      const data = await fs.readFile(taskFile);
      return JSON.parse(data.toString());
    } catch (error) {
      console.error(`Got an error trying to read the file: ${error.message}`);
    }
  };

  writeTaskFile = async (content) => {
    try {
      await fs.writeFile(taskFile, JSON.stringify(content));
    } catch (error) {
      console.error(`Failed to write to file ${error.message}`);
    }
  };

  deleteTask = async (id) => {
    const data = await this.getAll();
    const deletedTask = data[id];
    data.splice(id, 1);
    await this.writeTaskFile(data);
    return deletedTask;
  };
}
