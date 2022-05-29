import { PokemonClient } from './PokemonClient.js';

export class ItemManager {
    constructor() {
      this.todosArr = [];
    }


    async addPokemons(allIds) {
    const pokemonsArray = allIds.split(',');
    const pokemonClient = new PokemonClient();
    let data;
    data = await pokemonClient.fetchPokemon(pokemonsArray);
    data.forEach((pokemon) => {
      this.todosArr.push('Catch ' + pokemon.name);
    });
  }

  addTask(item) {
    this.todosArr.push(item);
    return this.todoArr;
  }

  removeTask(item) {
    let mySound = new Audio('sounds/failure.mp3')
    mySound.play()
    const todoIndex = this.todosArr.indexOf(item.querySelector('li.todo-item'))
    this.todosArr.splice(this.todosArr.indexOf(todoIndex-1), 1);
  }
}
