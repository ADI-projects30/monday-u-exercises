const PokemonClient = require("../clients/pokemon_client");
const { Item } = require("../db/models");

class ItemManager {
  constructor() {
    this.pokemonClient = new PokemonClient();
  }

  getItems = async () => {
    const items = await Item.findAll({
      raw: true,
    });
    return items.map((item) => {
      return {
        id: item.id,
        name: item.itemName,
        status: item.status,
      };
    });
  };

  handleItem = async (item) => {
    if (this._isNumber(item.itemName)) {
      return await this.fetchAndAddPokemon(item.itemName);
    }
    if (this._isList(item.itemName)) {
      return await this.fetchAndAddManyPokemon(item.itemName);
    }

    return await this.addItem(item.itemName);
  };

  updateItem = async (item) => {
    await Item.update({ status: item.status }, { where: { id: item.id } });
  };

  addItem = async (itemName) => {
    const item = await Item.create({ itemName });
    return item;
  };

  addPokemonItem = async (pokemon) => {
    return await this.addItem(`Catch ${pokemon.name}`);
  };

  fetchAndAddPokemon = async (pokemonId) => {
    try {
      const pokemon = await this.pokemonClient.getPokemon(pokemonId);
      return await this.addPokemonItem(pokemon);
    } catch (error) {
      return await this.addItem(`Pokemon with ID ${pokemonId} was not found`);
    }
  };

  fetchAndAddManyPokemon = async (inputValue) => {
    try {
      const pokemons = await this.pokemonClient.getManyPokemon(
        inputValue.replace("/ /g", "").split(",")
      );

      await Promise.all(pokemons.map(this.addPokemonItem));
    } catch (error) {
      console.error(error);
      await this.addItem(
        `Failed to fetch pokemon with this input: ${inputValue}`
      );
    }
  };

  deleteItem = async (item) => {
    await Item.destroy({
      where: {
        id: item.id,
      },
    });
  };

  _isNumber = (value) => !isNaN(Number(value));
  _isList = (value) => value.split(",").every(this._isNumber);
}

module.exports = new ItemManager();
