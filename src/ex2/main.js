import { ItemManager} from "./modules/ItemManager.js"

class Main {
    constructor(itemManager, userList, userInput, addBtn) {
      this.itemManager = itemManager;
      this.userList = userList;
      this.userInput = userInput;
      this.addBtn = addBtn;
    }

    async addTask() {
      const userInput = this.userInput.value.trim();
      if (userInput !== '') {
        const isStr = isNaN(userInput.split(',')[0])
        if (isStr) {
          itemManager.addTask(userInput);
        } else {
          await itemManager.addPokemons(userInput);
        }
        this.renderList();
      }
      else {
        alert ('An empty task cannot be entered')
      }
    }

    deleteTask = (todo)  => {
      this.itemManager.removeTask(todo);
      todo.remove()
    }

    createTaskTrash = (todoDiv) => {
        const trashButton = document.createElement("button");
        trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        userList.appendChild(todoDiv);
        trashButton.addEventListener('click', (e) =>
        this.deleteTask(todoDiv))
    }

    createTaskDetailsElement = (todoDiv, todoTaskText) => {
      todoDiv.classList.add("todo");
      const newTodo = document.createElement("li");
      newTodo.innerText = todoTaskText ;
      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);
      userInput.value = "";
      newTodo.addEventListener('click', () => this.taskClick(newTodo));
    }

    renderList = () => {
      this.userList.innerHTML = "";
      if (this.userInput.value !== '') {
        let mySound = new Audio('sounds/success.mp3')
        mySound.play()
      } 
      const todos = this.itemManager.todosArr;
      todos.forEach((todoTaskText ) => {
        const todoDiv = document.createElement("div");
        this.createTaskDetailsElement(todoDiv, todoTaskText)
        this.createTaskTrash(todoDiv)
      });
  }



    async checkIfParseJson() {
      if (localStorage.getItem("todos") === null || localStorage.getItem("todos") === []) {
        todos = [];
      } else {
        todos = JSON.parse(localStorage.getItem("todos"));
      }
    }

    taskClick = (todo) => {
      alert (todo.innerText);
    }
  
  init() {
    this.addBtn.addEventListener('click', this.addTask.bind(this));
  }
}

const userList = document.getElementById('list');
const userInput = document.getElementById('list-item-input');
const addBtn = document.getElementById('list-item-submit');
const itemManager = new ItemManager();
const main = new Main(itemManager, userList, userInput, addBtn);

document.addEventListener('DOMContentLoaded', function () {
  main.init();
});
