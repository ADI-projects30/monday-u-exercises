import { Command } from "commander";

import {
  checkUserInput,
  deleteUserTasks,
  getUserTasks,
  pokemonImg,
} from "./todoList.js";

const program = new Command();

program
  .name("todo-app")
  .description("Use the todo app to get, add and delete your tasks!")
  .version("1.0.0");

program
  .command("get-todos")
  .description("Displays your tasks")
  .action(() => {
    getUserTasks();
  });

program
  .command("add-todos")
  .description("Add a task")
  .action(() => {
    checkUserInput();
  });

program
  .command("del-todos")
  .description("Delete a task")
  .action(() => {
    deleteUserTasks();
  });

program
  .command("pokemon-img")
  .description("Displays pokemon image")
  .argument("<number>", "pokemon id")
  .action((id) => {
    pokemonImg(id);
  });

program.parse();
