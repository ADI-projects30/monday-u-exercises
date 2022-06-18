// The Pokemon Client (using axios) goes here
import axios from "axios";

const url = `https://pokeapi.co/api/v2/pokemon`;

export class PokemonClient {
  fetchPokemon = async (id) => {
    try {
      const response = await axios.get(`${url}/${id}`);
      if (response.status === 200) {
        const pokemonData = await response.data;
        return pokemonData.name;
      }
    } catch (err) {
      return `Pokemons with ID ${id} was not found`;
    }
  };

  fetchPokemons = async (idsArr) => {
    this.pokemonNames = [];
    await Promise.all(
      idsArr.map(async (id) => {
        const pokemon = await this.fetchPokemon(id);
        this.pokemonNames.push(pokemon);
      })
    );
    return this.pokemonNames;
  };
}
