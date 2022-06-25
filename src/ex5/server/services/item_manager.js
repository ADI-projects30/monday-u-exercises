const { Items } = require("../db/models");
const PokemonClient = require("../clients/pokemon_client");
// const sequelize = require("sequelize");
class ItemManager {
  constructor() {
    this.pokemonClient = new PokemonClient();
    this.items = this.getItems();
  }

  getItems = async () => {
    return await Items.findAll();
  };

  handleItem = async (item) => {
    if (this._isNumber(item)) {
      return await this.fetchAndAddPokemon(item);
    }
    if (this._isList(item)) {
      return await this.fetchAndAddManyPokemon(item);
    }

    await this.addItem(item);
  };

  addItem = async (item) => {
    return await Items.create({ ItemName: item, status: 0 });
  };

  addPokemonItem = async (pokemon) => {
    await this.addItem(`Catch ${pokemon.name}`);
  };

  fetchAndAddPokemon = async (pokemonId) => {
    try {
      const pokemon = await this.pokemonClient.getPokemon(pokemonId);
      await this.addPokemonItem(pokemon);
    } catch (error) {
      await this.addItem(`Pokemon with ID ${pokemonId} was not found`);
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
    await Items.destroy({
      where: { id: item.id },
    });
  };

  updateItem = async (item) => {
    await Items.update(
      {
        status: !item.status,
        updatedAt: Date.now().toLocaleString("en-US"),
      },
      { where: { id: item.id } }
    );
  };

  _isNumber = (value) => !isNaN(Number(value));
  _isList = (value) => value.split(",").every(this._isNumber);
}

module.exports = new ItemManager();
