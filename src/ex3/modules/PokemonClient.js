import fetch from "node-fetch";

export class PokemonClient {
  async fetchPokemon(allIds) {
    let pokemons = [];
    const idsArr = allIds;
    const promises = [];
    const arrayLength = idsArr.length;
    for (let i = 0; i < arrayLength; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${idsArr[i]}`;
      promises.push(fetch(url).then((res) => res.json()));
    }

    try {
      await Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
          name: result.name,
          pic: result.sprites?.front_default,
        }));
        pokemons.push(pokemon);
      });
    } catch (err) {
      pokemons.push([{ name: `Pokemons with IDs ${allIds} was not found` }]);
    }
    return pokemons[0];
  }

  async getPokemonImg(Id) {
    try {
      const idToArray = Id.toString().split(",");
      const pokemon = await this.fetchPokemon(idToArray);
      const pokemonImg = pokemon[0].pic;
      return pokemonImg;
    } catch (err) {
      console.log("Pokemon Id doesn't exist");
    }
  }
}
